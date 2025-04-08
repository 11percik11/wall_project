import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface UserAvatarProps {
  pathUrlImg?: string;
  text?: string;
  numberId?: number
}

export default function UserAvatar({ pathUrlImg, text = "", numberId }: UserAvatarProps) {
  const navigate = useNavigate()
  return (
    <>
      <div onClick={() => navigate(`/profile/${numberId}`)} className={styles.con2} style={{ backgroundImage: `url(https://book-memory.itlabs.top${pathUrlImg})` }}>
        <h1 className={styles.con2__text}>{text}</h1>
      </div>
    </>
  );
}
