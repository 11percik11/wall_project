import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/ui/Button";
import { useGetUserByIdQuery } from "../../api/userApi";
import UserAvatar from "../UserAvatar";
import styles from "./index.module.scss";
import meadalPhoto from '../../../../shared/assets/foto/medal_photo.png'
import medalSvg from '../../../../shared/assets/svg/medal_svg.svg';

export default function UserProfile() {
  const path = window.location.pathname;
  const id = path.split("/").pop();
  const { data, isLoading, error} = useGetUserByIdQuery(Number(id));
    const navigate = useNavigate();
    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {"status" in error ? error.status : ""}</div>;
    if (data == undefined) return null;

  return (
    <div className={styles.userProfile}>
      <div className={styles.userProfile__avatar}>
        <UserAvatar
          pathUrlImg={data?.image}
        />
      </div>
      <div className={styles.userProfile__information}>
        <div className={styles.userProfile__information_container}>
          <div>
            <div className={styles.userProfile__information_boxItem}>
              <h1 className={styles.userProfile__information_name}>{data?.name}</h1>
            </div>
            <div className={styles.userProfile__information_boxItem}>
              <div className={styles.userProfile__information_titleText}>Годы Жизни</div>
              <div className={styles.userProfile__information_text}>{data?.yearStartAt && data.yearEndAt ? `${data?.yearStartAt}  ⎯ ${data?.yearEndAt}` : "⎯⎯"}</div>
            </div>
            <div className={styles.userProfile__information_boxRange}>
              <div className={styles.userProfile__information_boxItem}>
                <div className={styles.userProfile__information_titleText}>Звание</div>
                <div className={styles.userProfile__information_text}>{data?.ranks ? data?.ranks : "⎯⎯"}</div>
              </div>
              <div className={styles.userProfile__information_boxItem}>
                <div className={styles.userProfile__information_titleText}>Награды / Подвиг</div>
                <div className={styles.userProfile__information_text}>{data?.awards.length ? data?.awards.map((e) => (e)) : "⎯⎯"}</div>
              </div>
            </div>
          </div>
          {data?.medal ? <div><img src={meadalPhoto} alt="" /></div> : <></>}
        </div>
        <div>
          <div className={styles.userProfile__information_boxItem}>
            <div className={styles.userProfile__information_titleText}>Информация</div>
            <div className={styles.userProfile__information_text}>
              {data?.information ? data.information :  "⎯⎯"}
            </div>
          </div>
          <div className={styles.userProfile__information_boxButton}>
            <Button className={styles.userProfile__information_button} onClick={() => navigate(`/`)} variant="silver">НА ГЛАВНУЮ</Button>
            <Button className={`${styles.userProfile__information_button} ${styles.userProfile__information_buttonSvg}`} onClick={() => navigate(`/profile/${data?.next}`)} variant="red" svg={medalSvg}>СЛЕДУЮЩИЙ ГЕРОЙ</Button>
          </div>
          <div>
            Для стены памяти информация получена от родных, близких и друзей
            героев
          </div>
        </div>
      </div>
    </div>
  );
}
