import Button from "../../../../shared/ui/Button";
import filter from "../../../../shared/assets/svg/filter_svg.svg";
import filterTrue from "../../../../shared/assets/svg/filter_true_svg.svg";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { clearUsers } from "../../../../entities/User/api/userSlice";
import { useNavigate } from "react-router-dom";

interface ButtonFilterProps {
  isFilterActive: boolean;
  onFilterClick: () => void;
  nameValue?: string | null;
}

export default function ButtonFilter({
  isFilterActive,
  onFilterClick,
  nameValue
}: ButtonFilterProps) {
  console.log(isFilterActive);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFilterClickClear = () => {
    dispatch(clearUsers())
    localStorage.removeItem('userFilters');
    navigate('/')
  }
  return (
    <div className={styles.buttonFilter}>
      {isFilterActive ? (
        <>
        { !nameValue ? (
          <Button
          variant="red"
          svg={filterTrue}
          onClick={onFilterClick}
          className={`${styles.buttonFilter__filter} ${styles.buttonFilter__button}`}
          >
            ФИЛЬТР АКТИВЕН
          </Button>
        ) : <></>}
          <Button
            onClick={onFilterClickClear}
            variant="silver"
            className={`${styles.buttonFilter__button} ${styles.buttonFilter__buttonMargin}`}
          >
            ОЧИСТИТЬ ВСЁ
          </Button>
        </>
      ) : (
        <Button
          variant="silver"
          svg={filter}
          onClick={onFilterClick}
          className={`${styles.buttonFilter__filter} ${styles.buttonFilter__button}`}
        >
          ФИЛЬТР
        </Button>
      )}
    </div>
  );
}
