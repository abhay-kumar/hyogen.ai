import { recordRunTraceEvent } from './runTrace';

const APPROVALS_STORAGE_KEY = 'hyogen.approvalDecisions';

export type ApprovalDecision = {
  id: string;
  target: string;
  decision: 'approved' | 'rejected';
};

export function listApprovalDecisions(storage: Storage = window.localStorage): ApprovalDecision[] {
  const encoded = storage.getItem(APPROVALS_STORAGE_KEY);
  return encoded ? (JSON.parse(encoded) as ApprovalDecision[]) : [];
}

export function recordApprovalDecision(
  input: { target: string; decision: 'approved' | 'rejected' },
  storage: Storage = window.localStorage,
): ApprovalDecision {
  const decisions = listApprovalDecisions(storage);
  const decision: ApprovalDecision = {
    id: `approval-${decisions.length + 1}`,
    target: input.target,
    decision: input.decision,
  };
  storage.setItem(APPROVALS_STORAGE_KEY, JSON.stringify([...decisions, decision]));
  recordRunTraceEvent(
    {
      type: 'approval.recorded',
      summary: 'Approval Gate decision recorded',
      data: { target: decision.target, decision: decision.decision },
    },
    storage,
  );
  return decision;
}
