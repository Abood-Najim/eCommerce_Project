import React from 'react'
import { Box, Modal, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import useLoginPromptStore from '../../store/useLoginPromptStore'

export default function LoginPrompt() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isOpen, closeLoginPrompt } = useLoginPromptStore()

  const handleLoginRedirect = () => {
    closeLoginPrompt()
    navigate('/login')
  }

  const handleRegisterRedirect = () => {
    closeLoginPrompt()
    navigate('/register')
  }

  return (
    <Modal open={isOpen} onClose={closeLoginPrompt} disableScrollLock>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button onClick={closeLoginPrompt} size="small" sx={{ minWidth: 'auto', color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </Button>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {t('Login Required')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
          {t('You need to be signed in to perform this action.')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 2 }}>
          <Button
            onClick={handleLoginRedirect}
            variant="contained"
            fullWidth
            sx={{ textTransform: 'none', borderRadius: 2, py: 1.2 }}
          >
            {t('Sign In')}
          </Button>
          <Button
            onClick={handleRegisterRedirect}
            variant="outlined"
            fullWidth
            sx={{ textTransform: 'none', borderRadius: 2, py: 1.2 }}
          >
            {t('Register')}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}