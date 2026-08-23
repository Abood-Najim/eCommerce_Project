import React, { useState, Fade, Zoom, Slide, Grow } from 'react'
import {
  Box,
  Container,
  Paper,
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
  Button,
  alpha,
  Badge,
  Tooltip
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18next'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
  const [priceError, setPriceError] = useState('')

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

  const isInvalidPriceRange =
    minPrice !== '' && maxPrice !== '' && Number(minPrice) > Number(maxPrice)

  const isApplyDisabled =
    (selectedCategory === appliedCategory &&
      minPrice === appliedMinPrice &&
      maxPrice === appliedMaxPrice &&
      selectedRating === appliedRating) ||
    isInvalidPriceRange

  const isClearDisabled =
    !selectedCategory &&
    !minPrice &&
    !maxPrice &&
    !selectedRating &&
    !appliedCategory &&
    !appliedMinPrice &&
    !appliedMaxPrice &&
    !appliedRating

  const activeFiltersCount = [appliedCategory, appliedMinPrice, appliedMaxPrice, appliedRating].filter(Boolean).length

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
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      toast.error(t('Min price cannot be greater than Max price'))
      return
    }

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

    toast.info(t('Filters applied successfully'))
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
    toast.info(t('Filters cleared'))
    setDrawerOpen(false)
  }

  const pathnames = location.pathname.split('/').filter((x) => x)

  if (categoriesLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Container>
    )
  }

  const categories = categoriesData?.response?.data || []

  const sidebarContent = (
    <Box sx={{ p: { xs: 2.5, md: 0 }, width: { xs: 280, md: '100%' } }}>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {t('Filters')}
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
        {t('Select a filter to apply')}
      </Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem', letterSpacing: '0.5px', color: 'text.secondary', textTransform: 'uppercase' }}>
        {t('Categories')}
      </Typography>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        {categories.map((category) => {
          const isSelected = selectedCategory === String(category.id)
          return (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={() => setSelectedCategory(isSelected ? '' : String(category.id))}
                  size="small"
                  color="primary"
                  sx={{ p: 0.5 }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: '0.85rem', ml: 0.5, color: isSelected ? 'text.primary' : 'text.secondary' }}>
                  {category.name}
                </Typography>
              }
              sx={{
                m: 0,
                borderRadius: 2,
                py: 0.5,
                px: 1,
                transition: 'all 0.2s ease',
                backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                '&:hover': {
                  backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.18) : theme.palette.action.hover
                },
                '& .MuiTypography-root': {
                  fontWeight: isSelected ? 600 : 400
                }
              }}
            />
          )
        })}
      </Stack>

      <Divider sx={{ mb: 2.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem', letterSpacing: '0.5px', color: 'text.secondary', textTransform: 'uppercase' }}>
        {t('Price Range')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: isInvalidPriceRange ? 1 : 3 }}>
        <TextField
          placeholder={t('Min')}
          size="small"
          type="number"
          value={minPrice}
          error={isInvalidPriceRange}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiInputBase-root': {
              fontSize: '0.85rem',
              height: 38,
              borderRadius: 2,
              bgcolor: 'background.paper'
            },
            '& input[type=number]': {
              MozAppearance: 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            }
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem', color: 'text.secondary' } }}>$</InputAdornment>
          }}
        />
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{t('to')}</Typography>
        <TextField
          placeholder={t('Max')}
          size="small"
          type="number"
          value={maxPrice}
          error={isInvalidPriceRange}
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiInputBase-root': {
              fontSize: '0.85rem',
              height: 38,
              borderRadius: 2,
              bgcolor: 'background.paper'
            },
            '& input[type=number]': {
              MozAppearance: 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            }
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem', color: 'text.secondary' } }}>$</InputAdornment>
          }}
        />
      </Box>

      {isInvalidPriceRange && (
        <Typography color="error" variant="caption" sx={{ display: 'block', mb: 2, fontWeight: 500, fontSize: '0.75rem' }}>
          {t('Min price cannot be greater than Max price')}
        </Typography>
      )}

      {priceError && (
        <Box sx={{ mb: 3, p: 1.5, borderRadius: 2, backgroundColor: alpha(theme.palette.error.main, 0.15), border: `1px solid ${theme.palette.error.main}` }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
            {t(priceError)}
          </Typography>
        </Box>
      )}

      <Divider sx={{ mb: 2.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem', letterSpacing: '0.5px', color: 'text.secondary', textTransform: 'uppercase' }}>
        {t('Rating')}
      </Typography>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        {[4, 3, 2].map((stars) => {
          const isSelected = selectedRating === String(stars)
          return (
            <FormControlLabel
              key={stars}
              control={
                <Checkbox
                  size="small"
                  sx={{ p: 0.5 }}
                  checked={isSelected}
                  onChange={() => setSelectedRating(isSelected ? '' : String(stars))}
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={stars} readOnly size="small" sx={{ color: theme.palette.primary.main, fontSize: '0.9rem' }} />
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    {t('& Up')}
                  </Typography>
                </Stack>
              }
              sx={{
                m: 0,
                borderRadius: 2,
                py: 0.5,
                px: 1,
                transition: 'all 0.2s ease',
                backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                '&:hover': {
                  backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.18) : theme.palette.action.hover
                }
              }}
            />
          )
        })}
      </Stack>

      <Stack spacing={1.5} sx={{ mt: 2 }}>
        <Tooltip title={isApplyDisabled ? t('Select a filter to apply') : ''} arrow placement="top">
          <span>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              disabled={isApplyDisabled}
              onClick={handleApplyFilters}
              sx={{ textTransform: 'none', borderRadius: 2, py: 1.1, fontWeight: 600, fontSize: '0.875rem' }}
            >
              {t('Apply Filters')}
            </Button>
          </span>
        </Tooltip>

        <Tooltip title={isClearDisabled ? t('No active filters to clear') : ''} arrow placement="top">
          <span>
            <Button
              variant="outlined"
              fullWidth
              disabled={isClearDisabled}
              onClick={handleClearFilters}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                py: 1,
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              {t('Clear Filters')}
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Box>
  )

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
      <Fade in timeout={500}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 3, gap: 0.5, color: 'text.secondary', fontSize: '0.85rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.secondary, fontWeight: 500 }}>
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
              <Typography key={name} component="span" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem' }}>
                {t(name.charAt(0).toUpperCase() + name.slice(1))}
              </Typography>
            ) : null
          })}
        </Box>
      </Fade>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 4 }, alignItems: 'flex-start' }}>
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              display: { xs: 'none', md: 'block' },
              width: 270,
              flexShrink: 0,
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              position: 'sticky',
              top: 90,
              maxHeight: 'calc(100vh - 110px)',
              overflowY: 'auto',
              zIndex: 1
            }}
          >
            {sidebarContent}
          </Paper>
        </Fade>
        <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
          <Fade in timeout={700}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  {t('Shop')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                  {t('Showing')} <strong style={{ color: theme.palette.text.primary }}>{totalCount}</strong> {t('products')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center'}}>
                <Badge
                  badgeContent={activeFiltersCount}
                  color="primary"
                  sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FilterListIcon />}
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 0.8
                    }}
                  >
                    {t('Filter')}
                  </Button>
                </Badge>

                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  {t('Sort by')}:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={`${sortBy}-${ascending ? 'asc' : 'desc'}`}
                    onChange={handleSortChange}
                    displayEmpty
                    MenuProps={{ disableScrollLock: true }}
                    sx={{
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      color: 'text.primary',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
                      '& .MuiSelect-select': { py: 0.8 }
                    }}
                  >
                    <MenuItem value="price-desc">{t('Price: High to Low')}</MenuItem>
                    <MenuItem value="price-asc">{t('Price: Low to High')}</MenuItem>
                    <MenuItem value="name-asc">{t('Name: A to Z')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Fade>

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
            onPriceError={setPriceError}
          />

          {totalPages > 1 && (
            <Fade in timeout={800}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  size="medium"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      <Drawer
        anchor={i18n.language === 'ar' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: i18n.language === 'ar' ? '16px 0 0 16px' : '0 16px 16px 0',
            backgroundColor: 'background.paper',
            p: 1
          }
        }}
      >
        {sidebarContent}
      </Drawer>
    </Container>
  )
}