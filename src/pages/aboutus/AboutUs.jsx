import React from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  useTheme,
  alpha,
  Avatar,
  Fade,
  Grow,
  Slide
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined'
import HighQualityOutlinedIcon from '@mui/icons-material/HighQualityOutlined'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

export default function AboutUs() {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isRTL = i18n.language === 'ar'

  const stats = [
    { label: t('Global Customers'), value: '50K+' },
    { label: t('Luxury Products'), value: '1,200+' },
    { label: t('Countries Served'), value: '45+' },
    { label: t('Satisfaction Rate'), value: '99.8%' }
  ]

  const values = [
    {
      icon: <DiamondOutlinedIcon color="primary" sx={{ fontSize: 24 }} />,
      title: t('Uncompromising Quality'),
      description: t('Every piece in our collection is curated with precision, ensuring the highest standards of craftsmanship.')
    },
    {
      icon: <AutoAwesomeOutlinedIcon color="primary" sx={{ fontSize: 24 }} />,
      title: t('Timeless Design'),
      description: t('We blend contemporary aesthetic trends with classic elegance to create enduring products.')
    },
    {
      icon: <PublicOutlinedIcon color="primary" sx={{ fontSize: 24 }} />,
      title: t('Sustainable Luxury'),
      description: t('Committed to ethical sourcing and eco-conscious packaging without ever sacrificing elegance.')
    },
    {
      icon: <VerifiedOutlinedIcon color="primary" sx={{ fontSize: 24 }} />,
      title: t('Customer First'),
      description: t('Dedicated round-the-clock white-glove support to ensure your shopping experience is seamless.')
    }
  ]

  const timeline = [
    { year: '2021', title: t('Brand Inception'), description: t('Lumina Luxe was founded with a small boutique collection of premium goods.') },
    { year: '2023', title: t('Global Expansion'), description: t('Expanded shipping operations to cover over 45 countries with local logistics hubs.') },
    { year: '2025', title: t('Eco-Luxury Pledge'), description: t('Transitioned 100% of packaging to sustainable and biodegradable materials.') },
    { year: '2026', title: t('Digital Flagship'), description: t('Launched our next-gen digital catalog featuring seamless online customization.') }
  ]

  const craftsmanship = [
    {
      icon: <PrecisionManufacturingOutlinedIcon color="primary" sx={{ fontSize: 28 }} />,
      title: t('Handcrafted Detail'),
      description: t('Partnering exclusively with heritage artisans who bring generations of skill to every stitch and edge.')
    },
    {
      icon: <HighQualityOutlinedIcon color="primary" sx={{ fontSize: 28 }} />,
      title: t('Material Excellence'),
      description: t('Only premium-grade materials pass our strict multi-point inspection process before crafting begins.')
    }
  ]

  const testimonials = [
    {
      quote: t('Lumina Luxe delivers unmatched refinement. The attention to detail on every piece is exceptional.'),
      author: 'Sophia Reynolds',
      title: t('Verified Client')
    },
    {
      quote: t('The customer service matched the elegance of their products. A truly luxury experience from start to finish.'),
      author: 'David Sterling',
      title: t('Verified Client')
    }
  ]

  const team = [
    {
      name: 'Elena Rostova',
      role: t('Founder & Creative Director'),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Marcus Vance',
      role: t('Head of Product Design'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sophia Chen',
      role: t('Lead Curator'),
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
    }
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        py: 5,
        px: { xs: 2, md: 3 },
        backgroundColor: 'background.default',
        minHeight: '100vh',
        borderRadius: 0
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 700, mx: 'auto' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 1.5,
                display: 'block',
                mb: 1,
                textTransform: 'uppercase'
              }}
            >
              {t('About Lumina Luxe')}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '1.6rem', md: '2.2rem' },
                lineHeight: 1.25
              }}
            >
              {t('Redefining Modern Luxury Everyday')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.6 }}>
              {t('Lumina Luxe was born out of a passion for refined aesthetics and exceptional craftsmanship. We bring you handpicked collections that blend sophistication with functional modern design.')}
            </Typography>
          </Box>
        </Fade>

        <Grow in timeout={1000}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mb: 8,
              p: 3,
              borderRadius: 3,
              backgroundColor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  flex: { xs: '1 1 40%', sm: '1 1 20%' },
                  textAlign: 'center',
                  py: 0.5
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.2 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grow>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            {t('Our Core Values')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: 500, mx: 'auto' }}>
            {t('The principles that guide our curation, design choices, and customer relations.')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'center' }}>
            {values.map((value, index) => (
              <Grow in timeout={600 + index * 200} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' },
                    p: 2.5,
                    borderRadius: 2.5,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.12)}`
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {value.description}
                  </Typography>
                </Paper>
              </Grow>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            {t('Our Journey')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: 500, mx: 'auto' }}>
            {t('Key milestones that defined our growth into a modern luxury brand.')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {timeline.map((item, index) => (
              <Fade in timeout={800 + index * 150} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' },
                    p: 2.5,
                    borderRadius: 2.5,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
                    {item.year}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Fade>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            {t('Artisan Craftsmanship')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: 500, mx: 'auto' }}>
            {t('How we maintain unyielding standards across every single item.')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {craftsmanship.map((craft, index) => (
              <Slide direction="up" in timeout={700 + index * 200} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 45%' },
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {craft.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {craft.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {craft.description}
                    </Typography>
                  </Box>
                </Paper>
              </Slide>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            {t('Client Words')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: 500, mx: 'auto' }}>
            {t('Feedback from collectors who experience Lumina Luxe daily.')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {testimonials.map((item, index) => (
              <Fade in timeout={900 + index * 200} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 45%' },
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    position: 'relative'
                  }}
                >
                  <FormatQuoteIcon sx={{ color: alpha(theme.palette.primary.main, 0.2), fontSize: 40, mb: 1 }} />
                  <Typography variant="body2" color="text.primary" sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.6 }}>
                    "{item.quote}"
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.title}
                  </Typography>
                </Paper>
              </Fade>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            {t('Meet the Visionaries')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: 500, mx: 'auto' }}>
            {t('The creative minds behind Lumina Luxe bringing elegance into your hands.')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'center' }}>
            {team.map((member, index) => (
              <Grow in timeout={700 + index * 200} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 28%' },
                    p: 2.5,
                    borderRadius: 2.5,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: 'background.paper',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 72, height: 72, mx: 'auto', mb: 1.5, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500, display: 'block', mt: 0.2 }}>
                    {member.role}
                  </Typography>
                </Paper>
              </Grow>
            ))}
          </Box>
        </Box>

        <Fade in timeout={1200}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t('Ready to Experience Lumina Luxe?')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480, mb: 0.5 }}>
              {t('Explore our curated catalog of exclusive luxury products and elevate your personal lifestyle today.')}
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="medium"
              sx={{
                py: 1,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.03)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{t('Explore Products')}</span>
                <ArrowForwardIcon
                  sx={{
                    fontSize: '1.1rem',
                    transform: isRTL ? 'scaleX(-1)' : 'none'
                  }}
                />
              </Box>
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Paper>
  )
}