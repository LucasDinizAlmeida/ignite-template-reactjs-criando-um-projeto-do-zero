import { Dispatch, SetStateAction } from 'react'
import styles from './styles.module.scss'

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface LoadMorePostsButtonProps {
  next_page?: string,
  setPosts:  Dispatch<SetStateAction<Post[]>>,
  posts: Post[]
}

export function LoadMorePostsButton({ next_page, setPosts, posts }: LoadMorePostsButtonProps) {

  const handleFetchNextPage =async() => {

    const response = await fetch(next_page)
    const postsResponse = await response.json()

    const results = postsResponse.results.map(post => {

      return {
        uid: post.uid,
        first_publication_date: new Date(post.first_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author
        }
      }
    })



    setPosts([
      ...posts,
      ...results
    ])



  }

  return next_page? (
    <button 
      type="button"
      className={styles.content}
      onClick={handleFetchNextPage}
    >
      Carregar mais posts
    </button>
  ) : (
    <></>
  )
}