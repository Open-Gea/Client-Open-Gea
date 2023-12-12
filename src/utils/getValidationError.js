import i18next from 'i18next';

const { t } = i18next;
const ns = 'errors';

export const getValidationError = errorCode => {
  const codeMatcher = {
    GENERIC: 'Something was wrong',
    UNAUTHORIZED : 'Not authorized, contact support',
    ERR_NETWORK: t('network', { ns }),
    ERR_TIMEOUT: t('timeout', { ns }),
    ERR_CANCEL: t('cancel', { ns }),
    ERR_UNKNOWN: t('unknown', { ns }),
    ERR_400: 'Error 400',
    ERR_401: 'Error 401',
    ERR_403: 'Error 403',
    ERR_BAD_RESPONSE: t('badResponse', { ns }),
    ERR_BAD_REQUEST: t('badrequest', { ns }),
    errHHReults: t('errHHResults', { ns }),
    'auth/user-not-found': t('userNotFound', { ns }),
    'auth/internal-error': t('internalError', { ns }),
    'auth/wrong-password': t('wrongCredentials', { ns }),
    'auth/too-many-requests': t('tooManyRequests', { ns }),
  };

  return codeMatcher[errorCode];
};
