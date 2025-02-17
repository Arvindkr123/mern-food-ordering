import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProvidersNavigate from './components/auth/Auth0ProvidersNavigate.tsx'
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
}
)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Auth0ProvidersNavigate>
          <App />
        </Auth0ProvidersNavigate>
      </QueryClientProvider>
    </StrictMode>,
  </BrowserRouter>
)
