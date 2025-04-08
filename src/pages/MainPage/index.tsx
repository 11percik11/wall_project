import Header from "../../widgets/Header";
import ButtonFilter from "../../features/Filter/ui/ButtonFilter";
import GridLayout from "../../widgets/MainWall";
import { useGetUserQuery } from "../../entities/User/api/userApi";
import Button from "../../shared/ui/Button";
import searchSvg from "../../shared/assets/svg/search_svg.svg";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useState } from "react";
import Filter from "../../features/Filter";
import { useSelector } from "react-redux";
import { User } from "../../entities/User/model/types";

export default function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const name = searchParams.get("name");
  const dataFilter = useSelector((state: { user: { users: User[] } }) => state.user);
  const { data, error, isLoading } = useGetUserQuery(name ? { name } : {});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {"status" in error ? error.status : ""}</div>;
  if (data == undefined) return null;
  
  const multipliedData = dataFilter.users.length && !name ? dataFilter.users : data;

  return (
    <>
      <Header />
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      <div className={styles.boxFilter}>
      <ButtonFilter 
          nameValue={name}
          isFilterActive={Boolean(dataFilter.users.length || name)}
          onFilterClick={() => setIsFilterOpen(!isFilterOpen)}
        />
        {!name ? (
          <p className={styles.boxFilter__filterText}>СТЕНА ПАМЯТИ</p>
        ) : (
          <div className={styles.boxFilter__container}>
            <p className={styles.boxFilter__filterText}>РЕЗУЛЬТАТЫ ПОИСКА </p>
            <div className={styles.boxFilter__container_count}>
              {data.length}
            </div>
          </div>
        )}
      </div>
      <GridLayout data={multipliedData} />
      <div className={styles.mainpage__boxButton}>
        <Button
          onClick={() => navigate("/search")}
          variant="red"
          svg={searchSvg}
          className={styles.mainpage__boxButton_button}
        >
          ПОИСК ГЕРОЯ
        </Button>
      </div>
    </>
  );
}
