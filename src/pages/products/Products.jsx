import React, { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress,
  useTheme,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  Divider,
  Rating,
  Drawer,
  IconButton,
  Button
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import ProductsComponent from '../../components/products/Products'
import useProducts from '../../hooks/useProducts'
import useCategories from '../../hooks/useCategories'

export default function ProductsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const urlCategoryId = searchParams.get('categoryId')

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [sortBy, setSortBy] = useState('price')
  const [ascending, setAscending] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(urlCategoryId || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedRating, setSelectedRating] = useState('')

  const { data, isLoading } = useProducts(page, limit, sortBy, ascending)
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()
  
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

  const handleApplyFilters = () => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('categoryId', selectedCategory)
    
    navigate(`/products?${params.toString()}`)
    setDrawerOpen(false)
  }

  const handleClearFilters = () => {
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSelectedRating('')
    navigate('/products')
    setDrawerOpen(false)
  }

  const pathnames = location.pathname.split('/').filter((x) => x)

  if (isLoading || categoriesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  const categories = categoriesData?.response?.data || []

  const sidebarContent = (
    <Box sx={{ p: 2, width: 250 }}>
      
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.8rem', letterSpacing: '0.5px' }}>
        {t('Categories')}
      </Typography>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox 
                checked={selectedCategory === String(category.id)}
                onChange={() => setSelectedCategory(String(category.id))}
                size="small"
                color="primary"
                sx={{ p: 0.5 }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.8rem', ml: 0.5 }}>
                {category.name}
              </Typography>
            }
            sx={{ 
              m: 0, 
              '& .MuiTypography-root': { 
                fontWeight: selectedCategory === String(category.id) ? 600 : 400 
              } 
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ mb: 2.5 }} /> {/* i made this part for the UI/UX design, it''s not functional  */}

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.8rem', letterSpacing: '0.5px' }}>
        {t('Price Range')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 3 }}>
        <TextField 
          placeholder="Min" 
          size="small" 
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{ flex: 1, '& .MuiInputBase-root': { fontSize: '0.75rem', height: 32 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: '0.75rem' } }}>$</InputAdornment>
          }}
        />
        <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>to</Typography>
        <TextField 
          placeholder="Max" 
          size="small" 
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{ flex: 1, '& .MuiInputBase-root': { fontSize: '0.75rem', height: 32 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: '0.75rem' } }}>$</InputAdornment>
          }}
        />
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.8rem', letterSpacing: '0.5px' }}>
        {t('Rating')}
      </Typography>
      <Stack spacing={0.3} sx={{ mb: 3 }}>
        <FormControlLabel 
          control={<Checkbox size="small" sx={{ p: 0.5 }} />} 
          label={<Rating value={4} readOnly size="small" sx={{ color: theme.palette.error.main, fontSize: '0.9rem' }} />} 
          sx={{ m: 0, '& .MuiTypography-root': { fontSize: '0.75rem' } }}
        />
        <FormControlLabel 
          control={<Checkbox size="small" sx={{ p: 0.5 }} />} 
          label={<Rating value={3} readOnly size="small" sx={{ color: theme.palette.error.main, fontSize: '0.9rem' }} />} 
          sx={{ m: 0, '& .MuiTypography-root': { fontSize: '0.75rem' } }}
        />
        <FormControlLabel 
          control={<Checkbox size="small" sx={{ p: 0.5 }} />} 
          label={<Rating value={2} readOnly size="small" sx={{ color: theme.palette.error.main, fontSize: '0.9rem' }} />} 
          sx={{ m: 0, '& .MuiTypography-root': { fontSize: '0.75rem' } }}
        />
      </Stack>

      <Stack spacing={1} sx={{ mt: 1 }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleApplyFilters}
          sx={{ textTransform: 'none', borderRadius: 1.5 }}
        >
          {t('Apply Filters')}
        </Button>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleClearFilters}
          sx={{ textTransform: 'none', borderRadius: 1.5 }}
        >
          {t('Clear Filters')}
        </Button>
      </Stack>

    </Box>
  )

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

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

        <Box sx={{ display: { xs: 'none', md: 'block' }, width: 250, flexShrink: 0 }}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            {sidebarContent}
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 4, gap: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1.5rem' }}>
                {t('Shop')}
              </Typography>
              {/* FIXED: Formatted subtitle string */}
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                {t('Showing')} {totalCount} {t('products')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<FilterListIcon />}
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' }, borderRadius: 1.5, textTransform: 'none' }}
              >
                {t('Filter')}
              </Button>

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

          <ProductsComponent 
            page={page} 
            limit={limit} 
            sortBy={sortBy} 
            ascending={ascending}
            categoryId={selectedCategory} 
          />

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
        </Box>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {sidebarContent}
      </Drawer>
    </Container>
  )
}