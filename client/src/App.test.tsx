import { createRoot } from 'react-dom/client';
import App from './App';

it('renders App', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<App />);
});
