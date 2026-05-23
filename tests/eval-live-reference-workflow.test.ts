import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('eval-live Reference Workflow smoke command', () => {
  it('is available as an npm script and returns an ok smoke result', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as { scripts: Record<string, string> };

    expect(packageJson.scripts['eval-live:reference-workflow']).toBe(
      'node scripts/eval-live-reference-workflow.mjs',
    );
    expect(
      execFileSync('npm', ['run', 'eval-live:reference-workflow', '--silent'], { encoding: 'utf8' }),
    ).toContain('eval-live Reference Workflow smoke: ok');
  });
});
