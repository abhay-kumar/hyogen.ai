import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../src/App';
import { listImageGenerationRequests } from '../src/imageGeneration';
import { saveWorkspace } from '../src/workspace';

describe('image generation spend approval', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveWorkspace('/Users/creator/Hyogen');
  });

  it('requests approval before image-generation provider spend', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Request Image Generation Approval' }));

    expect(screen.getByText('Image generation spend approval required')).toBeInTheDocument();
    expect(listImageGenerationRequests()).toContainEqual(
      expect.objectContaining({ status: 'approval-required', prompt: 'Generate fallback explainer image' }),
    );
  });
});
