import { createTheme } from "@mui/material";

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
          primary: { main: '#4F46E5' },
          secondary: { main: '#06B6D4' },
          error: { main: '#F43F5E' },
          neutral: { main: '#64748B' },
          background: {
            default: '#EFF6FF',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#111827',
            secondary: '#64748B',
          },
        }
        : {
          primary: { main: '#8B5CF6' },
          secondary: { main: '#22D3EE' },
          error: { main: '#FB7185' },
          neutral: { main: '#0A0C14' },
          background: {
            default: '#0A0C14',
            paper: '#181B25',
          },
          text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
          },
        }),
    },
    spacing: 4,
    typography: {
      fontFamily: '"Inter", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1.25rem',
      },
      label: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
          },
        },
      },
    },
  })
}

export default getTheme;

/*you can add spancing : 4 means padding 1 will be 4 px instead of 8px , also typography to change the font used */