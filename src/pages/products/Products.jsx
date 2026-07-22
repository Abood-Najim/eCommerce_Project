import React, { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  CircularProgress,
  useTheme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ProductsComponent from '../../components/products/Products'
import useProducts from '../../hooks/useProducts'

export default function ProductsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [sortBy, setSortBy] = useState('price')
  const [ascending, setAscending] = useState(false)

  const { data, isLoading } = useProducts(page, limit, sortBy, ascending)
  const totalCount = data?.response?.totalCount || 0

  const pathnames = location.pathname.split('/').filter((x) => x)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 1, gap: 0.5, color: 'text.secondary', fontSize: '0.875rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
          Home
        </Link>
        <ChevronRightIcon fontSize="small" sx={{ color: 'text.secondary', mx: 0.5 }} />
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography key={name} component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          ) : null
        })}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 4, gap: 2 }}>
            <Box>

              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.5rem' }}>
                {t('Shop')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                Showing {totalCount} products
              </Typography>
            </Box>
          </Box>

          <ProductsComponent page={page} limit={limit} sortBy={sortBy} ascending={ascending} />
        </Grid>
      </Grid>
    </Container>
  )
}