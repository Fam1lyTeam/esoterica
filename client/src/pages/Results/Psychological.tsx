import { useTranslation } from 'react-i18next';
import { useDate } from '@/core/DateContext';

interface TableCell {
  value: number | string;
  className?: string;
}

// Общий компонент для рендеринга таблицы
const Table: React.FC<{ title: string; data: TableCell[][], className?: string }> = ({ title, data, className }) => (
  <div className="results-table psychological-table">
    <h3>{title}</h3>
    <div className={`psychological-content ${className || ''}`}>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="psychological-row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`psychological-cell ${cell.className || ''}`}>
              <span className="number">{cell.value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const Psychological: React.FC = () => {
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


  const [day, month, year] = date.split('.').map(Number);

  const dayCell = reduceToArcanum(day);
  const monthCell = reduceToArcanum(month);
  const yearCell = reduceToArcanum(sumDigits(year.toString()));
  const painCell = reduceToArcanum(dayCell + monthCell);
  const strengthCell = reduceToArcanum(monthCell + yearCell);

  const firstTable: TableCell[][] = [
    [{ value: dayCell }, { value: monthCell }, { value: yearCell }],
    [{ value: painCell }, { value: strengthCell }],
    [{ value: reduceToArcanum(painCell + strengthCell) }]
  ];

  const secondTable: TableCell[][] = [
    [{ value: reduceToArcanum(painCell + monthCell), className: 'margin-left' }],
    [
      { value: dayCell },
      { value: painCell },
      { value: monthCell }
    ],
    [{ value: reduceToArcanum(painCell + dayCell) }]
  ];

  const thirdTable: TableCell[][] = [
    [
      { value: absoluteDifference(dayCell, monthCell) },
      { value: strengthCell, className: 'margin-left' }
    ],
    [
      { value: dayCell },
      { value: monthCell },
      { value: yearCell }
    ],
    [
      { value: painCell },
      { value: absoluteDifference(monthCell, yearCell), className: 'margin-left' }
    ]
  ];

  const fourthTable: TableCell[][] = [
    [
      { value: painCell },
      { value: strengthCell, className: 'margin-left' }
    ],
    [
      { value: '', className: 'empty' },
      { value: (reduceToArcanum(painCell + reduceToArcanum(monthCell + strengthCell)))},
      { value: '', className: 'empty' },
    ],
    [
      { value: reduceToArcanum(painCell + monthCell) },
      { value: reduceToArcanum(monthCell + strengthCell), className: 'margin-left' }
    ]
  ];

  const fifthTable: TableCell[][] = [
    [
      { value: reduceToArcanum(painCell + monthCell), className: 'margin-left' },
      { value: '', className: 'empty' },
      { value: reduceToArcanum(strengthCell + yearCell) }
    ],
    [
      { value: dayCell },
      { value: painCell },
      { value: monthCell },
      { value: strengthCell },
      { value: yearCell }
    ],
    [
      { value: reduceToArcanum(painCell + dayCell) },
      { value: '', className: 'empty' },
      { value: reduceToArcanum(monthCell + strengthCell) }
    ]
  ];

  const sixthTable: TableCell[][] = [
    [
      { value: painCell },
      { value: strengthCell, className: 'margin-left' }
    ],
    [
      { value: '', className: 'empty' },
      { value: monthCell },
      { value: '', className: 'empty' },
    ],
    [
      { value: reduceToArcanum(painCell + monthCell) },
      { value: reduceToArcanum(monthCell + strengthCell), className: 'margin-left' }
    ]
  ];

  const seventhTable: TableCell[][] = [
    [
      { value: '', className: 'empty' },
      { value: reduceToArcanum(painCell + dayCell) }
    ],
    [
      { value: painCell },
      { value: '', className: 'empty' },
      { value: reduceToArcanum(painCell + strengthCell), className: 'margin-left' }
    ],
    [
      { value: '', className: 'empty' },
      { value: reduceToArcanum(painCell + (reduceToArcanum(painCell + dayCell)) + (reduceToArcanum(painCell + strengthCell))) }
    ]
  ];


  return (
    <div className="results-content">
      <h2 className="results-title">{t('results.titles.psychological')}</h2>
      <Table title={t('psychological.strengthPain')} data={firstTable} className="center" />
      <Table title={t('psychological.successFailure')} data={secondTable} />
      <Table title={t('psychological.mistakesRealization')} data={thirdTable} />
      <Table title={t('psychological.controlFreedom')} data={fourthTable} />
      <Table title={t('psychological.pathRealization')} data={fifthTable} />
      <Table title={t('psychological.expressionBlocks')} data={sixthTable} />
      <Table title={t('psychological.mainFear')} data={seventhTable} />
      <div className="results-comment"></div>
    </div>
  );
};