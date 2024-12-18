import { useTranslation } from 'react-i18next';
import { useDate } from '@/core/DateContext';

// Типы данных
interface CellData {
  value: string | number;
  className: string;
}

export const Karmic: React.FC = () => {
  const { t } = useTranslation();
  const { date } = useDate();

  if (!date) {
    return <p className="date-error">Ошибка: Дата не установлена</p>;
  }

  // Функция для вычисления числа с правилом 22
  const reduceToArcanum = (num: number): number => {
    while (num > 22) {
      num -= 22;
    }
    return num;
  };

  // Функция для сложения всех чисел в строке
  const sumDigits = (str: string): number => {
    const sum = str.replace(/\D/g, '').split('').reduce((total, digit) => total + Number(digit), 0);
    return sum;
  };

  // Функция для разницы чисел с абсолютным значением
  const absoluteDifference = (a: number, b: number): number => {
    const result = Math.abs(a - b);
    return result === 0 ? 22 : result;
  };

  const calculateKarmicPortrait = (birthDate: string): CellData[] => {
    const [day, month, year] = birthDate.split('.').map(Number);

    const dayCell = reduceToArcanum(day);
    const monthCell = reduceToArcanum(month);
    const yearCell = reduceToArcanum(sumDigits(year.toString()));
    const cell4 = reduceToArcanum(sumDigits(birthDate.replace(/\D/g, '')));
    const cell5 = reduceToArcanum(dayCell + monthCell + yearCell);

    const cell11 = reduceToArcanum(dayCell + monthCell);
    const cell12 = reduceToArcanum(dayCell + yearCell);
    const cell13 = reduceToArcanum(cell11 + cell12);
    const cell14 = reduceToArcanum(monthCell + yearCell);
    const cell15 = reduceToArcanum(cell11 + cell12 + cell13 + cell14);

    const cell16 = absoluteDifference(dayCell, monthCell);
    const cell17 = absoluteDifference(dayCell, yearCell);
    const cell18 = absoluteDifference(cell16, cell17);
    const cell19 = absoluteDifference(monthCell, yearCell);
    const cell20 = reduceToArcanum(cell16 + cell17 + cell18 + cell19);

    const cell6 = reduceToArcanum(cell11 + cell16);
    const cell7 = reduceToArcanum(cell12 + cell17);
    const cell8 = reduceToArcanum(cell13 + cell18);
    const cell9 = reduceToArcanum(cell14 + cell19);
    const cell10 = reduceToArcanum(cell15 + cell20);

    const cell21 = absoluteDifference(cell11, cell16);
    const cell22 = absoluteDifference(cell12, cell17);
    const cell23 = absoluteDifference(cell13, cell18);
    const cell24 = absoluteDifference(cell14, cell19);
    const cell25 = absoluteDifference(cell15, cell20);

    const allDigitsSum = sumDigits(birthDate.replace(/\D/g, ''));
    const singleDigitSum = allDigitsSum % 9 || 9;
    const period1 = `0 - ${36 - singleDigitSum}`;
    const period2 = `${36 - singleDigitSum + 1} - ${36 - singleDigitSum + 9}`;
    const period3 = `${36 - singleDigitSum + 10} - ${36 - singleDigitSum + 18}`;
    const period4 = `${36 - singleDigitSum + 19} - ${36 - singleDigitSum + 27}`;
    const period5 = `${36 - singleDigitSum + 28} - ∞`;

    return [
      { value: dayCell, className: 'cell border' },
      { value: monthCell, className: 'cell border' },
      { value: yearCell, className: 'cell border' },
      { value: cell4, className: 'cell border' },
      { value: cell5, className: 'cell' },
      { value: cell6, className: 'cell border blue' },
      { value: cell7, className: 'cell border blue' },
      { value: cell8, className: 'cell border blue' },
      { value: cell9, className: 'cell border blue' },
      { value: cell10, className: 'cell blue' },
      { value: cell11, className: 'cell border green' },
      { value: cell12, className: 'cell border green' },
      { value: cell13, className: 'cell border green' },
      { value: cell14, className: 'cell border green' },
      { value: cell15, className: 'cell green' },
      { value: cell16, className: 'cell border purple' },
      { value: cell17, className: 'cell border purple' },
      { value: cell18, className: 'cell border purple' },
      { value: cell19, className: 'cell border purple' },
      { value: cell20, className: 'cell purple' },
      { value: cell21, className: 'cell border blue' },
      { value: cell22, className: 'cell border blue' },
      { value: cell23, className: 'cell border blue' },
      { value: cell24, className: 'cell border blue' },
      { value: cell25, className: 'cell blue' },
      { value: period1, className: 'cell border period' },
      { value: period2, className: 'cell border period' },
      { value: period3, className: 'cell border period' },
      { value: period4, className: 'cell border period' },
      { value: period5, className: 'cell period' },
    ];
  };

  const tableData = calculateKarmicPortrait(date);

  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.karmic')}</h2>
      <div className="results-table karmic-table">
        {tableData.map((cell, index) => (
          <div key={index} className={cell.className}>
            <span className="number">{cell.value || '-'}</span>
          </div>
        ))}
      </div>
      <div className="results-comment"></div>
    </div>
  );
};