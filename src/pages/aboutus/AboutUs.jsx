import React from 'react'
import { Box, Container, Typography, Paper, useTheme, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DiamondIcon from '@mui/icons-material/Diamond'
import PeopleIcon from '@mui/icons-material/People'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import SpeedIcon from '@mui/icons-material/Speed'

export default function AboutUs() {
  const { t } = useTranslation()
  const theme = useTheme()

  const values = [
    {
      icon: <DiamondIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: t('Quality First'),
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: t('Community Driven'),
      desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: t('Innovation First'),
      desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: t('Fast & Reliable'),
      desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ]

  return (
    <Paper sx={{ py: 6, px: { xs: 2, md: 4 }, backgroundColor: 'background.default', minHeight: '100vh',borderRadius:0 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
            {t('About Us')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.')}
          </Typography>
        </Box>

        <Divider sx={{ mb: 6 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 8 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {t('Our Story')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {t('Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')}
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              {t('Our Mission')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
              {t('"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."')}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 4, textAlign: 'center' }}>
            {t('Our Core Values')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: 3 }}>
            {values.map((value, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 45%' },
                  p: 4,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  backgroundColor: 'background.paper'
                }}
              >
                {value.icon}
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {value.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

      </Container>
    </Paper>
  )
}