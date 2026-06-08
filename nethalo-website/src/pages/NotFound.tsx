import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';

export const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-primary">
    <div className="text-center space-y-6">
      <Shield className="w-24 h-24 text-brand-pink mx-auto opacity-40" />
      <h1 className="text-8xl font-black text-primary">404</h1>
      <p className="text-xl text-muted">This digital realm doesn't exist... yet.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-4 glass-button rounded-full font-bold text-lg hover:scale-105 transition-all"
      >
        <Home className="w-5 h-5" />
        Return Home
      </Link>
    </div>
  </div>
);