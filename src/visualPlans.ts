import { recordApprovalDecision } from './approvalGates';
import { recordRunTraceEvent } from './runTrace';

const VISUAL_PLANS_STORAGE_KEY = 'hyogen.visualPlans';

export type VisualPlan = {
  id: string;
  scriptSegments: string[];
  visualScenes: string[];
  shots: string[];
  fallbackVisual: string;
  approved: boolean;
};

export function listVisualPlans(storage: Storage = window.localStorage): VisualPlan[] {
  const encoded = storage.getItem(VISUAL_PLANS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as VisualPlan[]) : [];
}

export function generateMockVisualPlan(
  scriptContent: string,
  storage: Storage = window.localStorage,
): VisualPlan {
  const plans = listVisualPlans(storage);
  const plan: VisualPlan = {
    id: `visual-plan-${plans.length + 1}`,
    scriptSegments: scriptContent.includes('Body:') ? ['hook', 'body'] : ['hook'],
    visualScenes: ['faceless explainer'],
    shots: ['fallback kinetic text'],
    fallbackVisual: 'branded gradient',
    approved: false,
  };
  storage.setItem(VISUAL_PLANS_STORAGE_KEY, JSON.stringify([...plans, plan]));
  recordRunTraceEvent(
    {
      type: 'visualPlan.generated',
      summary: 'Visual Plan generated from approved script',
      data: { visualPlanId: plan.id, shotCount: plan.shots.length },
    },
    storage,
  );
  return plan;
}

export function approveVisualPlan(
  visualPlanId: string,
  storage: Storage = window.localStorage,
): VisualPlan | null {
  let approvedPlan: VisualPlan | null = null;
  const plans = listVisualPlans(storage).map((plan) => {
    if (plan.id !== visualPlanId) return plan;
    approvedPlan = { ...plan, approved: true };
    return approvedPlan;
  });
  storage.setItem(VISUAL_PLANS_STORAGE_KEY, JSON.stringify(plans));
  const target = `Visual Plan ${visualPlanId.split('-').at(-1)}`;
  recordApprovalDecision({ target, decision: 'approved' }, storage);
  recordRunTraceEvent(
    {
      type: 'visualPlan.approved',
      summary: 'Visual Plan approved through Approval Gate',
      data: { visualPlanId },
    },
    storage,
  );
  return approvedPlan;
}
