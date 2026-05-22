import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../src/App';

describe('app shell', () => {
  it('renders a health card for the local desktop shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'hyogen.ai' })).toBeInTheDocument();
    expect(screen.getByText('local/dev')).toBeInTheDocument();
    expect(screen.getByText('healthy')).toBeInTheDocument();
    expect(screen.getByText('npm run verify')).toBeInTheDocument();
    expect(screen.getByText('npm run build-local')).toBeInTheDocument();
  });
});
