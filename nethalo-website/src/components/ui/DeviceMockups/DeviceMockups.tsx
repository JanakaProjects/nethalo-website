import React from 'react';

export const DeviceMockups: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap',
      marginTop: 48,
    }}>
      {/* Phone */}
      <div style={{
        width: 180, height: 360,
        border: '3px solid #d2d2d7',
        borderRadius: 28,
        padding: 8,
        background: '#ffffff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #667eea 0%, #e91e8c 100%)',
          display: 'flex', flexDirection: 'column',
          padding: 16, gap: 8,
          overflow: 'hidden',
        }}>
          <div style={{ height: 8, width: '60%', background: 'rgba(255,255,255,0.5)', borderRadius: 4 }} />
          <div style={{ height: 60, width: '100%', background: 'rgba(255,255,255,0.15)', borderRadius: 8, marginTop: 8 }} />
          <div style={{ height: 4, width: '80%', background: 'rgba(255,255,255,0.3)', borderRadius: 2, marginTop: 4 }} />
          <div style={{ height: 4, width: '50%', background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          <div style={{ flex: 1, display: 'flex', gap: 6, marginTop: 8 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 8 }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 8 }} />
          </div>
          <div style={{
            width: 60, height: 60, borderRadius: 30,
            background: 'rgba(255,255,255,0.2)',
            alignSelf: 'center', marginTop: 'auto', marginBottom: 8,
          }} />
        </div>
      </div>

      {/* Laptop */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 260, height: 170,
          border: '3px solid #d2d2d7',
          borderRadius: 12,
          padding: 8,
          background: '#ffffff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            width: '100%', height: '100%',
            borderRadius: 8,
            background: 'linear-gradient(135deg, #0071e3 0%, #667eea 50%, #e91e8c 100%)',
            display: 'flex', flexDirection: 'column',
            padding: 12, gap: 6,
          }}>
            <div style={{ height: 6, width: '50%', background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
            <div style={{ height: 4, width: '70%', background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
            <div style={{ flex: 1, display: 'flex', gap: 6, marginTop: 6 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 6 }} />
            </div>
            <div style={{ height: 4, width: '40%', background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          </div>
        </div>
        {/* Laptop base */}
        <div style={{
          width: 280, height: 10,
          background: '#e8e8ed',
          borderRadius: '0 0 8px 8px',
          margin: '0 auto',
          borderBottom: '2px solid #d2d2d7',
        }} />
      </div>

      {/* Tablet */}
      <div style={{
        width: 200, height: 270,
        border: '3px solid #d2d2d7',
        borderRadius: 18,
        padding: 8,
        background: '#ffffff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #e91e8c 0%, #667eea 100%)',
          display: 'flex', flexDirection: 'column',
          padding: 16, gap: 8,
        }}>
          <div style={{ height: 8, width: '40%', background: 'rgba(255,255,255,0.5)', borderRadius: 4 }} />
          <div style={{ height: 50, width: '100%', background: 'rgba(255,255,255,0.12)', borderRadius: 8 }} />
          <div style={{ flex: 1, display: 'flex', gap: 6, marginTop: 4 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 6 }} />
            <div style={{ flex: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 6 }} />
          </div>
          <div style={{ height: 4, width: '60%', background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          <div style={{ height: 4, width: '30%', background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
};
