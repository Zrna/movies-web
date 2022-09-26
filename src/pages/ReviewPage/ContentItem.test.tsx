import { render, screen } from '@testing-library/react';

import { ContentItem } from './ContentItem';

describe('Content Item component', () => {
  it('should render Review page ContentItem component', () => {
    const text = 'This is a ContentItem text';
    const value = 'This is a ContentItem value';

    render(<ContentItem text={text} value={value} />);

    const element = screen.getByTestId('content-item-component');
    const textElement = screen.getByTestId('content-item-component-text');
    const valueElement = screen.getByTestId('content-item-component-value');

    expect(element).toBeInTheDocument();
    expect(textElement).toHaveTextContent(text);
    expect(valueElement).toHaveTextContent(value);
  });
});
