import { render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import { ButtonLink } from './ButtonLink';

export const history = createBrowserHistory();

describe('ButtonLink component', () => {
  it('should render ButtonLink component with href attr', () => {
    render(
      <Router history={history}>
        <ButtonLink text="Login" to="/login" />
      </Router>,
    );

    const element = screen.getByTestId('button-link-component');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Login');
    expect(element).toHaveAttribute('href', '/login');
  });
});
