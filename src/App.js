import Home from './components/Home';
import GlobalStyle from './gloablStyles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Home />
    </QueryClientProvider>
  );
}

export default App;
