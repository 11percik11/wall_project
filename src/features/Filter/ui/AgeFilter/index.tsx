import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./index.module.scss";
import Input from "../../../../shared/ui/Input";

interface AgeFilterProps {
  onShowKeyboard: (show: boolean) => void;
  setCursorPosition: (number: number) => void;
  inputValues: [string, string];
  setInputValues: (values: [string, string]) => void;
  setActiveInputIndex: (index: number) => void;
  inputRefs: [React.RefObject<HTMLInputElement>, React.RefObject<HTMLInputElement>];
}

const AgeFilter: React.FC<AgeFilterProps> = ({ 
  onShowKeyboard, 
  setCursorPosition, 
  inputValues, 
  setInputValues, 
  setActiveInputIndex,
  inputRefs, 
}) => {
  const [values, setValues] = useState<[number, number]>([Number(inputValues[0]), new Date().getFullYear()]);
  useEffect(() => {
    setValues([Number(inputValues[0]), Number(inputValues[1])]);
  }, [inputValues]);

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setValues(newValues as [number, number]);
      setInputValues([String(newValues[0]), String(newValues[1])]);
    }
  };

  const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      const newInputValues = [...inputValues] as [string, string];
      newInputValues[index] = value;
      setInputValues(newInputValues);
    }
  };

  const handleInputBlur = (index: number) => () => {
    let numValue = parseInt(inputValues[index], 10);
    if (isNaN(numValue)) {
      numValue = values[index];
    } 
    else {
      const [minBoundary, maxBoundary] = index === 0 
        ? [1900, values[1]] 
        : [values[0], new Date().getFullYear()]; 
      
      numValue = Math.min(Math.max(numValue, minBoundary), maxBoundary);
    }
  
    const newValues: [number, number] = [values[0], values[1]];
    newValues[index] = numValue;
  
    if (index === 0 && newValues[1] < numValue) {
      newValues[1] = numValue;
    } else if (index === 1 && newValues[0] > numValue) {
      newValues[0] = numValue;
    }
    setValues(newValues);
    setInputValues([String(newValues[0]), String(newValues[1])]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__title}>ДАТА РОЖДЕНИЯ</div>
      <Slider
        range
        min={1900}
        max={new Date().getFullYear()}
        value={values}
        onChange={handleSliderChange}
        handleStyle={[
          {
            backgroundColor: "#CF3337",
            borderColor: "#CF3337",
            opacity: 1,
            width: "20px",
            height: "20px",
          },
          {
            backgroundColor: "#CF3337",
            borderColor: "#CF3337",
            opacity: 1,
            width: "20px",
            height: "20px",
          },
        ]}
        trackStyle={{
          backgroundColor: "#EF7A7D",
          height: "8px",
        }}
        railStyle={{
          backgroundColor: "#8B8785",
          height: "8px",
        }}
      />
      <div className={styles.inputsContainer}>
        <Input
          ref={inputRefs[0]}
          className={styles.input}
          onChange={handleInputChange(0)}
          value={inputValues[0]}
          onCursorChange={setCursorPosition}
          onBlur={handleInputBlur(0)}
          onClick={() => {
            onShowKeyboard(true);
            setActiveInputIndex(0);
          }}
        />
        <Input
          className={styles.input}
          onChange={handleInputChange(1)}
          value={inputValues[1]}
          onBlur={handleInputBlur(1)}
          onCursorChange={setCursorPosition}
          onClick={() => {
            onShowKeyboard(true);
            setActiveInputIndex(1);
          }}
        />
      </div>
    </div>
  );
};

export default AgeFilter;