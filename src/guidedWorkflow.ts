export type GuidedWorkflowStage = {
  name: 'ProjectBrief' | 'ScriptDraft' | 'ScriptReview';
  status: 'current' | 'pending';
};

export function getMockGuidedWorkflowTimeline(): GuidedWorkflowStage[] {
  return [
    { name: 'ProjectBrief', status: 'current' },
    { name: 'ScriptDraft', status: 'pending' },
    { name: 'ScriptReview', status: 'pending' },
  ];
}
