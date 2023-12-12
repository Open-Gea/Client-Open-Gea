import { useState } from 'react';
import PropTypes from 'prop-types';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import { Checkbox, FormControlLabel, FormGroup, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TermsAndConditionsCheckbox({ termsConditionsAccepted, setTermsConditionsAccepted }) {
  const [isTermsConditionsModalOpen, setIsTermsConditionsModalOpen] = useState(false);

  const handleTermsConditionsChange = isAccepted => {
    setTermsConditionsAccepted(isAccepted);
  };

  const {t} = useTranslation('register-login')

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={termsConditionsAccepted} onChange={() => setIsTermsConditionsModalOpen(true)} />}
          label={
            <Typography>
              {t('terms1')}
              <Link onChange={() => setIsTermsConditionsModalOpen(true)}> {t('terms2')} </Link>
              {t('terms3')}
            </Typography>
          }
        />
      </FormGroup>
      <TermsAndConditionsModal
        isOpen={isTermsConditionsModalOpen}
        setIsOpen={setIsTermsConditionsModalOpen}
        onModalClose={handleTermsConditionsChange}
      />
    </>
  );
}

TermsAndConditionsCheckbox.propTypes = {
  termsConditionsAccepted: PropTypes.bool.isRequired,
  setTermsConditionsAccepted: PropTypes.func.isRequired,
};
