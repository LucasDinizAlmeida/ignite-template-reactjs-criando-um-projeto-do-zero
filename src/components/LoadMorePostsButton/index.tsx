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
  next_page: string | null,
  setPosts:  Dispatch<SetStateAction<Post[]>>,
  posts: Post[],
  setNextPage: Dispatch<SetStateAction<string>>
}

export function LoadMorePostsButton({ next_page, setPosts, posts, setNextPage }: LoadMorePostsButtonProps) {

  const handleFetchNextPage =async() => {

    const response = await fetch(next_page)
    const postsResponse = await response.json()

    console.log(postsResponse)

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
    setNextPage(postsResponse.next_page)

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