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
  const absoluteDifference = (a: number, b: number): number => Math.abs(a - b);

  const calculateKarmicPortrait = (birthDate: string): CellData[] => {
    const [day, month, year] = birthDate.split('.').map(Number);

    const dayCell = reduceToArcanum(day);
    const monthCell = reduceToArcanum(month);
    const yearCell = reduceToArcanum(sumDigits(year.toString()));
    const cell4 = reduceToArcanum(sumDigits(birthDate.replace(/\D/g, '')));
    const cell5 = reduceToArcanum(dayCell + monthCell + yearCell);

    const cell6 = reduceToArcanum(dayCell + monthCell);
    const cell7 = reduceToArcanum(dayCell + yearCell);
    const cell8 = reduceToArcanum(cell6 + cell7);
    const cell9 = reduceToArcanum(monthCell + yearCell);
    const cell10 = reduceToArcanum(cell6 + cell7 + cell8 + cell9);

    const cell11 = absoluteDifference(dayCell, monthCell);
    const cell12 = absoluteDifference(dayCell, yearCell);
    const cell13 = absoluteDifference(cell11, cell12);
    const cell14 = absoluteDifference(monthCell, yearCell);
    const cell15 = reduceToArcanum(cell11 + cell12 + cell13 + cell14);

    const allDigitsSum = sumDigits(birthDate.replace(/\D/g, ''));
    const singleDigitSum = allDigitsSum % 9 || 9;
    const period16 = `0 - ${36 - singleDigitSum}`;
    const period17 = `${36 - singleDigitSum + 1} - ${36 - singleDigitSum + 9}`;
    const period18 = `${36 - singleDigitSum + 10} - ${36 - singleDigitSum + 18}`;
    const period19 = `${36 - singleDigitSum + 19} - ${36 - singleDigitSum + 27}`;
    const period20 = `${36 - singleDigitSum + 28} - ∞`;

    return [
      { value: dayCell, className: 'cell border' },
      { value: monthCell, className: 'cell border' },
      { value: yearCell, className: 'cell border' },
      { value: cell4, className: 'cell border' },
      { value: cell5, className: 'cell' },
      { value: cell6, className: 'cell border green' },
      { value: cell7, className: 'cell border green' },
      { value: cell8, className: 'cell border green' },
      { value: cell9, className: 'cell border green' },
      { value: cell10, className: 'cell green' },
      { value: cell11, className: 'cell border purple' },
      { value: cell12, className: 'cell border purple' },
      { value: cell13, className: 'cell border purple' },
      { value: cell14, className: 'cell border purple' },
      { value: cell15, className: 'cell purple' },
      { value: period16, className: 'cell border period' },
      { value: period17, className: 'cell border period' },
      { value: period18, className: 'cell border period' },
      { value: period19, className: 'cell border period' },
      { value: period20, className: 'cell period' },
    ];
  };

  const tableData = calculateKarmicPortrait(date);

  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.karmic')}</h2>
      <div className="karmic-table">
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