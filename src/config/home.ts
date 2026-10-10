import {
  ChartColumn,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/** Sección 02. `key` apunta a messages → Home.areas.<key> */
export const AREAS: { key: string; icon: LucideIcon }[] = [
  { key: 'pipelines', icon: Workflow },
  { key: 'database', icon: Database },
  { key: 'bi', icon: ChartColumn },
  { key: 'quality', icon: ShieldCheck },
  { key: 'automation', icon: Zap },
  { key: 'ai', icon: Sparkles },
];

/** Íconos de las columnas de Skills: las claves son los valores del campo "icon" del global. */
export const SKILL_ICONS: Record<string, LucideIcon> = {
  database: Database,
  chart: ChartColumn,
  sparkles: Sparkles,
  workflow: Workflow,
  shield: ShieldCheck,
  zap: Zap,
  layers: Layers,
  users: Users,
};