import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadLanguage } from '@/localization/i18n';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import { useDate } from '@/core/DateContext';
import { Page } from '@/components/Page.tsx';
import { DateInput } from '@/components/DateInput/DateInput';

import { AvatarIcon } from '@/components/Icons/Avatar';

import './Main.css';

export const Main: React.FC = () => {
  const { t, i18n } = useTranslation();
  const initDataState = useSignal(initData.state);
  const { setDate } = useDate();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const toggleLanguage = async () => {
    const lang = i18n.language === 'ru' ? 'en' : 'ru';
    await loadLanguage(lang);
  };

  const [birthDate, setBirthDate] = useState('');

  const isValidDate = (date: string): boolean => {
    const match = date.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (!match) return false;

    const [_, day, month, year] = match.map(Number);
    const dateObj = new Date(year, month - 1, day);

    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };

  const handleCalculate = () => {

    try {
      let formattedDate = '';

      if (/^\d{8}$/.test(birthDate)) {
        formattedDate = birthDate.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1.$2.$3');
      } else {
        setErrorMessage(t('errors.invalidDate'));
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }

      if (!isValidDate(birthDate)) {
        setErrorMessage(t('errors.invalidDate'));
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }

      setDate(formattedDate);
      navigate('/results');
    } catch (error) {
      setErrorMessage(t('errors.invalidDate'));
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <Page back={false}>
      <>
        
        <div className={`error-message ${errorMessage && 'visibile'}`}>
          <div className='error-message-text'>{errorMessage}</div>
        </div>
        <div className='header-container'>
          <div className='user-container'>
            <div className='avatar-container'>
              {initDataState?.user?.photoUrl ? (
                <img
                  src={initDataState.user.photoUrl}
                  onError={(e) => (e.currentTarget.src = '/avatar.svg')}
                  className="avatar-image"
                />
              ) : (
                <AvatarIcon />
              )}
            </div>
            <div className='nickname-container'>
              {initDataState?.user?.firstName || t('main.unknownUser')}
            </div>
          </div>
          <div className='lang-container'>
            <button onClick={toggleLanguage}>
              {i18n.language === 'en' ? 'RU' : 'EN'}
            </button>
          </div>
        </div>
        <div className='calculator-container'>
          <h1 className='title-gradient'>{t('main.title')}</h1>
          <p>{t('main.inputLabel')}</p>
          <DateInput
            value={birthDate}
            onChange={(value) => setBirthDate(value)}
            className='calculator-input'
            onEnter={handleCalculate}
          />
          <button className='calculator-button' onClick={handleCalculate}>
            {t('main.button')}
          </button>
        </div>
      </>
    </Page>
  );
};
