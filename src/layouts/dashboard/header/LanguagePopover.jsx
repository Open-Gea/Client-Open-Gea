import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import { getDateFnsLocale } from '../../../utils/getDateFnsLocale';

// ----------------------------------------------------------------------

// IMPORTANT: 'value' property must match with i18n's namespaces
// (located in public/assets/i18n/[namespace]/[value].json)
const LANGS = [
  // English should always be the first element on this list!
  // Code uses the first element as the fallback language.
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'es',
    label: 'Español',
    icon: '/assets/icons/ic_flag_es.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover({ iconSize = 44 }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(null);

  // This is used only for displaying the icon and label on this component.
  // The actual language selection is handled by i18next.
  const [displayedLanguage, setDisplayedLanguage] = useState({ value: '', label: '', icon: '' });

  useEffect(() => {
    // Check if current language is the same for avoiding an unnecessary update.
    if (displayedLanguage.value === i18n.language) return;
    // Sets the icon for the first time.
    updateDisplayedLanguage();
    // updates date-fns config
    setDefaultOptions({ locale: getDateFnsLocale() });
  }, [i18n.language]);

  const updateDisplayedLanguage = () => {
    // gets rids of any extra language especification for looking up on LANGS list.
    const twoCharLanguage = i18n.language.substring(0, 2);
    const foundLanguage = LANGS.find(lng => lng.value === twoCharLanguage);

    // If language is not available, it defaults to English.
    setDisplayedLanguage(foundLanguage || LANGS[0]);
    // updates date-fns config
    setDefaultOptions({ locale: getDateFnsLocale() });
  };

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLanguageChange = value => {
    setOpen(null);
    const foundLanguage = LANGS.find(lng => lng.value === value);

    if (!foundLanguage) {
      console.error('Selected language not found.');
    } else {
      i18n.changeLanguage(foundLanguage.value);
      updateDisplayedLanguage();
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          marginRight: 1,
          width: iconSize,
          height: iconSize,
          ...(open && {
            bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={displayedLanguage.icon} alt={displayedLanguage.label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        // This onClose allows users to close the menu by clicking anywhere else,
        // without selecting a language
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map(option => (
            <MenuItem
              key={option.value}
              // disables selected language
              disabled={displayedLanguage.value === option.value}
              selected={option.value === LANGS[0].value}
              onClick={() => handleLanguageChange(option.value)}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
LanguagePopover.propTypes = {
  iconSize: PropTypes.number,
};
