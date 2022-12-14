import Date from '../../components/date'
import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }: {
  postData: {
    title: string,
    date: string,
    contentHtml: string
  }
}) {
  return postData
    ? <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{
          __html: postData.contentHtml ? postData.contentHtml : 'No cotent available.'
        }} />
      </article>
    </Layout>
    : null
}

export const getStaticPaths:GetStaticPaths = () => {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}
