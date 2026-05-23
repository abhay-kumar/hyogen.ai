import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { createSourceOnlyProject, duplicateProjectVariation } from '../src/projects';
import { exportPlatformPreset, listPlatformPresetExports } from '../src/platformPresets';
import { saveWorkspace } from '../src/workspace';

describe('platform preset export', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
    const project = createSourceOnlyProject({ prompt: 'Explain local-first AI', brandProfileName: 'Explainer Lab' });
    duplicateProjectVariation(project.id);
  });

  it('exports another platform preset from a duplicate Variation', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Export TikTok preset for Explain local-first AI (Copy)' }));

    expect(screen.getByText('Platform preset exported: TikTok / 9:16 / Explain local-first AI (Copy)')).toBeInTheDocument();
    expect(listPlatformPresetExports()).toContainEqual(
      expect.objectContaining({ platform: 'TikTok', aspectRatio: '9:16', variationOfProjectId: 'project-1' }),
    );
    expect(exportPlatformPreset('missing-project')).toBeNull();
  });
});
