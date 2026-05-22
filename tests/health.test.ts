import { describe, expect, it } from 'vitest';
import { getHealthSnapshot } from '../src/health';

describe('local health snapshot', () => {
  it('reports the app as healthy with local verification commands', () => {
    const health = getHealthSnapshot();

    expect(health).toEqual({
      appName: 'hyogen.ai',
      mode: 'local/dev',
      status: 'healthy',
      commands: [
        { name: 'verify', command: 'npm run verify', status: 'available' },
        { name: 'build-local', command: 'npm run build-local', status: 'available' },
      ],
    });
  });
});
