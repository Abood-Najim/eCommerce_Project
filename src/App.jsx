import React, { useEffect } from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18next'
import { useTranslation } from 'react-i18next'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import getTheme from './theme'
import { CssBaseline } from '@mui/material'
import useThemeStore from './store/useThemeStore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const cacheLtr = createCache({
  key: 'mui',
})

export default function App() {
  const { i18n } = useTranslation()
  const mode = useThemeStore((state) => state.mode)
  const isRtl = i18n.language === 'ar'
  const dir = isRtl ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={getTheme(mode, dir)}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer
            position={'top-center'}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={isRtl}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={mode === 'dark' ? 'dark' : 'light'}
          />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}