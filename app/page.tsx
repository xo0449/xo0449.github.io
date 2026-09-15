import Link from 'next/link'
import { loadPosts } from '../lib/posts'

export default function Home() {
  const posts = loadPosts()

  return (
    <>
      <p className="intro">
        백엔드 개발자입니다. 일하면서 마주친 문제와 그때 내린 판단을 적습니다.
        코드로 재현해본 것은{' '}
        <a href="https://xo0449.github.io/backend-lab/">backend-lab</a>에 있습니다.
      </p>

      <ul className="post-list">
        {posts.map((p) => (
          <li className="post-item" key={p.slug}>
            <Link href={`/posts/${p.slug}`}>
              <span className="post-date">{p.date}</span>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
