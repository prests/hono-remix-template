import { createRemixStub } from '@remix-run/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';

import { MOCK_APP_LOAD_CONTEXT } from '../../__mocks__/app-load-context';
import IndexRoute, { loader } from '../_index';

const renderRootIndexRoute = () => {
  const RootIndexRouteStub = createRemixStub([{ path: '/', Component: IndexRoute, loader }], MOCK_APP_LOAD_CONTEXT);

  return render(<RootIndexRouteStub />);
};

describe('Root Index Route', () => {
  it('should render index route', async () => {
    renderRootIndexRoute();

    await waitFor(() => screen.findByText('Example App Test'));
  });
});
