import React, { useState, useEffect, useMemo, useCallback } from 'react'
import useProduct from '../../hooks/useProduct'
import useProducts from '../../hooks/useProducts'
import { useParams, Link, useNavigate, ScrollRestoration } from 'react-router-dom'
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Container,
  Rating,
  Divider,
  Paper,
  useTheme,
  IconButton,
  Chip,
  Tabs,
  Tab,
  TextField,
  Avatar,
  Stack,
  alpha,
  Skeleton,
  Dialog,
  DialogContent,
  IconButton as MuiIconButton,
  Fab,
  Fade,
  Zoom,
  Slide,
  Grow
} from '@mui/material'
import useAddToCart from '../../hooks/useAddToCart'
import useAddReview from '../../hooks/useAddReview'
import useAuthStore from '../../store/useAuthStore'
import useLoginPromptStore from '../../store/useLoginPromptStore'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import usbHubsImg from './assets/BEST-USB-HUBS.webp'
import headphonesImg from './assets/bluetoothheadphones.webp'
import classicLS4Img from './assets/ClassicLS4.webp'
import deskLampImg from './assets/desk-lamp.webp'
import mouseImg from './assets/mouse.webp'
import powerBankImg from './assets/Power-Bank.webp'
import cookwareImg from './assets/stainless-steel-cookware.webp'
import thermalMugImg from './assets/Winans_perka_thermal_mug_with_straw.webp'

const ReviewForm = React.memo(({
  reviewRating,
  setReviewRating,
  reviewComment,
  setReviewComment,
  handleSubmitReview,
  reviewPending,
  t,
  theme
}) => {
  return (
    <Slide direction="up" in timeout={600}>
      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSubmitReview}
        sx={{
          p: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.background.default, 0.4)
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontSize: '1.05rem', color: 'text.primary' }}>
          {t('Write a Review')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {t('Your Rating')}:
          </Typography>
          <Rating
            value={reviewRating}
            onChange={(event, newValue) => setReviewRating(newValue || 0)}
            precision={1}
            size="small"
            sx={{
              color: theme.palette.primary.main,
              direction: 'ltr'
            }}
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder={t('Share your experience...')}
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiInputBase-root': {
              borderRadius: 2,
              bgcolor: 'background.paper',
              fontSize: '0.9rem',
              color: 'text.primary'
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          disabled={reviewPending || !reviewRating || !reviewComment.trim()}
          sx={{ textTransform: 'none', borderRadius: 2, py: 1, fontWeight: 600 }}
        >
          {reviewPending ? <CircularProgress size={22} color="inherit" /> : t('Submit Review')}
        </Button>
      </Paper>
    </Slide>
  )
})

ReviewForm.displayName = 'ReviewForm'

export default function ProductDetails() {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const openLoginPrompt = useLoginPromptStore((state) => state.openLoginPrompt)
  const { mutate: addToCart, isPending: cartPending } = useAddToCart()
  const { mutate: addReview, isPending: reviewPending } = useAddReview()
  const { data, isLoading, isError, error } = useProduct(id)
  const { data: relatedData, isLoading: isRelatedLoading } = useProducts({ limit: 4 })

  const [quantity, setQuantity] = useState(1)
  const [tabValue, setTabValue] = useState(0)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [isExpandedOverview, setIsExpandedOverview] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const product = useMemo(() => data?.response || {}, [data])
  const reviewCount = product.reviews?.length || 0
  const activeImage = selectedImage || product.image
  const thumbnails = useMemo(() => {
    return product.images && product.images.length > 0
      ? product.images
      : [product.image]
  }, [product.images, product.image])

  const relatedProducts = useMemo(() => relatedData?.response?.data || [], [relatedData])

  const moreToLoveProducts = useMemo(() => [
  { id: 1, name: t('BEST USB HUBS'), price: 45, image: usbHubsImg },
  { id: 2, name: t('Bluetooth Headphones'), price: 85, image: headphonesImg },
  { id: 3, name: t('Classic LS4'), price: 120, image: classicLS4Img },
  { id: 4, name: t('LED Desk Lamp'), price: 40, image: deskLampImg },
  { id: 5, name: t('Ergonomic Mouse'), price: 35, image: mouseImg },
  { id: 6, name: t('Power Bank'), price: 50, image: powerBankImg },
  { id: 7, name: t('Stainless Steel Cookware'), price: 75, image: cookwareImg },
  { id: 8, name: t('Thermal Travel Mug'), price: 25, image: thermalMugImg },
], [t])

  const isFreeDeliveryEligible = (product.price * quantity) >= 500
  const amountNeededForFreeShipping = 500 - (product.price * quantity)

  const overviewText = product.shortDescription || (product.description
    ? product.description.length > 130
      ? product.description.substring(0, 130) + '...'
      : product.description
    : '')

  const ratingDistribution = useMemo(() => {
    const reviews = product?.reviews || []
    const total = reviews.length

    return [5, 4, 3, 2, 1].map(stars => {
      const count = reviews.filter(r => r.rating === stars).length
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0
      return { stars, val: percentage, count }
    })
  }, [product])

  useEffect(() => {
    setSelectedImage(null)
    setShowAllReviews(false)
    setTabValue(0)
    setQuantity(1)
    setReviewRating(0)
    setReviewComment('')
    setIsExpandedOverview(false)
  }, [id])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue)
  }, [])

  const handleQuantityChange = useCallback((delta) => {
    if (!product) return
    const maxQuantity = product.quantity || 99
    const newQuantity = Math.max(1, Math.min(quantity + delta, maxQuantity))
    setQuantity(newQuantity)
  }, [quantity, product])

  const handleAddToCart = useCallback(() => {
    if (!token) {
      openLoginPrompt()
      return
    }
    if (!product || product.quantity === 0) return

    addToCart(
      { productId: product.id, count: quantity },
      {
        onSuccess: () => {
          toast.success(t('Item added to cart successfully!'), {
            autoClose: 3000,
          })
        },
        onError: (error) => {
          const rawMessage = error?.response?.data?.message
          const localizedMessage = rawMessage 
            ? t(rawMessage) 
            : t('Failed to add to cart.')

          toast.error(localizedMessage)
        }
      }
    )
  }, [token, openLoginPrompt, addToCart, product, quantity, t])

  const handleSubmitReview = useCallback((e) => {
    e.preventDefault()
    if (!token) {
      openLoginPrompt()
      return
    }
    if (!reviewRating || !reviewComment.trim()) {
      toast.warning(t('Please provide a rating and comment.'))
      return
    }

    addReview(
      {
        productId: id,
        rating: reviewRating,
        comment: reviewComment
      },
      {
        onSuccess: () => {
          setReviewRating(0)
          setReviewComment('')
          toast.success(t('Review submitted successfully!'), {
            autoClose: 3000,
          })
        },
        onError: (error) => {
          const rawMessage = error?.response?.data?.message
          const localizedMessage = rawMessage 
            ? t(rawMessage) 
            : t('Failed to submit review.')

          toast.error(localizedMessage)
        }
      }
    )
  }, [token, openLoginPrompt, addReview, id, reviewRating, reviewComment, t])

  const handleRelatedProductClick = useCallback((productId) => {
    navigate(`/product/${productId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      document.querySelector('h1')?.focus()
    }, 100)
  }, [navigate])

  const handleShare = useCallback((platform) => {
    const url = window.location.href
    const text = t('Check out this product: ') + product?.name
    let shareUrl = ''

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        break
      default:
        if (navigator.share) {
          navigator.share({ title: product?.name, text, url })
          return
        }
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
    setShareMenuOpen(false)
  }, [product, t])

  const handleImageNavigation = useCallback((direction) => {
    const currentIndex = thumbnails.indexOf(activeImage)
    let newIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % thumbnails.length
    } else {
      newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length
    }
    setSelectedImage(thumbnails[newIndex])
  }, [thumbnails, activeImage])

  const formatPrice = useCallback((price) => {
    return `$${price}`
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton width={200} height={24} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 3, sm: 4, lg: 6 }, alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2, flex: { xs: '1 1 100%', sm: '0 0 50%' }, width: '100%' }}>
            <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1.5}>
              <Skeleton variant="rounded" width={56} height={56} />
              <Skeleton variant="rounded" width={56} height={56} />
            </Stack>
            <Skeleton variant="rounded" sx={{ flex: 1, height: { xs: 260, sm: 340, md: 420 }, width: '100%' }} />
          </Box>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Stack spacing={2.5}>
              <Skeleton width={80} height={24} />
              <Skeleton width="80%" height={40} />
              <Skeleton width={150} height={24} />
              <Skeleton width={100} height={36} />
              <Skeleton width="100%" height={80} />
              <Divider />
              <Skeleton width="100%" height={56} />
            </Stack>
          </Box>
        </Box>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Typography color="error" variant="h6" align="center">
          {error?.message || t('Failed to load product details.')}
        </Typography>
      </Container>
    )
  }

  return (
    <>
      <ScrollRestoration />

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, md: 5 },
          px: { xs: 1.5, md: 4 },
          maxWidth: { xl: '1400px' }
        }}
      >
        <Fade in={showBackToTop}>
          <Fab
            color="primary"
            size="small"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: { xs: 80, md: 32 },
              right: 32,
              zIndex: 1001,
              boxShadow: theme.shadows[4]
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Fade>

        <Fade in timeout={500}>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 0.5,
            mb: 4,
            color: 'text.secondary',
            fontSize: '0.85rem'
          }}>
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.secondary, fontWeight: 500 }}>
              {t('Home')}
            </Link>
            <ChevronRightIcon
              fontSize="small"
              sx={{
                color: 'text.secondary',
                mx: 0.2,
                transform: i18n.language === 'ar' ? 'rotate(180deg)' : 'none'
              }}
            />
            <Link to="/products" style={{ textDecoration: 'none', color: theme.palette.text.secondary, fontWeight: 500 }}>
              {t('Products')}
            </Link>
            <ChevronRightIcon
              fontSize="small"
              sx={{
                color: 'text.secondary',
                mx: 0.2,
                transform: i18n.language === 'ar' ? 'rotate(180deg)' : 'none'
              }}
            />
            <Typography component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {product.name}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 3, sm: 4, lg: 5 }, alignItems: 'flex-start' }}>
          <Slide direction="right" in timeout={600}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                gap: 2,
                flex: { xs: '1 1 100%', sm: '0 0 48%', md: '0 0 50%' },
                width: '100%',
                position: { md: 'sticky' },
                top: { md: 90 },
                alignSelf: 'flex-start',
              }}
            >
              <Stack
                direction={{ xs: 'row', sm: 'column' }}
                spacing={1.5}
                sx={{
                  overflowX: { xs: 'auto', sm: 'visible' },
                  pb: { xs: 1, sm: 0 },
                  flexShrink: 0                }}
              >
                {thumbnails.map((imgSrc, idx) => {
                  const isActive = activeImage === imgSrc
                  return (
                    <Paper
                      key={idx}
                      elevation={0}
                      onClick={() => setSelectedImage(imgSrc)}
                      sx={{
                        width: { xs: 48, sm: 60, md: 72 },
                        height: { xs: 48, sm: 60, md: 72 },
                        border: '2px solid',
                        borderColor: isActive ? theme.palette.primary.main : theme.palette.divider,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'background.paper',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={imgSrc}
                        alt={`Thumbnail ${idx + 1}`}
                        sx={{ width: '75%', height: '75%', objectFit: 'contain' }}
                      />
                    </Paper>
                  )
                })}
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  width: '100%',
                  maxHeight: { xs: 260, sm: 340, md: 440 },
                  aspectRatio: '1 / 1',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : '#f9fafb',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, sm: 3, md: 4 },
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'zoom-in'
                }}
                onClick={() => setZoomOpen(true)}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(-1)
                  }}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 10,
                    bgcolor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(8px)',
                    color: theme.palette.text.primary,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.7)',
                      transform: 'scale(1.05)'
                    },
                    display: { xs: 'flex', md: 'none' }
                  }}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>

                {thumbnails.length > 1 && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageNavigation('prev')
                      }}
                      sx={{
                        position: 'absolute',
                        left: 4,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <ArrowLeftIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageNavigation('next')
                      }}
                      sx={{
                        position: 'absolute',
                        right: 4,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </>
                )}

                <Box
                  component="img"
                  src={activeImage}
                  alt={product.name}
                  sx={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.12))',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.04)' }
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setZoomOpen(true)
                  }}
                >
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Paper>

              <Dialog
                open={zoomOpen}
                onClose={() => setZoomOpen(false)}
                maxWidth="lg"
                fullWidth
                disableScrollLock
                keepMounted={false}
              >
                <DialogContent sx={{ p: 0, bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                  <MuiIconButton
                    onClick={() => setZoomOpen(false)}
                    sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
                  >
                    <CloseIcon />
                  </MuiIconButton>
                  <Box
                    component="img"
                    src={activeImage}
                    alt={product.name}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '80vh',
                      objectFit: 'contain'
                    }}
                  />
                </DialogContent>
              </Dialog>
            </Box>
          </Slide>

          <Slide direction="left" in timeout={700}>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={product.quantity > 0 ? t('In Stock') : t('Out of Stock')}
                      size="small"
                      sx={{
                        bgcolor: product.quantity > 0 ? alpha(theme.palette.success.main, 0.12) : alpha(theme.palette.error.main, 0.12),
                        color: product.quantity > 0 ? theme.palette.success.main : theme.palette.error.main,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        borderRadius: 1.5,
                        px: 0.5
                      }}
                    />
                  </Box>
                  <Box>
                    <IconButton onClick={() => setShareMenuOpen(true)} size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                    <Dialog
                      open={shareMenuOpen}
                      onClose={() => setShareMenuOpen(false)}
                      maxWidth="xs"
                      fullWidth
                      disableScrollLock
                      keepMounted={false}
                    >
                      <DialogContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                          {t('Share this product')}
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center">
                          <IconButton
                            onClick={() => handleShare('facebook')}
                            sx={{ bgcolor: '#1877F2', color: 'white', '&:hover': { bgcolor: '#166FE5' } }}
                          >
                            <FacebookIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleShare('twitter')}
                            sx={{ bgcolor: '#000000', color: 'white', '&:hover': { bgcolor: '#1A1A1A' } }}
                          >
                            <TwitterIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleShare('whatsapp')}
                            sx={{ bgcolor: '#25D366', color: 'white', '&:hover': { bgcolor: '#20BD5A' } }}
                          >
                            <WhatsAppIcon />
                          </IconButton>
                        </Stack>
                      </DialogContent>
                    </Dialog>
                  </Box>
                </Box>

                <Zoom in timeout={700}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1.25,
                      fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2.125rem' },
                      tabIndex: 0
                    }}
                  >
                    {product.name}
                  </Typography>
                </Zoom>

                <Fade in timeout={800}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Rating
                      value={product.rate || 0}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        direction: 'ltr'
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {(product.rate || 0).toFixed(1)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                      ({reviewCount} {t('Reviews')})
                    </Typography>
                  </Box>
                </Fade>

                <Grow in timeout={900}>
                  <Typography variant="h3" component="p" sx={{ fontWeight: 700, color: theme.palette.primary.main, fontSize: { xs: '1.6rem', sm: '2rem', md: '3rem' } }}>
                    {formatPrice(product.price)}
                  </Typography>
                </Grow>

                <Fade in timeout={1000}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: product.quantity > 0 ? theme.palette.success.main : theme.palette.error.main
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: product.quantity > 0 ? theme.palette.success.main : theme.palette.error.main }}>
                      {product.quantity > 0 ? t('Ready to ship') : t('Currently Unavailable')}
                    </Typography>
                  </Box>
                </Fade>

                <Divider />

                <Fade in timeout={1100}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                      {t('Overview')}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '0.95rem', color: 'text.primary' }}>
                      {isExpandedOverview ? product.shortDescription || product.description : overviewText}
                    </Typography>
                    {(product.shortDescription || product.description) && (product.shortDescription || product.description).length > 130 && (
                      <Typography
                        component="span"
                        onClick={() => setIsExpandedOverview(!isExpandedOverview)}
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          mt: 0.5,
                          display: 'inline-block',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {isExpandedOverview ? t('Show Less') : t('Read More')}
                      </Typography>
                    )}
                  </Box>
                </Fade>

                <Divider />

                <Fade in timeout={1200}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {t('Quantity')}:
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        overflow: 'hidden'
                      }}
                    >
                      <IconButton
                        size="small"
                        disabled={quantity <= 1}
                        onClick={() => handleQuantityChange(-1)}
                        sx={{ px: 1.5, py: 1, borderRadius: 0, '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 2, py: 1, fontWeight: 600, minWidth: 36, textAlign: 'center', fontSize: '0.9rem', color: 'text.primary' }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.quantity || 99)}
                        sx={{ px: 1.5, py: 1, borderRadius: 0, '&:hover': { bgcolor: 'action.hover' } }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Fade>

                <Fade in timeout={1300}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    disableElevation
                    startIcon={product.quantity > 0 ? <ShoppingBagOutlinedIcon /> : null}
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0 || cartPending}
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      borderRadius: 2.5,
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    {product.quantity === 0
                      ? t('Out of Stock')
                      : cartPending
                        ? <CircularProgress size={24} color="inherit" />
                        : t('Add to Cart')
                    }
                  </Button>
                </Fade>

                <Fade in timeout={1400}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', pt: 1 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        minWidth: 160,
                        bgcolor: 'background.paper'
                      }}
                    >
                      <LocalShippingOutlinedIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem', color: 'text.primary' }}>
                          {isFreeDeliveryEligible ? t('Free Delivery Eligible') : t('Standard Shipping')}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                          {isFreeDeliveryEligible
                            ? t('Qualifies for free shipping')
                            : `${t('Add')} ${formatPrice(amountNeededForFreeShipping)} ${t('more for free delivery')}`}
                        </Typography>
                      </Box>
                    </Paper>
                    <Paper
                      elevation={0}
                      sx={{
                        flex: 1,
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        minWidth: 160,
                        bgcolor: 'background.paper'
                      }}
                    >
                      <VerifiedUserOutlinedIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem', color: 'text.primary' }}>
                          {t('2 Year Warranty')}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {t('Full coverage protection')}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Fade>
              </Stack>
            </Box>
          </Slide>
        </Box>

        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            bgcolor: 'background.paper',
            borderTop: `1px solid ${theme.palette.divider}`,
            p: 2,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                {formatPrice(product.price)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {product.quantity > 0 ? t('In Stock') : t('Out of Stock')}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="medium"
              disableElevation
              startIcon={product.quantity > 0 ? <ShoppingBagOutlinedIcon /> : null}
              onClick={handleAddToCart}
              disabled={product.quantity === 0 || cartPending}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              {product.quantity === 0 ? t('Out of Stock') : cartPending ? <CircularProgress size={20} color="inherit" /> : t('Add to Cart')}
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 8 }, mb: { xs: 8, md: 0 } }}>
          <Slide direction="up" in timeout={800}>
            <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2, sm: 3 }, pt: 1, bgcolor: 'background.paper' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      minWidth: 'auto',
                      px: { xs: 2, sm: 3 },
                      py: 2
                    }
                  }}
                >
                  <Tab label={t('Description')} />
                  <Tab label={`${t('Customer Reviews')} (${reviewCount})`} />
                </Tabs>
              </Box>

              <Box sx={{ p: { xs: 2.5, sm: 4 } }}>
                {tabValue === 0 && (
                  <Fade in timeout={600}>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '0.95rem', color: 'text.primary' }}>
                      {product.description}
                    </Typography>
                  </Fade>
                )}

                {tabValue === 1 && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 4,
                      alignItems: 'stretch'
                    }}
                  >
                    <Box
                      sx={{
                        flex: { xs: '1 1 100%', md: '1 1 auto' },
                        width: '100%'
                      }}
                    >
                      <Stack spacing={2}>
                        {product.reviews && product.reviews.length > 0 ? (
                          (showAllReviews ? product.reviews : product.reviews.slice(0, 4)).map((review, index) => (
                            <Fade in timeout={400 + index * 100} key={index}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 3,
                                  border: `1px solid ${theme.palette.divider}`,
                                  borderRadius: 3,
                                  bgcolor: 'background.paper'
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main, fontSize: '0.9rem', fontWeight: 600 }}>
                                      {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                                    </Avatar>
                                    <Box>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2, color: 'text.primary' }}>
                                        {review.userName}
                                      </Typography>
                                      <Rating
                                        value={review.rating}
                                        readOnly
                                        size="small"
                                        sx={{
                                          color: theme.palette.primary.main,
                                          mt: 0.3,
                                          direction: 'ltr'
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    {new Date(review.createdAt).toLocaleDateString(i18n.language)}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ lineHeight: 1.6, pl: 6.5, color: 'text.primary' }}>
                                  {review.comment}
                                </Typography>
                              </Paper>
                            </Fade>
                          ))
                        ) : (
                          <Fade in timeout={600}>
                            <Paper
                              elevation={0}
                              sx={{ p: 4, textAlign: 'center', border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}
                            >
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {t('No reviews yet.')}
                              </Typography>
                            </Paper>
                          </Fade>
                        )}

                        {product.reviews && product.reviews.length > 4 && (
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setShowAllReviews((prev) => !prev)}
                            sx={{
                              mt: 2,
                              py: 1.5,
                              borderRadius: 2.5,
                              textTransform: 'none',
                              fontWeight: 600,
                              borderColor: theme.palette.divider,
                              color: 'text.primary',
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                bgcolor: alpha(theme.palette.primary.main, 0.04)
                              }
                            }}
                          >
                            {showAllReviews
                              ? t('Show Less')
                              : `${t('Show More Reviews')} (${product.reviews.length - 4})`}
                          </Button>
                        )}
                      </Stack>
                    </Box>

                    <Box
                      sx={{
                        flex: { xs: '1 1 100%', md: '0 0 38%' },
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                      }}
                    >
                      <Slide direction="left" in timeout={700}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 3,
                            bgcolor: 'background.paper',
                            textAlign: 'center'
                          }}
                        >
                          <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 0.5 }}>
                            {(product.rate || 0).toFixed(1)}
                          </Typography>
                          <Rating
                            value={product.rate || 0}
                            readOnly
                            precision={0.5}
                            size="medium"
                            sx={{
                              color: theme.palette.primary.main,
                              mb: 1,
                              direction: 'ltr'
                            }}
                          />
                          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {t('Based on')} {reviewCount} {t('reviews')}
                          </Typography>

                          <Stack spacing={1} sx={{ width: '100%', mt: 2 }}>
                            {ratingDistribution.map((row) => (
                              <Box key={row.stars} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '0.85rem' }}>
                                <Typography variant="caption" sx={{ minWidth: 30, color: 'text.primary' }}>{row.stars} {t('star')}</Typography>
                                <Box sx={{ flex: 1, height: 6, bgcolor: theme.palette.divider, borderRadius: 3, overflow: 'hidden' }}>
                                  <Box sx={{ width: `${row.val}%`, height: '100%', bgcolor: theme.palette.primary.main }} />
                                </Box>
                                <Typography variant="caption" sx={{ minWidth: 25, textAlign: 'right', color: 'text.secondary' }}>{row.val}%</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Paper>
                      </Slide>

                      <Box
                        sx={{
                          position: { md: 'sticky' },
                          top: { md: 90 },
                          zIndex: 1
                        }}
                      >
                        {token ? (
                          <ReviewForm
                            reviewRating={reviewRating}
                            setReviewRating={setReviewRating}
                            reviewComment={reviewComment}
                            setReviewComment={setReviewComment}
                            handleSubmitReview={handleSubmitReview}
                            reviewPending={reviewPending}
                            t={t}
                            theme={theme}
                          />
                        ) : (
                          <Fade in timeout={800}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 3,
                                textAlign: 'center',
                                bgcolor: alpha(theme.palette.background.default, 0.4)
                              }}
                            >
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {t('Please')}{' '}
                                <Link to="/login" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                                  {t('Login')}
                                </Link>{' '}
                                {t('to write a review.')}
                              </Typography>
                            </Paper>
                          </Fade>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Slide>
        </Box>

        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <Fade in timeout={600}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
              {t('Featured Products')}
            </Typography>
          </Fade>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            '& > *': {
              width: { xs: 'calc(50% - 10px)', sm: 'calc(33.33% - 14px)', md: 'calc(20% - 16px)' },
            }
          }}>
            {isRelatedLoading ? (
              [...Array(4)].map((_, idx) => (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2.5,
                    bgcolor: 'background.paper'
                  }}
                >
                  <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '1 / 1', borderRadius: 1, mb: 1.5 }} />
                  <Skeleton width="80%" height={20} sx={{ mb: 0.5 }} />
                  <Skeleton width="40%" height={20} />
                </Paper>
              ))
            ) : relatedProducts.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', width: '100%' }}>
                {t('No related products available')}
              </Typography>
            ) : (
              relatedProducts.filter(item => item.id !== product.id).slice(0, 4).map((item, index) => (
                <Grow in timeout={400 + index * 100} key={item.id}>
                  <Paper
                    elevation={0}
                    onClick={() => handleRelatedProductClick(item.id)}
                    sx={{
                      p: 1.5,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2.5,
                      bgcolor: 'background.paper',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'contain',
                        mb: 1.5,
                        borderRadius: 1
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.primary.main, mt: 'auto' }}>
                      {formatPrice(item.price)}
                    </Typography>
                  </Paper>
                </Grow>
              ))
            )}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <Fade in timeout={600}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
              {t('More to Love')}
            </Typography>
          </Fade>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            '& > *': {
              width: { xs: 'calc(50% - 10px)', sm: 'calc(33.33% - 14px)', md: 'calc(20% - 16px)' },
            }
          }}>
            {moreToLoveProducts.map((item, index) => (
              <Grow in timeout={400 + index * 100} key={item.id}>
                <Paper
                  elevation={0}
                  onClick={() => handleRelatedProductClick(item.id)}
                  sx={{
                    p: 1.5,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2.5,
                    bgcolor: 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'contain',
                      mb: 1.5,
                      borderRadius: 1
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.primary.main, mt: 'auto' }}>
                    {formatPrice(item.price)}
                  </Typography>
                </Paper>
              </Grow>
            ))}

            <Grow in timeout={1000}>
              <Paper
                elevation={0}
                onClick={() => navigate('/products')}
                sx={{
                  p: 1.5,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2.5,
                  bgcolor: alpha(theme.palette.background.default, 0.5),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant="h3" sx={{ color: theme.palette.text.secondary, lineHeight: 1, fontWeight: 300 }}>
                  +
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5 }}>
                  {t('Show All')}
                </Typography>
              </Paper>
            </Grow>
          </Box>
        </Box>
      </Container>
    </>
  )
}