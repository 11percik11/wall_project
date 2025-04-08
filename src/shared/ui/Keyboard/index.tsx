import React, { useState } from "react";
import styles from "./index.module.scss";
import crossKeyboardSvg from "../../assets/svg/cross_keyboard_svg.svg"
import backspace from "../../assets/svg/backspace_svg.svg";
import arrowUp from "../../assets/svg/arrow_up_svg.svg";
import arrowUpBlack from "../../assets/svg/arrow_up_black_svg.svg";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  className?: string;
  closeKeyboard?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, className, closeKeyboard, onMouseDown }) => {
  const [isNumbersVisible, setIsNumbersVisible] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);

  const firstRow = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"];
  const secondRow = ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"];
  const thirdRow = ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"];
  const fourthRow = [" "];

  const firstNumber = ["1", "2", "3"];
  const secondNumber = ["4", "5", "6"];
  const thirdNumber = ["7", "8", "9"];
  const fourthNumber = ["0"];

  const handleKeyClick = (key: string | React.ReactNode) => {
    if (typeof key === "string") {
      onKeyPress(key);
    } else {
      onKeyPress('(x)');
    }
  };

  const toggleUpperCase = () => {
    setIsUpperCase((prev) => !prev);
  };

  const renderKeys = (row: string[], rowIndex: string) => {
    return row.map((key, index) => {
      const displayKey = isUpperCase ? key.toUpperCase() : key;
      return (
        <button
          key={`${rowIndex}-${index}`}
          className={styles.key}
          onClick={() => handleKeyClick(displayKey)}
        >
          {displayKey}
        </button>
      );
    });
  };

  return (
    <>
    <div onMouseDown={onMouseDown} className={`${styles.keyboard} ${isNumbersVisible ? styles.keyboardNumber : styles.keyboardText} ${className}`}>
      <div className={`${styles.keyboardContent} ${isNumbersVisible ? styles.hiddenLeft : ""}`}>
        <div className={styles.row}>
        {renderKeys(firstRow, "first")}
        </div>

        <div className={styles.row}>
        {renderKeys(secondRow, "second")}
        </div>

        <div className={styles.row}>
          <button className={`${styles.key} ${styles.backspace} ${isUpperCase ? styles.backspaceTrue : ""}` }
          onClick={toggleUpperCase}>
            {isUpperCase ? <img src={arrowUpBlack} alt="arrowUp" className={styles.backspaceIconBalck} /> : <img src={arrowUp} alt="arrowUp"/>}
          </button>
          {renderKeys(thirdRow, "third")}
          <button
            className={`${styles.key} ${styles.backspace}`}
            onClick={() => handleKeyClick("(x)")}
            >
            <img
              src={backspace}
              alt="backspace"
              className={styles.backspaceIcon}
              />
          </button>
        </div>

        <div className={styles.row}>
          <button
            className={`${styles.key} ${styles.buttonNumber}`}
            onClick={() => setIsNumbersVisible(true)}
            >
            &123
          </button>
          {fourthRow.map((key, index) => (
            <button
            key={`space-${index}`}
            className={`${styles.key} ${styles.space}`}
            onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
          <button
            className={`${styles.key} ${styles.enter}`}
            onClick={() => handleKeyClick("Enter")}
            >
            Найти
          </button>
        </div>
      </div>




      <div className={`${styles.keyboardContent} ${!isNumbersVisible ? styles.hiddenRight : ""}`}>
        <div className={styles.row}>
          {firstNumber.map((key, index) => (
            <button
            key={`num1-${index}`}
            className={styles.keyNumber}
            onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
        </div>

        <div className={styles.row}>
          {secondNumber.map((key, index) => (
            <button
            key={`num2-${index}`}
            className={styles.keyNumber}
            onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
        </div>

        <div className={styles.row}>
          {thirdNumber.map((key, index) => (
            <button
            key={`num3-${index}`}
            className={styles.keyNumber}
            onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
        </div>

        <div className={styles.row}>
          <button
            className={`${styles.keyNumber} ${styles.buttonNumber}`}
            onClick={() => setIsNumbersVisible(false)}
            >
            АБВ
          </button>
          {fourthNumber.map((key, index) => (
            <button
            key={`num4-${index}`}
            className={styles.keyNumber}
            onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
          <button
            className={`${styles.keyNumber} ${styles.backspace} ${styles.backspaceNumber}`}
            onClick={() => handleKeyClick("(x)")}
            >
            <img
              src={backspace}
              alt="backspace"
              className={styles.backspaceIcon}
              />
          </button>
        </div>
      </div>
    </div>
    <div onClick={closeKeyboard} className={styles.crossSvg}>
      <img src={crossKeyboardSvg} alt="" />
    </div>
    </>
  );
};

export default Keyboard;