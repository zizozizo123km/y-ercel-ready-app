export const FACEBOOK_BLUE = '#1877F2';
export const BACKGROUND_LIGHT_GREY = '#F0F2F5';
export const TEXT_PRIMARY = '#050505';

// Define the structure of the theme object

export const palette = {
  primary: {
    main: FACEBOOK_BLUE,
    light: '#4299FF',
    dark: '#0E5EB9',
    contrastText: '#FFFFFF',
  },
  secondary: {
    // Often used for action buttons or notifications
    main: '#28A745', 
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#FA383E', // Facebook alert/danger red
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFC024',
    contrastText: TEXT_PRIMARY,
  },
  info: {
    main: FACEBOOK_BLUE,
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#42B72A', // A shade of green often seen on FB
    contrastText: '#FFFFFF',
  },
  background: {
    default: BACKGROUND_LIGHT_GREY, // Main app background
    paper: '#FFFFFF', // Card/component background
  },
  text: {
    primary: TEXT_PRIMARY, // Default text color
    secondary: '#606770', // Muted/comment text
    disabled: '#A8A8A8',
  },
};

export const typography = {
  fontFamily: [
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  body1: {
    fontSize: '0.9375rem', // 15px
    fontWeight: 400,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
  },
};

// Spacing defined on an 8px grid
export const spacing = (factor: number) => `${8 * factor}px`;

export const shape = {
  borderRadius: 8,
  cardRadius: 12,
  buttonRadius: 6,
};

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const theme = {
  palette,
  typography,
  spacing,
  shape,
  breakpoints,
};

export default theme;

// Optional: Define custom types if using this structure with styled-components or similar
// export type AppTheme = typeof theme; 
// declare module '@emotion/react' {
//   export interface Theme extends AppTheme {}
// }
// declare module '@mui/material/styles' {
//   interface Theme extends AppTheme {}
//   interface ThemeOptions extends Partial<AppTheme> {}
// }