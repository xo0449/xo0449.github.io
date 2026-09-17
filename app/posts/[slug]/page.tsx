import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { loadPost, loadPosts, seriesNav } from '../../../lib/posts'

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
  const series = seriesNav(slug)

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

      {series && (
        <nav className="series-nav" aria-label="시리즈 이동">
          <div className="series-nav-name">
            {series.name} · {post.part}편 / 전체 {series.all.length}편
          </div>
          <div className="series-nav-links">
            {series.prev && (
              <Link href={`/posts/${series.prev.slug}`}>
                <span>이전</span>
                {series.prev.title}
              </Link>
            )}
            {series.next && (
              <Link href={`/posts/${series.next.slug}`}>
                <span>다음</span>
                {series.next.title}
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
