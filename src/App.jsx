import React, { useEffect } from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18next'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from '@emotion/react'
import getTheme  from './theme'
import { CssBaseline } from '@mui/material'
import useThemeStore from './store/useThemeStore'
export default function App() {
  const {i18n} = useTranslation();
  const mode = useThemeStore((state)=>state.mode);

  useEffect(()=>{
    const dir = i18n.language === "ar"? "rtl" : "ltr";
    document.documentElement.dir = dir;
  },
[i18n.language]
)

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline/>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
