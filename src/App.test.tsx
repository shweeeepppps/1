import { render, screen } from '@testing-library/react';
import App from './App';

test('renders inventory title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Inventaires en cours/i);
  expect(titleElement).toBeInTheDocument();
});