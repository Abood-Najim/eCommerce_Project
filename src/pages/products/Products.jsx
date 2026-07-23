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
import i18n from '../../i18next'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import ProductsComponent from '../../components/products/Products'
import useCategories from '../../hooks/useCategories'

export default function ProductsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const urlCategoryId = searchParams.get('categoryId')
  const urlMinPrice = searchParams.get('minPrice')
  const urlMaxPrice = searchParams.get('maxPrice')
  const urlRating = searchParams.get('rating')

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [sortBy, setSortBy] = useState('price')
  const [ascending, setAscending] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(urlCategoryId || '')
  const [minPrice, setMinPrice] = useState(urlMinPrice || '')
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice || '')
  const [selectedRating, setSelectedRating] = useState(urlRating || '')

  const [appliedCategory, setAppliedCategory] = useState(urlCategoryId || '')
  const [appliedMinPrice, setAppliedMinPrice] = useState(urlMinPrice || '')
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(urlMaxPrice || '')
  const [appliedRating, setAppliedRating] = useState(urlRating || '')
  
  const [totalCount, setTotalCount] = useState(0)

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

  const totalPages = Math.ceil(totalCount / limit)

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })/*for going to top when switching pages (مش زي هالموقع الله يستر عليه)*/
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
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (selectedRating) params.set('rating', selectedRating)
    
    const newCategory = selectedCategory
    const newMin = minPrice
    const newMax = maxPrice
    const newRating = selectedRating

    navigate(`/products?${params.toString()}`)

    setAppliedCategory(newCategory)
    setAppliedMinPrice(newMin)
    setAppliedMaxPrice(newMax)
    setAppliedRating(newRating)
    setSelectedCategory(newCategory)
    setMinPrice(newMin)
    setMaxPrice(newMax)
    setSelectedRating(newRating)

    setDrawerOpen(false)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSelectedCategory('')
    setAppliedCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSelectedRating('')
    setAppliedMinPrice('')
    setAppliedMaxPrice('')
    setAppliedRating('')
    navigate('/products')
    setDrawerOpen(false)
  }

  const pathnames = location.pathname.split('/').filter((x) => x)

  if (categoriesLoading) {
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

      <Divider sx={{ mb: 2.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.8rem', letterSpacing: '0.5px' }}>
        {t('Price Range')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 3 }}>
        <TextField 
          placeholder={t('Min')} 
          size="small" 
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{ flex: 1, '& .MuiInputBase-root': { fontSize: '0.75rem', height: 32 } }}
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: '0.75rem' } }}>$</InputAdornment>
          }}
        />
        <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>{t('to')}</Typography>
        <TextField 
          placeholder={t('Max')} 
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
          control={
            <Checkbox 
              size="small" 
              sx={{ p: 0.5 }} 
              checked={selectedRating === '4'}
              onChange={() => setSelectedRating(selectedRating === '4' ? '' : '4')}
            />
          } 
          label={<Rating value={4} readOnly size="small" sx={{ color: theme.palette.error.main, fontSize: '0.9rem' }} />} 
          sx={{ m: 0, '& .MuiTypography-root': { fontSize: '0.75rem' } }}
        />
        <FormControlLabel 
          control={
            <Checkbox 
              size="small" 
              sx={{ p: 0.5 }} 
              checked={selectedRating === '3'}
              onChange={() => setSelectedRating(selectedRating === '3' ? '' : '3')}
            />
          } 
          label={<Rating value={3} readOnly size="small" sx={{ color: theme.palette.error.main, fontSize: '0.9rem' }} />} 
          sx={{ m: 0, '& .MuiTypography-root': { fontSize: '0.75rem' } }}
        />
        <FormControlLabel 
          control={
            <Checkbox 
              size="small" 
              sx={{ p: 0.5 }} 
              checked={selectedRating === '2'}
              onChange={() => setSelectedRating(selectedRating === '2' ? '' : '2')}
            />
          } 
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
          {t('Home')}
        </Link>
        
        <ChevronRightIcon 
  fontSize="small" 
  sx={{ 
    color: 'text.secondary', 
    mx: 0.5,
    transform: i18n.language === 'ar' ? 'rotate(180deg)' : 'none'
  }} 
/>

        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography key={name} component="span" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.8rem' }}>
              {t(name.charAt(0).toUpperCase() + name.slice(1))}
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
                  <MenuItem value="price-desc">{t('Price: High to Low')}</MenuItem>
                  <MenuItem value="price-asc">{t('Price: Low to High')}</MenuItem>
                  <MenuItem value="name-asc">{t('Name: A to Z')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <ProductsComponent 
            page={page} 
            limit={limit} 
            sortBy={sortBy} 
            ascending={ascending}
            categoryId={appliedCategory}
            minPrice={appliedMinPrice}
            maxPrice={appliedMaxPrice}
            minRating={appliedRating}
            onTotalCountChange={setTotalCount}
          />
        </Box>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {sidebarContent}
      </Drawer>
    </Container>
  )
}