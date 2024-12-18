import { useTranslation } from 'react-i18next';
import { useDate } from '@/core/DateContext';

// Типы данных
interface CellData {
  title: string;
  value: string | number;
  className: string;
}

export const Pythagoras: React.FC = () => {
  const { t } = useTranslation();
  const { date } = useDate();

  if (!date) {
    return <p className="date-error">Ошибка: Дата не установлена</p>;
  }

  const calculateAdditionalNumbers = (birthDate: string): number[] => {
    const digits = birthDate.replace(/\D/g, '').split('').map(Number);
    const firstNumber = digits.reduce((sum, digit) => sum + digit, 0);
  
    const secondNumber = firstNumber
      .toString()
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  
    const firstDigit = digits[0] || digits[1];
    const thirdNumber = firstNumber - firstDigit * 2;
  
    const fourthNumber = thirdNumber
      .toString()
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  
    return [firstNumber, secondNumber, thirdNumber, fourthNumber];
  };
  

  const calculateDestinyNumber = (birthDate: string): number => {
    let num = birthDate.replace(/\D/g, '').split('').reduce((sum, digit) => sum + Number(digit), 0);
    while (num > 9 && num !== 11) {
      num = num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return num;
  };

  const countDigits = (numbers: number[]): number[] => {
    const counts = Array(10).fill(0);
    numbers.forEach((num) => {
      num.toString().split('').forEach((digit) => {
        counts[Number(digit)]++;
      });
    });
    return counts;
  };

  const countDigitsFromCells = (digitCounts: number[], numbers: number[]): number => {
    return numbers.reduce((total, num) => total + digitCounts[num], 0);
  };

  const calculateTableData = (birthDate: string): CellData[] => {
    const additionalNumbers = calculateAdditionalNumbers(birthDate);
    const destinyNumber = calculateDestinyNumber(birthDate);
    const allNumbers = [...birthDate.replace(/\D/g, '').split('').map(Number), ...additionalNumbers];
    const digitCounts = countDigits(allNumbers);

    // Ячейки в фиксированном порядке
    const orderedCells: CellData[] = [
      // Первая строка
      {
        title: t('pythagoras.additional'),
        value: additionalNumbers.join(', '),
        className: 'cell border span-2',
      },
      { title: t('pythagoras.destiny'), value: destinyNumber.toString(), className: 'cell border' },
      { title: t('pythagoras.temperament'), value: countDigitsFromCells(digitCounts, [3, 5, 7]), className: 'cell' },

      // Вторая строка
      { title: t('pythagoras.character'), value: `${1}`.repeat(digitCounts[1]), className: 'cell border color' },
      { title: t('pythagoras.health'), value: `${4}`.repeat(digitCounts[4]), className: 'cell border color' },
      { title: t('pythagoras.luck'), value: `${7}`.repeat(digitCounts[7]), className: 'cell border color' },
      { title: t('pythagoras.goal'), value: countDigitsFromCells(digitCounts, [1, 4, 7]), className: 'cell' },

      // Третья строка
      { title: t('pythagoras.energy'), value: `${2}`.repeat(digitCounts[2]), className: 'cell border color' },
      { title: t('pythagoras.logic'), value: `${5}`.repeat(digitCounts[5]), className: 'cell border color' },
      { title: t('pythagoras.duty'), value: `${8}`.repeat(digitCounts[8]), className: 'cell border color' },
      { title: t('pythagoras.family'), value: countDigitsFromCells(digitCounts, [2, 5, 8]), className: 'cell' },

      // Четвертая строка
      { title: t('pythagoras.interest'), value: `${3}`.repeat(digitCounts[3]), className: 'cell border color' },
      { title: t('pythagoras.labor'), value: `${6}`.repeat(digitCounts[6]), className: 'cell border color' },
      { title: t('pythagoras.memory'), value: `${9}`.repeat(digitCounts[9]), className: 'cell border color' },
      { title: t('pythagoras.habits'), value: countDigitsFromCells(digitCounts, [3, 6, 9]), className: 'cell' },

      // Пятая строка
      { title: t('pythagoras.self'), value: countDigitsFromCells(digitCounts, [1, 2, 3]), className: 'cell border' },
      { title: t('pythagoras.money'), value: countDigitsFromCells(digitCounts, [4, 5, 6]), className: 'cell border' },
      { title: t('pythagoras.talent'), value: countDigitsFromCells(digitCounts, [7, 8, 9]), className: 'cell border' },
      { title: t('pythagoras.spirituality'), value: countDigitsFromCells(digitCounts, [1, 5, 9]), className: 'cell' },
    ];

    return orderedCells;
  };


  const tableData = calculateTableData(date);

  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.pythagoras')}</h2>
      <div className="results-table pythagoras-table">
        {tableData.map((cell, index) => (
          <div key={index} className={cell.className}>
            <span className="title">{cell.title}</span>
            <span className="number">{cell.value || '-'}</span>
          </div>
        ))}
      </div>
      <div className="results-comment"></div>
    </div>
  );
};