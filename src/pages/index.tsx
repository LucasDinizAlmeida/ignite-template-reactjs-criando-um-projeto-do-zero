import { GetStaticProps } from 'next';
import { BiCalendar, BiUserCircle } from 'react-icons/bi'
import { LoadMorePostsButton } from '../components/LoadMorePostsButton';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

 export default function Home() {
   
  return(
    <main className={commonStyles.container}>
      <div className={`${commonStyles.content} ${styles.link}`}>
        <a href="#">
          <h2>Como utilizar Hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida</p>
          <div className={styles.miniContainer}>
            <div>
              <BiCalendar fontSize={26}/>
              <time>15 Mar 2021</time>
            </div>
            <div>
              <BiUserCircle fontSize={26}/>
              <span>Joseph Oliveira</span>
            </div>   
          </div>
        </a>
        <a href="#">
          <h2>Como utilizar Hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida</p>
          <div className={styles.miniContainer}>
            <div>
              <BiCalendar fontSize={26}/>
              <time>15 Mar 2021</time>
            </div>
            <div>
              <BiUserCircle fontSize={26}/>
              <span>Joseph Oliveira</span>
            </div>   
          </div>
        </a>
        <a href="#">
          <h2>Como utilizar Hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida</p>
          <div className={styles.miniContainer}>
            <div>
              <BiCalendar fontSize={26}/>
              <time>15 Mar 2021</time>
            </div>
            <div>
              <BiUserCircle fontSize={26}/>
              <span>Joseph Oliveira</span>
            </div>   
          </div>
        </a>
        <LoadMorePostsButton isActive={true}/>
      </div>
    </main>
    
  )
 }

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
