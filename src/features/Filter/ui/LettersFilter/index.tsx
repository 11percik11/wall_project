import styles from './index.module.scss';

interface LettersFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

export default function LettersFilter({selectedLetter, onLetterSelect}:LettersFilterProps) {

  const letterGroups = [
    ['А', 'Б', 'B', 'Г', 'Д', 'Е', 'Ж'],
    ['З', 'И', 'Й', 'К', 'Л', 'М', 'О'], 
    ['П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х'], 
    ['Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'], 
  ];

  const handleLetterClick = (letter: string) => {
    const newLetter = selectedLetter === letter ? null : letter;
    onLetterSelect(newLetter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>ПО БУКВАМ</div>
      
      {letterGroups.map((group, index) => (
        <div key={index} className={styles.row}>
          {group.map((letter) => (
            <button
              key={letter}
              className={`${styles.letter} ${
                selectedLetter === letter ? styles.active : ''
              }`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}