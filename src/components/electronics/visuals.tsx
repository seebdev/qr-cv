import {
  Building2,
  BriefcaseBusiness,
  Boxes,
  Search,
  Sparkles,
  MessageCircle,
  Upload,
  Users,
  Database,
  Settings2,
  Truck,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import type { ModuleId, ShowcaseCopy } from '@/lib/electronics/types';
export const moduleIcons = {
  clients: Building2,
  opportunities: BriefcaseBusiness,
  stock: Boxes,
  search: Search,
  ai: Sparkles,
  chat: MessageCircle,
  uploads: Upload,
  users: Users,
  records: Database,
  administration: Settings2,
  sourcing: Truck,
};

export function WorkspaceIllustration({ copy: t }: { copy: ShowcaseCopy }) {
  return (
    <div className="ep-workspace" aria-label={t.illustration} role="img">
      <div className="ep-workspace-side" aria-hidden="true">
        <span className="ep-chip">
          <Cpu size={24} />
        </span>
        {[Building2, BriefcaseBusiness, Boxes, Search, MessageCircle, Upload, Database].map(
          (Icon, i) => (
            <span key={i} className={i === 0 ? 'is-active' : ''}>
              <Icon size={17} />
              <i />
            </span>
          ),
        )}
      </div>
      <div className="ep-workspace-main" aria-hidden="true">
        <div className="ep-workspace-bar">
          <span>Electronic Parts</span>
          <span className="ep-dot" />
          <span>MPN</span>
          <Search size={13} />
        </div>
        <div className="ep-workspace-heading">
          <span className="ep-micro">{t.overview}</span>
          <strong>
            Electronic Parts
            <br />
            Intelligence
          </strong>
        </div>
        <div className="ep-workspace-stats">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <span>{t.modules[i][0]}</span>
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className="ep-workspace-cards">
          {[0, 6, 10].map((i) => (
            <div key={i}>
              <div className="ep-workspace-pattern">
                <Cpu size={30} />
              </div>
              <strong>{t.modules[i][0]}</strong>
              <i />
              <i />
            </div>
          ))}
        </div>
        <div className="ep-workspace-foot">
          <span className="ep-dot" />
          {t.illustration}
        </div>
      </div>
    </div>
  );
}

export function ModuleIllustration({
  id,
  title,
  workflow,
  label,
}: {
  id: ModuleId;
  title: string;
  workflow: string;
  label: string;
}) {
  const Icon = moduleIcons[id];
  return (
    <div
      className={`ep-module-visual ep-visual-${id}`}
      role="img"
      aria-label={`${label}: ${title}`}
    >
      <span className="ep-visual-label">{label}</span>
      <div className="ep-orbit" aria-hidden="true">
        <span />
        <span />
        <div>
          <Icon size={42} strokeWidth={1.3} />
        </div>
      </div>
      <div className="ep-visual-flow" aria-hidden="true">
        {workflow.split(' → ').map((step, i) => (
          <span key={step}>
            {i > 0 && <ArrowRight size={13} />}
            <b>{step}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
