import React from "react";
import { Info, Code2, BookOpen, GraduationCap } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Info className="h-8 w-8 text-brand-600" />
          <span>About Project</span>
        </h1>
        <p className="text-slate-500 mt-1">
          Learn about the purpose, tech stack, and roadmap for Purwokerto Intelligence Layer.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-slate-800 flex items-center space-x-2">
            <GraduationCap className="h-5.5 w-5.5 text-brand-600" />
            <span>Learning Portfolio & Objectives</span>
          </h3>
          <p className="text-slate-600 leading-relaxed">
            The <strong>Purwokerto Intelligence Layer</strong> is built as an educational portfolio showcasing the intersection of informatics, decision science, and urban planning. By mapping simulated indices across Purwokerto districts, this prototype demonstrates how simple rule-based decision trees can assist public policy planners.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Specifically, this project serves to apply:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
            <li>
              <strong>Structured Data Models:</strong> Implementing custom TypeScript types to model geographical entities and their multi-dimensional attributes.
            </li>
            <li>
              <strong>Decision Logic (Rule-based):</strong> Implementing prioritized weighted sums to score region demands and map them to dynamic status levels.
            </li>
            <li>
              <strong>Modern UI/UX principles:</strong> Design layouts utilizing responsive grid frameworks, visual indicator color maps, and semantic accessibility elements.
            </li>
            <li>
              <strong>Smart City Context:</strong> Learning concepts related to urban mobility, public service distribution, and civic resource optimization.
            </li>
          </ul>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-xl text-slate-800 flex items-center space-x-2">
            <Code2 className="h-5.5 w-5.5 text-brand-600" />
            <span>Tech Stack Foundation</span>
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            This prototype is built on top of a highly optimized, standard frontend foundation:
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">Framework & Bundling</span>
              <span className="text-slate-500">React + TypeScript + Vite</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">Styling Engine</span>
              <span className="text-slate-500">Tailwind CSS (Utility-first)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">Routing & Navigation</span>
              <span className="text-slate-500">React Router DOM</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-800 block">Iconography</span>
              <span className="text-slate-500">Lucide React Icons</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-xl text-slate-800 flex items-center space-x-2">
            <BookOpen className="h-5.5 w-5.5 text-brand-600" />
            <span>Civic Intelligence Concepts</span>
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Civic intelligence is the study and implementation of cooperative problem-solving by public groups. Using technologies like dashboard priority mapping, cities can gain data-driven visibility into resource allocation, ensuring high-risk sectors (e.g., waste congestion or traffic gridlocks) receive optimal attention.
          </p>
        </div>
      </div>
    </div>
  );
};
