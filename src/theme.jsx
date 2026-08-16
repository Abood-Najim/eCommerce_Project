import { createTheme } from "@mui/material";

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: '#00B207',
              light: '#84D187',
              dark: '#2C742F',
            },
            warning: { main: '#FF8A00' },
            error: { main: '#EA4B4B' },
            background: {
              default: '#FFFFFF',
              paper: '#F8F9FA',
            },
            text: {
              primary: '#1A1A1A',
              secondary: '#666666',
            },
            grey: {
              50: '#F8F9FA',
              100: '#E6E6E6',
              200: '#CCCCCC',
              300: '#B3B3B3',
              400: '#999999',
              500: '#808080',
              600: '#666666',
              700: '#4D4D4D',
              800: '#333333',
              900: '#1A1A1A',
            },
          }
        : {
            primary: {
              main: '#00C896',
              light: '#84A98C',
              dark: '#008F6B',
            },
            warning: { main: '#EFB036' },
            error: { main: '#EF476F' },
            background: {
              default: '#121212',
              paper: '#1E1E1E',
            },
            text: {
              primary: '#E0E0E0',
              secondary: '#A0A0A0',
            },
            grey: {
              50: '#1A1A1A',
              100: '#333333',
              200: '#4D4D4D',
              300: '#666666',
              400: '#808080',
              500: '#999999',
              600: '#B3B3B3',
              700: '#CCCCCC',
              800: '#E6E6E6',
              900: '#F8F9FA',
            },
          }),
    },
    spacing: 4,
    typography: {
      fontFamily: '"Poppins", sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 400,
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 400,
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 400,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 400,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 400,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 400,
      },
      bodyXXL: {
        fontSize: '1.5rem',
        fontWeight: 400,
      },
      bodyXL: {
        fontSize: '1.25rem',
        fontWeight: 400,
      },
      bodyLarge: {
        fontSize: '1.125rem',
        fontWeight: 400,
      },
      bodyMedium: {
        fontSize: '1rem',
        fontWeight: 400,
      },
      bodySmall: {
        fontSize: '0.875rem',
        fontWeight: 400,
      },
      bodyTiny: {
        fontSize: '0.75rem',
        fontWeight: 400,
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 500,
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
            transition: 'all 0.6s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            transition: 'all 0.6s ease',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.6s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.6s ease',
          },
        },
      },
    },
  });
};

export default getTheme;