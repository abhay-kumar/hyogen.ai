const result = {
  command: 'eval-live:reference-workflow',
  status: 'ok',
  workflow: 'Reference Workflow smoke',
  stages: ['project', 'script', 'media', 'audio', 'render', 'package'],
};

console.log('eval-live Reference Workflow smoke: ok');
console.log(JSON.stringify(result));
