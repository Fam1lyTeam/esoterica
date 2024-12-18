import { useTranslation } from 'react-i18next';
import { useDate } from '@/core/DateContext';
import { MatrixSVG } from '@/components/Matrix/Matrix';
import { MatrixOfDestinyResult } from '@/types/MatrixTypes';

export const Matrix: React.FC = () => {
  const { t } = useTranslation();
  const { date } = useDate();

  if (!date) {
    return <p className="date-error">Ошибка: Дата не установлена</p>;
  }

  // Функция для сокращения числа до значения <= 22
  const reduceToArcanum = (num: number): number => {
    while (num > 22) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return num === 0 ? 22 : num;
  };

  const calculateMatrixOfDestiny = (birthDate: string): MatrixOfDestinyResult => {
    // Разделение даты рождения на компоненты
    const [day, month, year] = birthDate.split('.').map(Number);
  
    // Сокращенные значения для дня, месяца и года
    const dayOfBirth = reduceToArcanum(day);
    const monthOfBirth = reduceToArcanum(month);
    const yearOfBirth = reduceToArcanum(year);
  
    // Число кармы: сумма сокращенных дня, месяца и года
    const karmaNumber = reduceToArcanum(dayOfBirth + monthOfBirth + yearOfBirth);
  
    // Число души: сумма кармы и сокращенных дня, месяца и года
    const soulNumber = reduceToArcanum(dayOfBirth + monthOfBirth + yearOfBirth + karmaNumber);
  
    // Линия отца
    const fatherOne = reduceToArcanum(dayOfBirth + monthOfBirth);      // Сумма сокращенных дня и месяца рождения
    const fatherTwo = reduceToArcanum(yearOfBirth + karmaNumber);     // Сумма года и числа кармы
  
    // Линия матери
    const motherOne = reduceToArcanum(monthOfBirth + yearOfBirth);    // Сумма сокращенных месяца и года рождения
    const motherTwo = reduceToArcanum(dayOfBirth + karmaNumber);      // Сумма дня рождения и числа кармы

    // Число Души для линий отца и матери
    const soulNumberTwo = reduceToArcanum(fatherOne + fatherTwo + motherOne + motherTwo); 

    const karmaMoreOne = reduceToArcanum(karmaNumber + soulNumber); 
    const karmaMoreTwo = reduceToArcanum(karmaNumber + karmaMoreOne); 
    const dayMoreOne = reduceToArcanum(dayOfBirth + soulNumber); 
    const dayMoreTwo = reduceToArcanum(dayOfBirth + dayMoreOne); 
    const monthMoreOne = reduceToArcanum(monthOfBirth + soulNumber); 
    const monthMoreTwo = reduceToArcanum(monthOfBirth + monthMoreOne); 
    const yearMoreOne = reduceToArcanum(yearOfBirth + soulNumber); 
    const yearMoreTwo = reduceToArcanum(yearOfBirth + yearMoreOne); 
    const fatherMoreOne = reduceToArcanum(fatherOne + soulNumberTwo); 
    const fatherMoreTwo = reduceToArcanum(fatherOne + fatherMoreOne); 
    const fatherMoreThree = reduceToArcanum(fatherTwo + soulNumberTwo); 
    const fatherMoreFour = reduceToArcanum(fatherTwo + fatherMoreThree); 
    const motherMoreOne = reduceToArcanum(motherOne + soulNumberTwo); 
    const motherMoreTwo = reduceToArcanum(motherOne + motherMoreOne); 
    const motherMoreThree = reduceToArcanum(motherTwo + soulNumberTwo); 
    const motherMoreFour = reduceToArcanum(motherTwo + motherMoreThree); 

    const talant = reduceToArcanum(dayMoreOne + monthMoreOne);
    const esoterica = reduceToArcanum(soulNumber + monthMoreOne);
    const identity = reduceToArcanum(soulNumber + dayMoreOne);
    const moneyChannel = reduceToArcanum(karmaMoreOne + yearMoreOne);
    const money = reduceToArcanum(yearMoreOne + moneyChannel);
    const love = reduceToArcanum(karmaMoreOne + moneyChannel);
  
    return {
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
      karmaNumber,
      soulNumber,
      fatherOne,
      fatherTwo,
      motherOne,
      motherTwo,
      soulNumberTwo,
      karmaMoreOne,
      karmaMoreTwo,
      dayMoreOne,
      dayMoreTwo,
      monthMoreOne,
      monthMoreTwo,
      yearMoreOne,
      yearMoreTwo,
      fatherMoreOne, 
      fatherMoreTwo,
      fatherMoreThree,
      fatherMoreFour,
      motherMoreOne,
      motherMoreTwo,
      motherMoreThree,
      motherMoreFour,
      talant,
      esoterica,
      identity,
      moneyChannel,
      money,
      love,
    };
  };
  

  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.matrix')}</h2>
      <div className="results-table matrix-result">
        <MatrixSVG data={calculateMatrixOfDestiny(date)} />
      </div>
      <div className="results-comment"></div>
    </div>
  );
};