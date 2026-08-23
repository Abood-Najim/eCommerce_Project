import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  Chip,
  alpha,
  Paper,
  TextField,
  Avatar,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Zoom,
  Slide,
  Grow
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SpeedIcon from '@mui/icons-material/Speed'
import SecurityIcon from '@mui/icons-material/Security'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import InstagramIcon from '@mui/icons-material/Instagram'
import TuneIcon from '@mui/icons-material/Tune'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import CompassCalibrationOutlinedIcon from '@mui/icons-material/CompassCalibrationOutlined'
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined'
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined'

import useCategories from '../../hooks/useCategories'
import getCategoryIcon from '../../utils/getCategoryIcon'
import heroImage from './assets/hero.jpg'
import keyboardImage from './assets/keyboard.jpg'
import deskImage from './assets/deskSetup.jpg'


export default function Home() {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isRtl = i18n.language === 'ar'

  const [activeFeature, setActiveFeature] = useState(0)

  const { data: categoriesData } = useCategories()
  const categories = (categoriesData?.response?.data || []).filter((cat) => cat && cat.name)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const emailInput = form.elements.email?.value

    if (!emailInput) {
      toast.error(t('Please enter a valid email address'))
      return
    }

    toast.success(t('Successfully subscribed to newsletter!'))
    form.reset()
  }
  const STATIC_REVIEWS = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Senior Software Engineer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    comment: 'The mechanical keyboard tactile feedback completely transformed my daily coding workflow. Unmatched build precision.'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Creative Director',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    comment: 'Minimalist aesthetic, flawless integration with my workspace, and lighting speed delivery. Absolutely world-class experience.'
  },
  {
    id: 3,
    name: 'Marcus Chen',
    role: 'Digital Nomad',
    avatar: 'https://i.pravatar.cc/150?img=53',
    rating: 5,
    comment: 'From customer support to product unboxing, Lumina Luxe sets the gold standard for premium tech stores.'
  }
]

const BRAND_STATS = [
  { value: t('99.8%'), label: t('Customer Satisfaction') },
  { value: t('50K+'), label: t('Global Shipments') },
  { value: t('24/7'), label: t('VIP Tech Support') },
  { value: t('2-Year'), label: t('Hardware Warranty') }
]

const GALLERY_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', handle: '@lumina_workspace' },
  { id: 2, url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', handle: '@tech_craft' },
  { id: 3, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500', handle: '@minimal_desk' },
  { id: 4, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500', handle: '@dev_setups' }
]

const FEATURED_PRODUCTS = [
  {
    id: 101,
    name: t('Apex Pro Wireless Keyboard'),
    price: '$189.00',
    tag: t('Best Seller'),
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
  {
    id: 102,
    name: t('Precision Master Ergonomic Mouse'),
    price: '$99.00',
    tag: t('Trending'),
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'
  },
  {
    id: 103,
    name: t('Minimalist Desk Mat (Dark Gray)'),
    price: '$45.00',
    tag: t('Popular'),
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
  }
]

  const featuresList = [
    {
      title: t('Ultra-Low Latency'),
      desc: t('Custom-engineered PCB architectures deliver sub-millisecond response rates for uncompromising performance.'),
      icon: <SpeedIcon sx={{ fontSize: 32 }} />
    },
    {
      title: t('Aerospace-Grade Materials'),
      desc: t('Machined anodized aluminum enclosures designed to withstand intense daily productivity sessions.'),
      icon: <WorkspacePremiumIcon sx={{ fontSize: 32 }} />
    },
    {
      title: t('End-to-End Encryption'),
      desc: t('Hardware-level firmware security protects custom layout mappings and profile data.'),
      icon: <SecurityIcon sx={{ fontSize: 32 }} />
    }
  ]

  const workflowSteps = [
    {
      step: '01',
      title: t('Select Hardware'),
      desc: t('Choose from our high-precision keyboards, ergonomic mice, and minimal desk items.'),
      icon: <LocalMallOutlinedIcon sx={{ fontSize: 28 }} />
    },
    {
      step: '02',
      title: t('Personalize Setup'),
      desc: t('Configure key switches, layout maps, and finish accents to complement your setup.'),
      icon: <TuneIcon sx={{ fontSize: 28 }} />
    },
    {
      step: '03',
      title: t('Express Shipping'),
      desc: t('Receive fully insured priority delivery directly to your home or studio workspace.'),
      icon: <FlightTakeoffIcon sx={{ fontSize: 28 }} />
    }
  ]

  const techSpecs = [
  {
    icon: <DeveloperBoardOutlinedIcon sx={{ fontSize: 30 }} />,
    metric: '< 1ms',
    title: t('Polling Latency'),
    desc: t('1000Hz polling rate over 2.4GHz wireless connection.')
  },
  {
    icon: <BuildOutlinedIcon sx={{ fontSize: 30 }} />,
    metric: t('6063 Aluminum'),
    title: t('Chassis Rating'),
    desc: t('Precision CNC-milled casing with bead-blasted finish.')
  },
  {
    icon: <CompassCalibrationOutlinedIcon sx={{ fontSize: 30 }} />,
    metric: t('100M Clicks'),
    title: t('Switch Lifespan'),
    desc: t('Custom lubricated optical switches with zero chatter.')
  }
]

  const faqs = [
    {
      q: t('What is the standard shipping timeframe?'),
      a: t('Express global shipping typically delivers within 3 to 5 business days, fully tracked and insured.')
    },
    {
      q: t('Are products covered under warranty?'),
      a: t('Yes, all hardware items include our comprehensive 2-year manufacturer warranty covering defect claims.')
    },
    {
      q: t('Can I customize my order configuration?'),
      a: t('Select keyboard and desk accessory lines support custom switch, keycap, and material finish configurations.')
    }
  ]

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '80vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.4)} 0%, ${theme.palette.background.default} 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ maxWidth: 680 }}>
            <Fade in timeout={600}>
              <Chip
                icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
                label={t('PREMIUM DIGITAL BOUTIQUE')}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  borderRadius: 2,
                  mb: 3,
                  px: 1.5,
                  py: 2,
                  backdropFilter: 'blur(10px)'
                }}
              />
            </Fade>
            
            <Fade in timeout={800}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', sm: '3.8rem', md: '4.5rem' },
                  lineHeight: 1.08,
                  mb: 2.5,
                  color: 'text.primary',
                  letterSpacing: '-1px'
                }}
              >
                {t('Elevate Your Digital Horizon')}
              </Typography>
            </Fade>

            <Fade in timeout={1000}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1.05rem', md: '1.2rem' },
                  lineHeight: 1.6,
                  maxWidth: 540
                }}
              >
                {t('Experience the pinnacle of performance and aesthetics with our curated collection of visionary tech.')}
              </Typography>
            </Fade>

            <Fade in timeout={1200}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  disableElevation
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.8,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}
                  endIcon={
                    <ArrowForwardIcon sx={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
                  }
                >
                  {t('Shop Collection')}
                </Button>

                <Button
                  component={Link}
                  to="/categories"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.8,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderColor: alpha(theme.palette.text.primary, 0.2),
                    color: 'text.primary',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      borderColor: theme.palette.text.primary,
                      bgcolor: alpha(theme.palette.text.primary, 0.05)
                    }
                  }}
                >
                  {t('View Vision')}
                </Button>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: -4, position: 'relative', zIndex: 3, mb: 10 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: `0px 12px 32px ${alpha(theme.palette.common.black, 0.08)}`,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: 4
            }}
          >
            {[
              {
                icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
                title: t('Express Worldwide Delivery'),
                desc: t('Insured priority shipping directly to your desk.')
              },
              {
                icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
                title: t('2-Year Comprehensive Guarantee'),
                desc: t('Full hardware warranty on all premium items.')
              },
              {
                icon: <SupportAgentOutlinedIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
                title: t('Dedicated VIP Care'),
                desc: t('24/7 technical support from our product experts.')
              }
            ].map((item, idx) => (
              <Grow in timeout={800 + idx * 200} key={idx}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, flex: 1 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grow>
            ))}
          </Paper>
        </Fade>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              py: 4,
              px: 2,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: 3
            }}
          >
            {BRAND_STATS.map((stat, idx) => (
              <Zoom in timeout={1000 + idx * 200} key={idx}>
                <Box sx={{ textAlign: 'center', minWidth: { xs: '140px', sm: '200px' } }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {t(stat.label)}
                  </Typography>
                </Box>
              </Zoom>
            ))}
          </Paper>
        </Fade>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Fade in timeout={600}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {t('Browse by category')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                {t('Find the perfect match for your workflow.')}
              </Typography>
            </Box>
          </Fade>
          <Button
            component={Link}
            to="/categories"
            variant="text"
            sx={{ fontWeight: 700, textTransform: 'none' }}
            endIcon={<ArrowForwardIcon sx={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />}
          >
            {t('View All')}
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3
          }}
        >
          {categories.slice(0, 4).map((cat, index) => (
            <Zoom in timeout={600 + index * 150} key={cat.id}>
              <Paper
                component={Link}
                to={`/products?categoryId=${cat.id}`}
                elevation={0}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
                  p: 4,
                  borderRadius: 4,
                  textDecoration: 'none',
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: theme.palette.background.paper,
                    transform: 'translateY(-6px)',
                    boxShadow: `0px 16px 32px ${alpha(theme.palette.text.primary, 0.08)}`
                  }
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.primary.main,
                    display: 'flex'
                  }}
                >
                  {getCategoryIcon(cat.name, { fontSize: 36 })}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {cat.name}
                </Typography>
              </Paper>
            </Zoom>
          ))}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
          <Fade in timeout={600}>
            <Box>
              <Chip
                label={t('CURATED SELECTION')}
                size="small"
                sx={{ fontWeight: 700, mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {t('Featured Products')}
              </Typography>
            </Box>
          </Fade>
          <Button
            component={Link}
            to="/products"
            variant="text"
            sx={{ fontWeight: 700, textTransform: 'none' }}
            endIcon={<ArrowForwardIcon sx={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />}
          >
            {t('View All Products')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {FEATURED_PRODUCTS.map((prod, index) => (
            <Grow in timeout={600 + index * 200} key={prod.id}>
              <Paper
                elevation={0}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' },
                  p: 2.5,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0px 12px 28px ${alpha(theme.palette.text.primary, 0.08)}`
                  }
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: 220, borderRadius: 3, overflow: 'hidden', mb: 2 }}>
                  <Box
                    component="img"
                    src={prod.image}
                    alt={prod.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Chip
                    label={prod.tag}
                    size="small"
                    sx={{ position: 'absolute', top: 12, left: 12, bgcolor: theme.palette.primary.main, color: '#fff', fontWeight: 700 }}
                  />
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Rating value={prod.rating} precision={0.1} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>
                      {prod.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                      {prod.price}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/products/${prod.id}`}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                    >
                      {t('View Details')}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grow>
          ))}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              {t('Architected for Perfection')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('Uncompromising engineering standard built into every component.')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 40%' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {featuresList.map((feat, idx) => (
              <Slide direction="right" in timeout={600 + idx * 200} key={idx}>
                <Paper
                  elevation={0}
                  onClick={() => setActiveFeature(idx)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    bgcolor: activeFeature === idx ? theme.palette.background.paper : 'transparent',
                    border: `1px solid ${activeFeature === idx ? theme.palette.primary.main : theme.palette.divider}`,
                    transition: 'all 0.2s ease',
                    boxShadow: activeFeature === idx ? `0px 8px 24px ${alpha(theme.palette.primary.main, 0.12)}` : 'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: activeFeature === idx ? 'primary.main' : 'text.secondary' }}>
                      {feat.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {feat.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {feat.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Slide>
            ))}
          </Box>

          <Slide direction="left" in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 60%' },
                p: 6,
                minHeight: 380,
                borderRadius: 4,
                bgcolor: alpha(theme.palette.primary.dark, 0.15),
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Chip
                label={t(`FEATURE 0${activeFeature + 1}`)}
                color="primary"
                size="small"
                sx={{ fontWeight: 800, mb: 2 }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                {featuresList[activeFeature].title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem', maxWidth: 540 }}>
                {featuresList[activeFeature].desc}
              </Typography>
            </Paper>
          </Slide>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 5,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                {t('Trending New Arrivals')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('Discover our newest cutting-edge tech additions.')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {FEATURED_PRODUCTS.slice(0, 3).map((prod, index) => (
                <Zoom in timeout={600 + index * 200} key={prod.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' },
                      p: 3,
                      borderRadius: 3,
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box
                      component="img"
                      src={prod.image}
                      alt={prod.name}
                      sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover' }}
                    />
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {prod.name}
                      </Typography>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 800, mt: 0.5 }}>
                        {prod.price}
                      </Typography>
                      <Button
                        component={Link}
                        to="/products"
                        size="small"
                        sx={{ p: 0, mt: 0.5, textTransform: 'none', fontWeight: 700, minWidth: 'auto' }}
                      >
                        {t('Shop Now')} →
                      </Button>
                    </Box>
                  </Paper>
                </Zoom>
              ))}
            </Box>
          </Paper>
        </Fade>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label={t('SIMPLE WORKFLOW')}
              size="small"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main'
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              {t('Crafting Your Ideal Setup')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('From initial selection to unboxing, experience seamless precision.')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {workflowSteps.map((step, idx) => (
            <Slide direction="up" in timeout={600 + idx * 200} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main'
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: alpha(theme.palette.text.primary, 0.15) }}>
                    {step.step}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {step.desc}
                </Typography>
              </Paper>
            </Slide>
          ))}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label={t('HARDWARE STANDARDS')}
              size="small"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main'
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              {t('Built to Rigorous Benchmarks')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('Every product undergoes stress tests to ensure lasting durability.')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {techSpecs.map((spec, idx) => (
            <Zoom in timeout={600 + idx * 200} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main' }}>{spec.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary' }}>
                  {spec.metric}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  {spec.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {spec.desc}
                </Typography>
              </Paper>
            </Zoom>
          ))}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ mb: 4 }}>
            <Chip
              label={t('HOT DEALS')}
              size="small"
              sx={{ fontWeight: 800, mb: 1, bgcolor: '#DC2626', color: '#fff' }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
              {t('Flash Savings Spotlight')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {FEATURED_PRODUCTS.slice(0, 2).map((prod, index) => (
            <Slide direction="up" in timeout={600 + index * 200} key={prod.id}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3,
                  alignItems: 'center'
                }}
              >
                <Box
                  component="img"
                  src={prod.image}
                  alt={prod.name}
                  sx={{ width: { xs: '100%', sm: 160 }, height: 160, borderRadius: 3, objectFit: 'cover' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Chip label={t('Save 20%')} size="small" color="error" sx={{ fontWeight: 800, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {prod.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t('Limited quantity remaining for this promotional offer.')}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/products/${prod.id}`}
                    variant="contained"
                    disableElevation
                    size="small"
                    sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                  >
                    {t('Claim Deal')}
                  </Button>
                </Box>
              </Paper>
            </Slide>
          ))}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              {t('Curated Favorites')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('Handpicked just for you.')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Fade in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                flex: { xs: '1 1 100%', md: '3 1 0%' },
                p: { xs: 4, sm: 6 },
                minHeight: 440,
                borderRadius: 4,
                backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%), url(${keyboardImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Chip
                label={t('Best Seller')}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  bgcolor: '#DC2626',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  borderRadius: 1.5,
                  px: 1
                }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff', mb: 1.5 }}>
                {t('Vertex Pro Mechanical')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, maxWidth: 460 }}>
                {t('The ultimate tactile experience for creators and developers.')}
              </Typography>
              <Box>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: '#fff',
                    color: '#000',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2.5,
                    px: 4,
                    '&:hover': { bgcolor: '#e2e2e2' }
                  }}
                >
                  {t('Shop Now')}
                </Button>
              </Box>
            </Paper>
          </Fade>

          <Fade in timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                flex: { xs: '1 1 100%', md: '2 1 0%' },
                p: { xs: 4, sm: 5 },
                minHeight: 440,
                borderRadius: 4,
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%), url(${deskImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <Chip
                label={t('WORKSPACE BUNDLE')}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  borderRadius: 1.5,
                  mb: 'auto'
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>
                {t('Lumina Desk Suite')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
                {t('Complete your modern home office setup.')}
              </Typography>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.4)',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2.5,
                  alignSelf: 'flex-start',
                  px: 3,
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                {t('Explore Bundle')}
              </Button>
            </Paper>
          </Fade>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4
            }}
          >
            <Box sx={{ maxWidth: 600 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <TimerOutlinedIcon sx={{ color: 'primary.main' }} />
                <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '1px' }}>
                  {t('LIMITED EDITION DROP')}
                </Typography>
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
                {t('Titanium Alloy Cyber Deck')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {t('Precision CNC machined from aerospace titanium with hot-swappable optical switches. Limited release of 250 units globally.')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'stretch', md: 'flex-end' }, gap: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary' }}>
                $349 <Typography component="span" variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>$429</Typography>
              </Typography>

              <Button
                component={Link}
                to="/products"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: 2.5,
                  textTransform: 'none'
                }}
              >
                {t('Pre-Order Drop')}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 5,
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              border: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
              backdropFilter: 'blur(12px)'
            }}
          >
            <Box sx={{ maxWidth: 580 }}>
              <Chip
                icon={<DesignServicesOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
                label={t('BESPOKE CONFIGURATOR')}
                size="small"
                sx={{ fontWeight: 700, mb: 2, borderRadius: 2, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              />
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                {t('Design Your Dream Studio Setup')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.05rem' }}>
                {t('Mix and match keycap profiles, desk mats, and cable accents in our interactive 3D studio preview.')}
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon sx={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />}
              sx={{
                px: 5,
                py: 2,
                fontWeight: 800,
                fontSize: '1rem',
                borderRadius: 3,
                textTransform: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {t('Launch Configurator')}
            </Button>
          </Paper>
        </Fade>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              {t('Voices of the Collective')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('Trusted by creators worldwide.')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {STATIC_REVIEWS.map((review, index) => (
            <Grow in timeout={600 + index * 200} key={review.id}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0px 12px 28px ${alpha(theme.palette.text.primary, 0.06)}`
                  }
                }}
              >
                <Box>
                  <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      color: 'text.primary',
                      lineHeight: 1.6,
                      mb: 3
                    }}
                  >
                    "{review.comment}"
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Avatar src={review.avatar} alt={review.name} sx={{ width: 44, height: 44 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {review.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grow>
          ))}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip
              icon={<InstagramIcon sx={{ fontSize: '1rem !important' }} />}
              label={t('COMMUNITY SETUPS')}
              size="small"
              sx={{ fontWeight: 700, mb: 1.5, borderRadius: 2 }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>
              {t('Designed into Workspaces')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {GALLERY_IMAGES.map((img, index) => (
            <Zoom in timeout={600 + index * 150} key={img.id}>
              <Box
                sx={{
                  flex: { xs: '1 1 calc(50% - 8px)', sm: '1 1 calc(25% - 12px)' },
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  aspectRatio: '1 / 1',
                  '&:hover .overlay': { opacity: 1 }
                }}
              >
                <Box
                  component="img"
                  src={img.url}
                  alt={img.handle}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>
                    {img.handle}
                  </Typography>
                </Box>
              </Box>
            </Zoom>
          ))}
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ mb: 12 }}>
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
              {t('Frequently Asked Questions')}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('Everything you need to know about ordering and shipping.')}
            </Typography>
          </Box>
        </Fade>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {faqs.map((faq, idx) => (
            <Fade in timeout={600 + idx * 200} key={idx}>
              <Accordion
                elevation={0}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Fade>
          ))}
        </Box>
      </Container>

      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.3) : '#090D16',
          color: '#fff',
          py: { xs: 8, md: 10 },
          px: 3,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4
            }}
          >
            <Fade in timeout={800}>
              <Box sx={{ flex: 1, maxWidth: 520 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.5px' }}>
                  {t('Stay Ahead of the Curve')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  {t('Join our exclusive newsletter for early access to limited edition drops, designer collaborations, and technological insights.')}
                </Typography>
              </Box>
            </Fade>

            <Fade in timeout={1000}>
              <Box
                component="form"
                onSubmit={handleNewsletterSubmit}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  width: '100%',
                  maxWidth: 460
                }}
              >
                <TextField
                  name="email"
                  type="email"
                  placeholder={t('Enter your email')}
                  variant="outlined"
                  fullWidth
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    borderRadius: 2.5,
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      borderRadius: 2.5,
                      fieldset: { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,0.5)',
                      opacity: 1
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.8,
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 2.5,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t('Subscribe')}
                </Button>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

    </Box>
  )
}