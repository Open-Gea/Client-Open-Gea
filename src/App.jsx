// import './App.css';
// routes

import Router from './routes/router';

// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/scroll-to-top';
import NotistackProvider from './components/utils/NotistackProvider';

import { ProgressBarStyle } from './components/utils/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <>
      <ThemeProvider>
        <NotistackProvider>
          <MotionLazyContainer>
            <ProgressBarStyle />
            <ScrollToTop />
            <Router />
          </MotionLazyContainer>
        </NotistackProvider>
      </ThemeProvider>
    </>
  );
}
