import styles from './styles.module.scss'

interface LoadMorePostsButtonProps {
  isActive: boolean
}

export function LoadMorePostsButton({ isActive }: LoadMorePostsButtonProps) {

  return isActive? (
    <a 
      type="button"
      className={styles.content}
    >
      Carregar mais posts
    </a>
  ) : (
    <></>
  )
}