import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // 실패 시 1회 재시도
        refetchOnWindowFocus: false, // 창 활성화 시 다시 요청하지 않음
      },
      mutations: {
        retry: 0, // 실패 시 재시도하지 않음
      },
    },
  });

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);
