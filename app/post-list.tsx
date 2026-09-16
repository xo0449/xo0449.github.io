'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { PostMeta } from '../lib/posts'

/**
 * 태그로 글을 거른다.
 *
 * 글이 늘면서 성격이 다른 것들이 섞였다.
 * 학습 기록만 보고 싶거나 특정 주제만 보고 싶을 때가 생긴다.
 */
export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string | null>(null)

  // 많이 쓰인 태그가 앞에 오게 한다. 같은 횟수면 이름순이다.
  const tags = useMemo(() => {
    const count = new Map<string, number>()
    for (const p of posts) {
      for (const t of p.tags) count.set(t, (count.get(t) ?? 0) + 1)
    }
    return [...count.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag, n]) => ({ tag, n }))
  }, [posts])

  const shown = active ? posts.filter((p) => p.tags.includes(active)) : posts

  return (
    <>
      <div className="filters">
        <button
          className="filter"
          data-active={active === null}
          onClick={() => setActive(null)}
        >
          전체
        </button>
        {tags.map(({ tag, n }) => (
          <button
            key={tag}
            className="filter"
            data-active={active === tag}
            onClick={() => setActive(active === tag ? null : tag)}
          >
            {tag} <span className="filter-count">{n}</span>
          </button>
        ))}
      </div>

      <ul className="post-list">
        {shown.map((p) => (
          <li className="post-item" key={p.slug}>
            <Link href={`/posts/${p.slug}`}>
              <span className="post-date">{p.date}</span>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
            </Link>
            <div className="tags">
              {p.tags.map((t) => (
                <button
                  key={t}
                  className="tag tag-button"
                  data-active={active === t}
                  onClick={() => setActive(active === t ? null : t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
