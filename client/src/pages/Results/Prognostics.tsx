import { useTranslation } from 'react-i18next';
import { useDate } from '@/core/DateContext';

// Типы данных
interface TableRow {
  year: number;
  personalNumber: number;
  forecast: number;
  karmicForecast: number;
}

export const Prognostics: React.FC = () => {
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

  const calculatePersonalNumber = (str: string): number => {
    let num = str.replace(/\D/g, '').split('').reduce((sum, digit) => sum + Number(digit), 0);
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return num;
  };

  // Функция для расчета кармического портрета
  const calculateKarmicPortrait = (birthDate: string): number[] => {
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

    const cell16 = Math.abs(dayCell - monthCell) || 22;
    const cell17 = Math.abs(dayCell - yearCell) || 22;
    const cell18 = Math.abs(cell16 - cell17) || 22;
    const cell19 = Math.abs(monthCell - yearCell) || 22;
    const cell20 = reduceToArcanum(cell16 + cell17 + cell18 + cell19);

    return [dayCell, monthCell, yearCell, cell4, cell5, cell11, cell12, cell13, cell14, cell15, cell16, cell17, cell18, cell19, cell20];
  };

  const karmicValues = calculateKarmicPortrait(date);
  const greenSet = new Set(karmicValues.slice(0, 10));
  const redSet = new Set(karmicValues.slice(10, 15));

  // Создание данных для таблицы
  const [day, month] = date.split('.').map(Number);
  const currentYear = new Date().getFullYear();
  const tableData: TableRow[] = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear - 5 + i; // 5 лет назад, текущий год и 5 лет вперед
    const sum = sumDigits(day.toString()) + sumDigits(month.toString()) + sumDigits(year.toString());
    const personalNumber = calculatePersonalNumber(sum.toString());
    const forecast = reduceToArcanum(sum);
    const karmicForecast = reduceToArcanum(day + month + sumDigits(year.toString()));
    return { year, personalNumber, forecast, karmicForecast };
  });

  const getClassName = (value: number): string => {
    if (redSet.has(value)) return 'red';
    if (greenSet.has(value)) return 'green';
    return '';
  };


  // Vibe

  const createRow = (year: number, day: number, month: number) => {
    const yearSum = sumDigits(year.toString());
    const forecast = reduceToArcanum(sumDigits(day.toString()) + sumDigits(month.toString()) + yearSum);
    const karmicForecast = reduceToArcanum(day + month + yearSum);
    return { year, yearSum, forecast, karmicForecast };
  };

  const vibeData = [
    createRow(currentYear - 1, day, month),
    createRow(currentYear, day, month),
    createRow(currentYear + 1, day, month),
  ];


  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.prognostics')}</h2>
      <div className="results-table prognostics-table">
        <h3>{t('prognostics.vibeYear')}</h3>
        <div className="prognostics-content">
          {vibeData.map((row, index) => (
            <div key={index} className="vibe-row">
              <div className="cell year">{row.year}</div>
              <div className="cell result">
                <span className="sumYear">{row.yearSum} —</span>
                <span className={"firstNum " + getClassName(row.forecast)}>{row.forecast},</span>
                <span className={getClassName(row.karmicForecast)}>{row.karmicForecast}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
      <div className="results-table prognostics-table">
        <h3>{t('prognostics.classicalKarmic')}</h3>
        <div className="prognostics-content">
          <div className="prognostics-header">
            <div className="cell border">{t('prognostics.tableHeaders.year')}</div>
            <div className="cell border">{t('prognostics.tableHeaders.personalNumber')}</div>
            <div className="cell group">{t('prognostics.tableHeaders.karmicForecast')}</div>
          </div>
          {tableData.map((row, index) => (
            <div key={index} className="prognostics-row">
              <div className="cell border">{row.year}</div>
              <div className="cell border">{row.personalNumber}</div>
              <div className={'cell border ' + getClassName(row.forecast)}>{row.forecast}</div>
              <div className={'cell ' + getClassName(row.karmicForecast)}>{row.karmicForecast}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="results-comment"></div>
    </div>
  );
};