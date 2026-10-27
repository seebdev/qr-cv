'use client';
import { useRef } from 'react';
import { Code2, Database, Workflow, Cpu, Layers3 } from './icons';
export function SystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const nodes = [
    { label: 'INTERFACE', sub: 'Human → product', Icon: Code2 },
    { label: 'API', sub: 'Connect the dots', Icon: Layers3 },
    { label: 'DATABASE', sub: 'Structured by design', Icon: Database },
    { label: 'AI', sub: 'Useful intelligence', Icon: Cpu },
    { label: 'AUTOMATION', sub: 'Less repetition', Icon: Workflow },
  ];
  return (
    <div
      className="hero-visual"
      aria-hidden="true"
      onPointerMove={(e) => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current.style.transform = `rotateX(${8 - ((e.clientY - r.top) / r.height) * 8}deg) rotateY(${-14 + ((e.clientX - r.left) / r.width) * 12}deg) rotateZ(-7deg)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
    >
      <div className="system-board" ref={ref}>
        <svg className="system-lines" viewBox="0 0 470 330" fill="none">
          <path
            d="M120 85H225V170H390V255M225 170V70H390M225 170V285H95"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        {nodes.map(({ label, sub, Icon }, i) => (
          <div className={`system-node n${i}`} key={label}>
            <Icon size={20} />
            <div>
              {label}
              <small>{sub}</small>
            </div>
          </div>
        ))}
        <span className="system-label">CONNECTED BY INTENT / 001</span>
      </div>
    </div>
  );
}
