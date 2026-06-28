import React from "react";
import { Link } from "react-router-dom";
import { Landmark, ArrowRight, Shield, BarChart3, Database } from "lucide-react";

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] py-12 text-center">
      {/* Hero Icon */}
      <div className="inline-flex items-center justify-center p-4 bg-brand-100 text-brand-700 rounded-full mb-6">
        <Landmark className="h-12 w-12" />
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl">
        Purwokerto Intelligence Layer
      </h1>

      {/* Hero Subtitle */}
      <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
        Civic intelligence prototype for urban priority mapping and public decision support.
      </p>

      {/* Call to Action */}
      <div className="mt-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-150 text-base"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      {/* Visual Feature Highlights */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full text-left">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-brand-600 mb-3">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">Priority Mapping</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Multi-criteria decision support using traffic, waste, services, and student indices to calculate priorities.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-brand-600 mb-3">
            <Database className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">District Data</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Structured indicators across key districts in Purwokerto (North, East, South, West) to evaluate civic needs.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-brand-600 mb-3">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">Simulation Layer</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Safe sandbox prototype built for learning and modeling civic prioritization algorithms without risk.
          </p>
        </div>
      </div>
    </div>
  );
};
