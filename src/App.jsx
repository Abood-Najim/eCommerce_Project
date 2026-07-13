import React, { useEffect } from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18next'
import { useTranslation } from 'react-i18next'
export default function App() {
  const {i18n} = useTranslation();

  useEffect(()=>{
    const dir = i18n.language === "ar"? "rtl" : "ltr";
    document.documentElement.dir = dir;
  },
[i18n.language]
)

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
