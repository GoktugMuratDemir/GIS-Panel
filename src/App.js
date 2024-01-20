// i18n
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// locales
import { LocalizationProvider } from 'src/locales';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
import { SnackbarProvider } from './components/snackbar';

// editor
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-quill/dist/quill.snow.css';
import { AuthLocationProvider } from './auth/context/auth-location';

// ----------------------------------------------------------------------

export default function App() {
  // const charAt = `

  // ░░░    ░░░
  // ▒▒▒▒  ▒▒▒▒
  // ▒▒ ▒▒▒▒ ▒▒
  // ▓▓  ▓▓  ▓▓
  // ██      ██

  // `;

  // console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();

  return (
    <AuthProvider>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'orange', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SettingsDrawer />
              <ProgressBar />
              <SnackbarProvider>
                <AuthLocationProvider>
                  <AuthConsumer>
                    <Router />
                  </AuthConsumer>
                </AuthLocationProvider>
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
