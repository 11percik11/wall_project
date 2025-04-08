import { useNavigate } from "react-router-dom";
import Button from "../../shared/ui/Button";
import { useState } from "react";
import Keyboard from "../../shared/ui/Keyboard";
import Input from "../../shared/ui/Input";
import styles from "./index.module.scss";


export default function Search() {
  const navigate = useNavigate();
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
    const handleKeyPress = (key: string) => {
      
      if (key === "Enter") {
        if (inputValue) {
          navigate(`/?name=${encodeURIComponent(inputValue)}`);
        }else{
          setShowKeyboard(false)
        }
    } else if (key === "(x)") {
      if (cursorPosition > 0) {
        setInputValue(
          inputValue.substring(0, cursorPosition - 1) +
            inputValue.substring(cursorPosition)
        );
        setCursorPosition(cursorPosition - 1);
      }
    } else {
      setInputValue(
        inputValue.substring(0, cursorPosition) +
          key +
          inputValue.substring(cursorPosition)
      );
      setCursorPosition(cursorPosition + 1);
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.search__title}>ПОИСК ПО БАЗЕ ГЕРОЕВ</div>
      <Input
        className={styles.search__input}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onCursorChange={setCursorPosition}
        onClick={() => setShowKeyboard(true)}
        placeholder="Кого вы ищите?"
        />
      <Button className={styles.buttonWrapper} variant="silver" onClick={() => navigate("/")}>
        НА ГЛАВНУЮ
      </Button>
      {showKeyboard && (
        <div className={styles.keyboardWrapper}>
          <Keyboard onKeyPress={handleKeyPress} closeKeyboard={() => setShowKeyboard(false)}></Keyboard>
        </div>
      )}
    </div>
  );
}
