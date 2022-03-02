import styles from './header.module.scss'

export default function Header() {
  
  return(
    <header className={styles.component}>
      <div className={styles.container}>
        <a href="#">
          <img src="/logo1.svg" alt="logo" />
        </a>
      </div>
    </header>
  )
}
