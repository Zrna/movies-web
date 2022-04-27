import { render } from '@testing-library/react';

import { ContentItem } from './ContentItem';

test('renders Review page ContentItem component', () => {
  render(<ContentItem text="Some text" value="Some value" />);
});
