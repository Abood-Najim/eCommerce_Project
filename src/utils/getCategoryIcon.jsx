import React from 'react'
import ComputerIcon from '@mui/icons-material/Computer'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import CategoryIcon from '@mui/icons-material/Category'

  const getCategoryIcon = (name, fontSize = 48) => {
  if (!name) return <CategoryIcon sx={{ fontSize }} />

  const lower = name.toLowerCase()

  if (
    lower.includes('computer') ||
    lower.includes('laptop') ||
    lower.includes('pc') ||
    lower.includes('electronics') ||
    name.includes('إلكترونيات') ||
    name.includes('كمبيوتر') ||
    name.includes('لابتوب')
  ) {
    return <ComputerIcon sx={{ fontSize }} />
  }

  if (
    lower.includes('audio') ||
    lower.includes('headphone') ||
    lower.includes('ear') ||
    name.includes('سماعات') ||
    name.includes('صوت')
  ) {
    return <HeadphonesIcon sx={{ fontSize }} />
  }

  if (
    lower.includes('phone') ||
    lower.includes('mobile') ||
    name.includes('هاتف') ||
    name.includes('موبايل') ||
    name.includes('هواتف')
  ) {
    return <PhoneAndroidIcon sx={{ fontSize }} />
  }

  if (
    lower.includes('wears') ||
    lower.includes('clothes') ||
    name.includes('ملابس') ||
    name.includes('أزياء')
  ) {
    return <CheckroomIcon sx={{ fontSize }} />
  }

  if (
    lower.includes('game') ||
    lower.includes('console') ||
    name.includes('ألعاب') ||
    name.includes('كونسول')
  ) {
    return <SportsEsportsIcon sx={{ fontSize }} />
  }

  return <CategoryIcon sx={{ fontSize }} />
}

export default getCategoryIcon