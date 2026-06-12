export interface ModerationResult {
  isHate: boolean;
  severity: 'none' | 'low' | 'medium' | 'high' | 'critical';
  categories: string[];
  confidence: number;
  suggestedAction: 'allow' | 'flag' | 'hide' | 'delete';
}

const HATE_KEYWORDS = [
  'slur', 'hate', 'kill', 'die', 'stupid', 'ugly', 'fat', 'loser',
  'worthless', 'trash', 'disgusting', 'pathetic', 'idiot', 'moron',
  'retard', 'freak', 'freak', 'creep', 'weirdo', 'psycho', 'crazy',
  'nobody likes you', 'go away', 'kill yourself', 'kys',
  'no one wants you', 'you suck', 'worst person', 'hate you',
];

const SEVERITY_MAP: Record<string, 'none' | 'low' | 'medium' | 'high' | 'critical'> = {
  'threat': 'critical',
  'slur': 'critical',
  'self_harm': 'critical',
  'violence': 'high',
  'harassment': 'high',
  'insult': 'medium',
  'profanity': 'low',
};

export function analyzeComment(text: string): ModerationResult {
  const lower = text.toLowerCase();
  const matchedKeywords: string[] = [];
  let maxSeverity: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';

  for (const keyword of HATE_KEYWORDS) {
    if (lower.includes(keyword)) {
      matchedKeywords.push(keyword);
    }
  }

  const categories: string[] = [];
  if (lower.match(/\b(kill|die|murder|destroy)\b/)) { categories.push('violence'); }
  if (lower.match(/\b(suicide|kill yourself|kys|end your life)\b/)) { categories.push('self_harm'); }
  if (lower.match(/\b(hate|bigot|racist|sexist|homophobic|transphobic)\b/)) { categories.push('hate'); }
  if (lower.match(/\b(stalk|follow you|find you|track you)\b/)) { categories.push('threat'); }
  if (lower.match(/\b(ugly|fat|stupid|idiot|loser|worthless|trash)\b/)) { categories.push('harassment'); }

  for (const cat of categories) {
    const sev = SEVERITY_MAP[cat] || 'low';
    const severityOrder = ['none', 'low', 'medium', 'high', 'critical'];
    if (severityOrder.indexOf(sev) > severityOrder.indexOf(maxSeverity)) {
      maxSeverity = sev;
    }
  }

  if (matchedKeywords.length > 0 && maxSeverity === 'none') maxSeverity = 'low';

  const confidence = Math.min(0.95, 0.3 + (matchedKeywords.length * 0.15) + (categories.length * 0.1));

  let suggestedAction: ModerationResult['suggestedAction'] = 'allow';
  if (maxSeverity === 'critical') suggestedAction = 'delete';
  else if (maxSeverity === 'high') suggestedAction = 'hide';
  else if (maxSeverity === 'medium') suggestedAction = 'flag';
  else if (maxSeverity === 'low') suggestedAction = 'flag';

  return {
    isHate: matchedKeywords.length > 0 || categories.length > 0,
    severity: maxSeverity,
    categories,
    confidence,
    suggestedAction,
  };
}

export async function moderateComment(text: string, platform: string, commentId: string): Promise<ModerationResult> {
  const result = analyzeComment(text);
  if (result.isHate && (result.suggestedAction === 'delete' || result.suggestedAction === 'hide')) {
    console.log(`[Moderation] ${result.suggestedAction.toUpperCase()} comment on ${platform}: "${text.slice(0, 50)}..." (${result.severity})`);
  }
  return result;
}
