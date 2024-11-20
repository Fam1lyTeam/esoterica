import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Page } from '@/components/Page.tsx';
import { useTranslation } from 'react-i18next';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import { DateInput } from '@/components/DateInput/DateInput';

import { AvatarIcon } from '@/components/Icons/Avatar';

import './Main.css';


export const Main: React.FC = () => {
  const { t, i18n } = useTranslation();
  const initDataState = useSignal(initData.state);
//  const navigate = useNavigate();

  const [birthDate, setBirthDate] = useState('');

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLanguage);
  };

  const handleCalculate = () => {
    if (birthDate) {
      console.log(`Дата рождения: ${birthDate}`);
    } else {
      console.log(`Введите дату рождения`);
    }
  };

  return (
    <Page back={false}>
      <>
        <div className='header-container'>
          <div className='user-container'>
            <div className='avatar-container'>
              {initDataState?.user?.photoUrl ? (
                <img
                  src={initDataState.user.photoUrl}
                  alt={t('main.avatarAlt')}
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
          />
          <button className='calculator-button' onClick={handleCalculate}>
            {t('main.button')}
          </button>
        </div>
      </>
    </Page>
  );
};
