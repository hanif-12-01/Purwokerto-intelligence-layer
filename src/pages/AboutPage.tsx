import React from "react";
import {
  BookOpen,
  Code2,
  Database,
  Globe,
  Info,
  Layers,
  LayoutDashboard,
  Map,
  Bot,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";

const learningFocus = [
  { icon: LayoutDashboard, label: "Dashboard UI & data visualization" },
  { icon: SlidersHorizontal, label: "Rule-based scoring & decision support" },
  { icon: Users, label: "Civic intelligence & feedback classification" },
  { icon: Layers, label: "Smart city concepts & urban priority mapping" },
  { icon: Code2, label: "React, TypeScript, Tailwind CSS, Vite" },
  { icon: ShieldCheck, label: "UI/UX design for public-facing prototypes" },
];

const notIncluded = [
  { icon: Database, label: "Backend server or database" },
  { icon: ShieldCheck, label: "Authentication or user accounts" },
  { icon: Globe, label: "External APIs or third-party services" },
  { icon: Map, label: "Official GIS boundary integration" },
  { icon: Bot, label: "Real AI model or LLM integration" },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <section className="rounded-3xl border border-amber-100/90 bg-white/80 p-6 shadow-sm shadow-amber-900/5 backdrop-blur sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 ring-1 ring-emerald-100">
          <Info className="h-4 w-4" /> About This Project
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Purwokerto Intelligence Layer
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          An informatics learning portfolio project exploring smart city concepts, civic intelligence,
          dashboard UI, scoring systems, and rule-based decision support — built with React,
          TypeScript, Tailwind CSS, and Vite.
        </p>
      </section>

      {/* Project Purpose */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
            <BookOpen className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-extrabold text-slate-950">Project Purpose</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p>
              This project is an <strong>informatics learning and portfolio project</strong>. It is
              adapted from the CIVICTWIN Purwokerto proposal concept, with all Semarang-specific context
              fully replaced with Purwokerto-relevant urban issues, districts, and local identity.
            </p>
            <p>
              The goal is to demonstrate how civic data simulation, rule-based scoring, feedback
              classification, and transparent decision support can be prototyped in a modern web
              application.
            </p>
            <p>
              <strong>The first version is only a frontend prototype.</strong> It focuses on UI,
              scoring logic, and data visualization — all running entirely in the browser with no
              server-side processing.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
            <Layers className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-extrabold text-slate-950">Learning Focus Areas</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {learningFocus.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-50 p-1.5 text-emerald-700 ring-1 ring-emerald-100">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-slate-700">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Not Included Yet */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50/90 p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-amber-200/70 pb-4">
          <Info className="h-5 w-5 text-amber-700" />
          <h2 className="text-lg font-extrabold text-amber-950">Not Included in This Version</h2>
        </div>
        <p className="mt-4 text-sm leading-6 text-amber-900">
          The following components are intentionally excluded from this first version. They may be
          added in future iterations as the project scope expands.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {notIncluded.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex items-center gap-3 text-sm text-amber-950">
                <div className="rounded-lg bg-amber-100 p-1.5 text-amber-700">
                  <Icon className="h-4 w-4" />
                </div>
                {item.label}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
          <Code2 className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-extrabold text-slate-950">Technology Stack</h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "React 19", desc: "UI library" },
            { name: "TypeScript", desc: "Type safety" },
            { name: "Tailwind CSS v4", desc: "Utility-first styling" },
            { name: "Vite", desc: "Build tool" },
            { name: "React Router", desc: "Client-side routing" },
            { name: "Lucide React", desc: "Icon library" },
          ].map((tech) => (
            <div key={tech.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="font-bold text-slate-900">{tech.name}</p>
              <p className="mt-1 text-xs text-slate-500">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Adaptation Note */}
      <section className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
          <Map className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-extrabold text-slate-950">Adaptation from CIVICTWIN Purwokerto</h2>
        </div>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <p>
            The original CIVICTWIN concept was designed for Semarang. This project adapts the idea
            entirely for <strong>Purwokerto</strong>, replacing all city-specific context:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Districts replaced with Purwokerto Utara, Timur, Selatan, Barat.</li>
            <li>Coastal/tidal flood context removed (not relevant to Purwokerto).</li>
            <li>Urban issues adjusted: local flooding, drainage, traffic, waste, public services, student mobility, UMKM activity.</li>
            <li>Data references use general placeholders (BPS Kabupaten Banyumas, BPBD, etc.).</li>
            <li>Visual identity inspired by Purwokerto warmth, Baturraden nature, and Mount Slamet.</li>
          </ul>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center text-xs text-slate-500">
        <p>
          © 2026 Purwokerto Intelligence Layer. Educational civic intelligence prototype.
        </p>
        <p className="mt-1">
          Simulated data only. Not an official government platform.
        </p>
      </section>
    </div>
  );
};
