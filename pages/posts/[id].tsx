import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData, type Post } from '../../lib/posts'

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: {
  params: {
    id: string
  }
}) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }: {
  postData: Post
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml ? postData.contentHtml : 'No cotent available.' }} />
      </article>
    </Layout>
  )
}
