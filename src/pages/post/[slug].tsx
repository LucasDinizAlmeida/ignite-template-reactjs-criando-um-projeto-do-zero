import { GetStaticPaths, GetStaticProps } from 'next';
import { BiCalendar, BiUserCircle, BiAlarm } from 'react-icons/bi'

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

 export default function Post() {
   
    return(
      <>
        <img 
          src="/banner.svg" 
          alt="banner" 
          className={styles.bannerWidth}
        />
        <main className={commonStyles.container}>
          <div className={`${commonStyles.content} ${styles.localStyles}`}>
          <header>
              <h1>Como utilizar Hooks</h1>
              <div>
                <div>
                  <BiCalendar fontSize={26}/>
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <BiUserCircle fontSize={26}/>
                  <span>Joseph Oliveira</span>
                </div>
                <div>
                  <BiAlarm fontSize={26}/>
                  <span>4 min</span>
                </div>
              </div>
            </header>
            <section>
              <h2>Lorem ipsum dolor</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum quo nulla eius voluptate minima libero corrupti numquam illum, temporibus porro omnis doloremque totam voluptas eaque necessitatibus ab rem distinctio suscipit.</p>
              <h2>Similique enim facere</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ut recusandae. Unde, praesentium consequuntur perspiciatis sed quidem quisquam, ipsa ipsam vero ipsum reprehenderit omnis repudiandae, iure nesciunt minus necessitatibus eos?Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sint error, quibusdam dicta ad iste suscipit nostrum perspiciatis, similique distinctio quo magnam rerum necessitatibus animi dignissimos recusandae eum? Iure, eaque!lor</p>
            </section>
          </div>
        </main>
      </>
      
    )
 }

 export const getStaticPaths: GetStaticPaths = async () => {
   //const prismic = getPrismicClient();
   //const posts = await prismic.query(TODO);

   return {
     paths: [
       
     ],
     fallback: 'blocking'
   }
 };

 export const getStaticProps: GetStaticProps = async ({ params }) => {

  const slug = { params }

   const prismic = getPrismicClient();
   const response = await prismic.getByUID('posts', String(slug), {})

   console.log(response)

   return {
     props: {

     }
   }

 };
