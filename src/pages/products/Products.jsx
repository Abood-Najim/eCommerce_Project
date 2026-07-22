import React, { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  CircularProgress,
  useTheme,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
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
  const totalPages = Math.ceil(totalCount / limit)

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = (event) => {
    const val = event.target.value
    const [newSortBy, newAscending] = val.split('-')
    setSortBy(newSortBy)
    setAscending(newAscending === 'asc')
    setPage(1)
  }

  const pathnames = location.pathname.split('/').filter((x) => x)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="xxl" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 1, gap: 0.5, color: 'text.secondary', fontSize: '0.8rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
          Home
        </Link>
        <ChevronRightIcon fontSize="small" sx={{ color: 'text.secondary', mx: 0.5 }} />
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography key={name} component="span" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.8rem' }}>
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                {t('Sort by')}:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <Select
                  value={`${sortBy}-${ascending ? 'asc' : 'desc'}`}
                  onChange={handleSortChange}
                  displayEmpty
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{ 
                    borderRadius: 1.5, 
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    fontSize: '0.85rem',
                    '& .MuiSelect-select': {
                      py: 0.6
                    }
                  }}
                >
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="name-asc">Name: A to Z</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <ProductsComponent page={page} limit={limit} sortBy={sortBy} ascending={ascending} />

          {totalPages > 1 && (
            <Stack spacing={2} sx={{ mt: 6, alignItems: 'center' }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="medium"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '50%',
                    fontWeight: 500,
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}