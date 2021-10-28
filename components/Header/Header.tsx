import styles from './Header.module.css'

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>∰</div>
      <div className={styles.title}>
        MyTune
      </div>
    </header>
  )
}