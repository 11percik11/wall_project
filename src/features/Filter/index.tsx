import Button from "../../shared/ui/Button";
import CheckboxFilter from "./ui/CheckboxFilter";
import LettersFilter from "./ui/LettersFilter";
import styles from "./index.module.scss";
import crossSvg from "../../shared/assets/svg/cross_svg.svg";
import Keyboard from "../../shared/ui/Keyboard";
import { useState, useEffect, useRef } from "react";
import AgeFilter from "./ui/AgeFilter";
import { FilterUser } from "../../entities/User/model/types";
import { useLazyGetFilteredUsersQuery } from "../../entities/User/api/userApi";
import { useDispatch } from "react-redux";
import { clearUsers, setUsers } from "../../entities/User/api/userSlice";

interface FilterProps {
  onClose: () => void;
}

interface SavedFilterState {
  inputValues: [string, string];
  checkedStates: boolean[];
  selectedLetter: string | null;
}

export default function Filter({ onClose }: FilterProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputValues, setInputValues] = useState<[string, string]>([
    "1900",
    String(new Date().getFullYear()),
  ]);

  const inputRefs: [React.RefObject<HTMLInputElement>, React.RefObject<HTMLInputElement>] = [
    useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>,
    useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>
  ];
  const [checkedStates, setCheckedStates] = useState([false, false, false, false]);
  const ranks = ["Майор", "Сержант", "Старший сержант", "Старшина"];
  const [activeInputIndex, setActiveInputIndex] = useState<number>(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [triggerGetUsers] = useLazyGetFilteredUsersQuery();

  useEffect(() => {
    const savedFilters = localStorage.getItem('userFilters');
    if (savedFilters) {
      try {
        const parsedFilters: SavedFilterState = JSON.parse(savedFilters);
        setInputValues(parsedFilters.inputValues);
        setCheckedStates(parsedFilters.checkedStates);
        setSelectedLetter(parsedFilters.selectedLetter);
      } catch (e) {
        console.error('Failed to parse saved filters', e);
      }
    }
  }, []);

  const handleApplyClick = () => {
    const selectedRanks = checkedStates
      .map((checked, index) => checked ? ranks[index] : null)
      .filter(Boolean);

    const filterParams: FilterUser = {
      yearStart: inputValues[0] ? parseInt(inputValues[0]) : undefined,
      yearEnd: inputValues[1] ? parseInt(inputValues[1]) : undefined,
      rank: selectedRanks.length > 0 ? selectedRanks : undefined,
      word: selectedLetter ? [selectedLetter] : undefined,
    };

    const filtersToSave: SavedFilterState = {
      inputValues,
      checkedStates,
      selectedLetter
    };
    localStorage.setItem('userFilters', JSON.stringify(filtersToSave));

    triggerGetUsers(filterParams)
      .unwrap()
      .then((data) => {
        dispatch(setUsers(data));
        onClose(); 
      })
      .catch((error) => {
        console.error("Ошибка при фильтрации:", error);
      });
  };

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      console.log("");
    } else if (key === "(x)") {
      if (cursorPosition > 0) {
        const newValues = [...inputValues] as [string, string];
        newValues[activeInputIndex] = 
          newValues[activeInputIndex].substring(0, cursorPosition - 1) +
          newValues[activeInputIndex].substring(cursorPosition);
        setInputValues(newValues);
        setCursorPosition(cursorPosition - 1);
      }
    } else {
      const newValues = [...inputValues] as [string, string];
      newValues[activeInputIndex] = 
        newValues[activeInputIndex].substring(0, cursorPosition) +
        key +
        newValues[activeInputIndex].substring(cursorPosition);
      setInputValues(newValues);
      setCursorPosition(cursorPosition + 1);
    }
    setTimeout(() => {
      const activeInput = inputRefs[activeInputIndex].current;
      if (activeInput) {
        activeInput.focus();
        activeInput.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  

  const handleClickClearFilter = () => {
    setCheckedStates([false, false, false, false]);
    setInputValues(["1900", String(new Date().getFullYear())]);
    setSelectedLetter(null);
    localStorage.removeItem('userFilters');
    dispatch(clearUsers())
    onClose();
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter__boxH1}>
        <h1 className={styles.filter__boxH1_text}>ФИЛЬТРЫ</h1>
        <img
          className={styles.filter__boxH1_crossSvg}
          onClick={onClose}
          src={crossSvg}
          alt=""
        />
      </div>
      <AgeFilter
        inputRefs={inputRefs}
        onShowKeyboard={setShowKeyboard}
        setCursorPosition={setCursorPosition}
        inputValues={inputValues}
        setInputValues={setInputValues}
        setActiveInputIndex={setActiveInputIndex}
      />
      <CheckboxFilter 
        checkedStates={checkedStates}
        setCheckedStates={setCheckedStates}
      />
      <LettersFilter 
        selectedLetter={selectedLetter}
        onLetterSelect={setSelectedLetter}
      />

      <div className={styles.boxButton}>
        <Button className={styles.boxButton__item1Button} onClick={handleApplyClick}>ПРИМЕНИТЬ</Button>
        <Button onClick={handleClickClearFilter} className={styles.boxButton__item1Button} variant="silver">
          ОЧИСТИТЬ
        </Button>
      </div>
      {showKeyboard && (
        <div className={styles.keyboardWrapper}>
          <Keyboard
            onKeyPress={handleKeyPress}
            closeKeyboard={() => setShowKeyboard(false)}
            onMouseDown={(e) => e.preventDefault()} 
          ></Keyboard>
        </div>
      )}
    </div>
  );
}