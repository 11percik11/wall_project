import Search from '../../features/Search';
import Header from '../../widgets/Header';
import styles from './index.module.scss';

export default function SearchHeroPage() {
    return (
      <div className={styles.container}>
        <Header variant="white"/>
        <Search/>
      </div>
    )
  }