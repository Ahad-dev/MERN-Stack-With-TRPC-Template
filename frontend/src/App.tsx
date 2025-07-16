import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { TRPCProvider } from './utils/trpc';
import type { AppRouter } from '../../backend/src/trpc/app';
import { Route, Routes } from 'react-router';
import UserDashboard from './pages/dashboard/page';
import UserLayout from './pages/layout';
import Signup from './pages/auth/sign-up/page';
import SignIn from './pages/auth/sign-in/page';
import ForgotPassword from './pages/auth/forgot-password/forgot-password';
import ResetPassord from './pages/auth/reset-password/reset-password';
import { Toaster } from 'sonner';


function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
const  App = ()=> {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
          <Toaster
            position="top-right"
            richColors
          />
          <Routes>
            <Route path="/sign-up" element={<Signup />}/>
            <Route path="/sign-in" element={<SignIn />}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassord/>} />
            {/* Add more routes as needed */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/users" element={<p>Users</p>} />
            </Route>
          </Routes>
      </TRPCProvider>
    </QueryClientProvider>
  );
}

export default App;

