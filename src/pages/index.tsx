import { GetStaticProps } from 'next';
import { BiCalendar, BiUserCircle } from 'react-icons/bi'
import { LoadMorePostsButton } from '../components/LoadMorePostsButton';
import Prismic from '@prismicio/client'
import Link from 'next/link'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useEffect, useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

 export default function Home({ postsPagination }: HomeProps) {

  const [ posts, setPosts ] = useState<Post[]>([])

  useEffect(() => {
    setPosts(postsPagination.results)
  }, [])
   
 
  return(
    <main className={commonStyles.container}>
      <div className={`${commonStyles.content} ${styles.link}`}>
        {
          posts.map(post => (
            <Link href={`/post/${post.uid}`}>
               <a  key={post.uid}>
                  <h2>{post.data.title}</h2>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.miniContainer}>
                    <div>
                      <BiCalendar fontSize={26}/>
                      <time>{post.first_publication_date}</time>
                    </div>
                    <div>
                      <BiUserCircle fontSize={26}/>
                      <span>{post.data.author}</span>
                    </div>   
                  </div>
                </a>
            </Link>
           
          ))
        }
        
        <LoadMorePostsButton 
          next_page={postsPagination.next_page? postsPagination.next_page : null}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
    </main>
    
  )
 }

 export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const postsResponse = await prismic.query([
      Prismic.Predicates.at('document.type', 'posts')
    ], {
      //fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1
    });



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

    
    return{
      props: {
        postsPagination: {
          next_page: postsResponse.next_page,
          results
        }
      },
      revalidate: 60 * 60 * 24 //24 hours
    }
 };
