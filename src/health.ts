export type HealthCommand = {
  name: 'verify' | 'build-local';
  command: string;
  status: 'available';
};

export type HealthSnapshot = {
  appName: 'hyogen.ai';
  mode: 'local/dev';
  status: 'healthy';
  commands: HealthCommand[];
};

export function getHealthSnapshot(): HealthSnapshot {
  return {
    appName: 'hyogen.ai',
    mode: 'local/dev',
    status: 'healthy',
    commands: [
      { name: 'verify', command: 'npm run verify', status: 'available' },
      { name: 'build-local', command: 'npm run build-local', status: 'available' },
    ],
  };
}
