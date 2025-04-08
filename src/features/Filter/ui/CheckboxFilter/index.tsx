import Input from '../../../../shared/ui/InputCheckbox';
import styles from './index.module.scss';

interface CheckboxFilterProps {
  checkedStates: boolean[];
  setCheckedStates: (states: boolean[]) => void;
}

export default function CheckboxFilter({checkedStates, 
  setCheckedStates }: CheckboxFilterProps) {

  const handleViewAll = () => {
    setCheckedStates([true, true, true, true]);
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = isChecked;
    setCheckedStates(newCheckedStates);
  };

  return (
    <div>
      <div className={styles.title}>ЗВАНИЕ</div>
      <div className={styles.boxInput}>
        <Input
          checked={checkedStates[0]}
          onChange={(e) => handleCheckboxChange(0, e.target.checked)}
        >
          Майор
        </Input>
        <Input
          checked={checkedStates[1]}
          onChange={(e) => handleCheckboxChange(1, e.target.checked)}
        >
          Сержант
        </Input>
        <Input
          checked={checkedStates[2]}
          onChange={(e) => handleCheckboxChange(2, e.target.checked)}
        >
          Старший сержант
        </Input>
        <Input
          checked={checkedStates[3]}
          onChange={(e) => handleCheckboxChange(3, e.target.checked)}
        >
          Старшина
        </Input>
      </div>
      <div onClick={handleViewAll} className={styles.butonText}>
        Посмотреть все
      </div>
    </div>
  );
}