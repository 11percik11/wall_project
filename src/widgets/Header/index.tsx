import Button from "../../shared/ui/Button";
import styles from "./index.module.scss";
import statueSvg from "../../shared/assets/svg/statue_svg.svg";
import museumBlackSvg from "../../shared/assets/svg/museum_black_svg.svg";
import museumWhiteSvg from "../../shared/assets/svg/museum_white_svg.svg";

interface HeaderProps {
  variant?: "black" | "white";
}

export default function Header({ variant = "black" }: HeaderProps) {
  const svgMuseum = variant == "black" ? museumBlackSvg : museumWhiteSvg;
  return (
    <div className={styles.header}>
      <div className={styles.header__boxSvg}>
        <img src={statueSvg} alt="" />
        <img src={svgMuseum} alt="" />
      </div>
      <Button className={styles.header__button}>
        КАК ДОБАВИТЬ МОЕГО ГЕРОЯ
      </Button>
    </div>
  );
}
