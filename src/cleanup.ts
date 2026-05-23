import { recordRunTraceEvent } from './runTrace';

const CLEANUP_PLANS_STORAGE_KEY = 'hyogen.cleanupPlans';

export type CleanupPlan = {
  id: string;
  retainRenderInputs: boolean;
  proposedDeletions: string[];
  executed: boolean;
};

export function listCleanupPlans(storage: Storage = window.localStorage): CleanupPlan[] {
  const encoded = storage.getItem(CLEANUP_PLANS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as CleanupPlan[]) : [];
}

export function generateCleanupPlan(storage: Storage = window.localStorage): CleanupPlan {
  const plans = listCleanupPlans(storage);
  const plan: CleanupPlan = {
    id: `cleanup-plan-${plans.length + 1}`,
    retainRenderInputs: true,
    proposedDeletions: ['raw-downloads', 'temp-renders'],
    executed: false,
  };
  storage.setItem(CLEANUP_PLANS_STORAGE_KEY, JSON.stringify([...plans, plan]));
  recordRunTraceEvent(
    {
      type: 'cleanup.plan.generated',
      summary: 'Cleanup plan generated retaining Render Inputs',
      data: { cleanupPlanId: plan.id, proposedDeletions: plan.proposedDeletions },
    },
    storage,
  );
  return plan;
}

export function executeCleanupPlan(
  cleanupPlanId: string,
  storage: Storage = window.localStorage,
): CleanupPlan | null {
  let executedPlan: CleanupPlan | null = null;
  const plans = listCleanupPlans(storage).map((plan) => {
    if (plan.id !== cleanupPlanId) return plan;
    executedPlan = { ...plan, executed: true };
    return executedPlan;
  });
  storage.setItem(CLEANUP_PLANS_STORAGE_KEY, JSON.stringify(plans));
  recordRunTraceEvent(
    {
      type: 'cleanup.executed',
      summary: 'Cleanup executed after Approval Gate',
      data: { cleanupPlanId },
    },
    storage,
  );
  return executedPlan;
}
