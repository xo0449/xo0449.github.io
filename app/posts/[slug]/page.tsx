import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { loadPost, loadPosts } from '../../../lib/posts'

export function generateStaticParams() {
  return loadPosts().map((p) => ({ slug: p.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = loadPost(slug)
  if (!post) notFound()

  const html = await marked.parse(post.body)

  return (
    <>
      <Link className="back" href="/">← 목록</Link>

      <div className="post-meta">
        <span className="post-date">{post.date}</span>
        <h1>{post.title}</h1>
        <div className="tags">
          {post.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>

      <article className="readme" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
