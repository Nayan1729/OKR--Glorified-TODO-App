import { render, screen } from '@testing-library/react';
import Counter from './Counter';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
test('renders the initial count of 0', () => {
  // 1. Render the component
  render(<Counter />);

  // 2. Find the element.
  // We use a regex (/.../i) for case-insensitive matching.
  const countElement = screen.getByText(/current count: 0/i);

  // 3. Assert it exists
  expect(countElement).toBeInTheDocument();
});

test('increments count when button is clicked', async () => {
  // Setup userEvent
  const user = userEvent.setup();

  render(<Counter />);
  // 1. Find the button (best practice is to find by Role)
  const button = screen.getByRole('button', { name: /increment/i });

  // 2. Simulate the click
  await user.click(button);

  // 3. Check if the text changed to "1"
  const countElement = screen.getByText(/current count: 1/i);
  expect(countElement).toBeInTheDocument();
});
