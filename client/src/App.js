import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Home, Auth, Profile, Peers, Settings } from './pages';
import { AuthProvider } from './contexts/auth-context';
import { Header } from './components';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/peers" element={<Peers />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
