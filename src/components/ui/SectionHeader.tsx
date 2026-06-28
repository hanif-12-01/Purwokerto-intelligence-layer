interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
