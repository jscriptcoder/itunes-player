import styles from './Footer.module.css'

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.container}>
      MyTune ©
      {' '}
      {new Date().getFullYear()}
    </footer>
  )
}