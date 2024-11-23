import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 선택적: 포커스 시 재요청 방지
    },
    mutations: {
      // Mutation 옵션을 명확히 지정
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// export const queryClient = new QueryClient();

// createRoot(document.getElementById('root')).render(
//     <StrictMode>
//         <QueryClientProvider client={queryClient}>
//             <App />
//             <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>
//     </StrictMode>
// );
