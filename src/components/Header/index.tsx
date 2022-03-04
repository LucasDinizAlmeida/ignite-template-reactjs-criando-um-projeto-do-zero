import styles from './header.module.scss'
import Link from 'next/link'

export default function Header() {
  
  return(
    <header className={styles.component}>
      <div className={styles.container}>

        <Link href="/">
          <a>
            <img src="/logo1.svg" alt="logo" />
          </a>
        </Link>
        
      </div>
    </header>
  )
}
