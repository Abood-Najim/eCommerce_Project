import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useTheme,
  alpha
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SendIcon from '@mui/icons-material/Send'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'

export default function ContactUs() {
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const isRTL = i18n.language === 'ar'
  const [expanded, setExpanded] = useState(false)

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const contactDetails = [
    {
      icon: <EmailOutlinedIcon color="primary" />,
      title: t('Email Address'),
      value: 'support@luminaluxe.com',
      href: 'mailto:support@luminaluxe.com'
    },
    {
      icon: <PhoneOutlinedIcon color="primary" />,
      title: t('Phone Number'),
      value: '+972 59923515',
      href: 'tel:+97259923515'
    },
    {
      icon: <LocationOnOutlinedIcon color="primary" />,
      title: t('Location'),
      value: 'Luxury Avenue, Palestine, JN 29754',
      href: '#'
    }
  ]

  const faqs = [
    {
      id: 'panel1',
      question: t('How long does shipping usually take?'),
      answer: t('Standard delivery takes 2-4 business days. Express shipping option is available at checkout.')
    },
    {
      id: 'panel2',
      question: t('What is your return policy?'),
      answer: t('We offer a 30-day money-back guarantee on all unopened items with original packaging.')
    },
    {
      id: 'panel3',
      question: t('How can I track my order?'),
      answer: t('Once your order ships, you will receive an email with a tracking code to follow your package live.')
    }
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        py: 6,
        px: { xs: 2, md: 4 },
        backgroundColor: 'background.default',
        minHeight: '100vh',
        borderRadius: 0
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}>
          {t('Contact Us')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 6, maxWidth: 600, mx: 'auto' }}>
          {t('Have a question or need assistance? We are here to help. Reach out to us anytime.')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch', mb: 6 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {t('Get in Touch')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                {t('We would love to hear from you. Whether you have a question about products, need assistance with your order, or just want to share feedback, our team is ready to help.')}
              </Typography>

              <Chip
                icon={<AccessTimeOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
                label={t('Average response time: 24 hours')}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 3
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contactDetails.map((item, index) => (
                <Box
                  key={index}
                  component="a"
                  href={item.href}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textDecoration: 'none',
                    color: 'text.primary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              {t('Send us a Message')}
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField fullWidth label={t('Full Name')} variant="outlined" />
                <TextField fullWidth label={t('Email Address')} variant="outlined" type="email" />
              </Box>
              <TextField fullWidth label={t('Subject')} variant="outlined" />
              <TextField fullWidth label={t('Message')} variant="outlined" multiline rows={4} />
              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5
                  }}
                >
                  <Box component="span">{t('Send Message')}</Box>
                  <SendIcon
                    sx={{
                      fontSize: '1.25rem',
                      transform: isRTL ? 'scaleX(-1)' : 'none'
                    }}
                  />
                </Box>
              </Button>
            </Box>
          </Paper>
        </Box>

        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <InfoOutlinedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t('Frequently Asked Questions')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expanded === faq.id}
                onChange={handleAccordionChange(faq.id)}
                elevation={0}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px !important',
                  '&:before': { display: 'none' }
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            mb: 4,
            overflow: 'hidden'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {t('Find Us')}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 380,
              borderRadius: 2,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Paper
              elevation={3}
              sx={{
                position: 'absolute',
                top: 16,
                right:16,
                zIndex: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                backdropFilter: 'blur(8px)',
                maxWidth: 260
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccessTimeIcon color="primary" fontSize="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {t('Business Hours')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {t('Mon - Fri')}:
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  9:00 AM - 6:00 PM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {t('Sat - Sun')}:
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'error.main' }}>
                  {t('Closed')}
                </Typography>
              </Box>
            </Paper>

            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=Palestine&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <SupportAgentOutlinedIcon color="primary" />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {t('Customer Support Notice')}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {t('Our dedicated customer support team is active during working hours. Urgent inquiries sent on weekends will be processed first thing Monday morning.')}
          </Typography>
        </Paper>
      </Container>
    </Paper>
  )
}