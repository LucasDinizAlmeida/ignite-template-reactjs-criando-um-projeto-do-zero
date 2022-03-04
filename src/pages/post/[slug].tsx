import { GetStaticPaths, GetStaticProps } from 'next';
import { BiCalendar, BiUserCircle, BiAlarm } from 'react-icons/bi'
import { RichText } from "prismic-dom"
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[]
    }[];
  };
}

interface PostProps {
  post: Post;
}

 export default function Post({ post }: PostProps) {

  const { isFallback } = useRouter()

  if(isFallback) {
    return(
      <h1>Carregando...</h1>
    )
  }
/*
  const text = post.data.content.map(item => {
    const { heading } = item
    return {
      heading,

    }
  })

  */
  const wordArray = post.data.content.reduce((accumulator, value) => {

    accumulator += `${value.heading} `
    accumulator += `${RichText.asText(value.body)} `

    return accumulator
  }, '')

  
  const estimatedReadingTime = Math.floor(wordArray.split(' ').length / 150) 
  
    return(
      <>
        <img 
          src={post.data.banner.url} 
          alt="banner" 
          className={styles.bannerWidth}
        />
        <main className={commonStyles.container}>
          <div className={`${commonStyles.content} ${styles.localStyles}`}>
          <header>
              <h1>{post.data.title}</h1>
              <div>
                <div>
                  <BiCalendar fontSize={26}/>
                  <time>{`25 mar 2021`}</time>
                </div>
                <div>
                  <BiUserCircle fontSize={26}/>
                  <span>{post.data.author}</span>
                </div>
                <div>
                  <BiAlarm fontSize={26}/>
                  <span>{`${estimatedReadingTime} min`}</span>
                </div>
              </div>
            </header>
            <section>
              {
                post.data.content.map(item => {

                  

                  return (
                  <div key={item.heading}>
                    <h2>{item.heading}</h2>
                    <div dangerouslySetInnerHTML={{ __html: RichText.asHtml(item.body) }}/>
                  </div>
                )})
              }
            </section>
          </div>
        </main>
      </>
      
    )
 }

 export const getStaticPaths: GetStaticPaths = async () => {
   
   const prismic = getPrismicClient();
   const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts')
  ], {
    //fetch: ['post.title', 'post.subtitle', 'post.author'],
    pageSize: 1
  });

  const paths = posts.results.map(post => {
    return { params: { slug: post.uid }}
  })
  
   return {
     paths,
     fallback: true
   }
 };

 export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params

   const prismic = getPrismicClient()
   const response = await prismic.getByUID('posts', String(slug), {})

   const post = {
    first_publication_date: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: response.data.content.map(item => {
        return {
          heading: item.heading,
          body: item.body
        }
      })
    }
   }

   
   return {
     props: {
      post
     },
     revalidate: 60 * 60 * 24 //24 hours
   }

 };
