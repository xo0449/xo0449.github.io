'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { PostMeta } from '../lib/posts'

type Entry =
  | { kind: 'post'; post: PostMeta }
  | { kind: 'series'; name: string; posts: PostMeta[]; latest: string }

/**
 * 시리즈는 목록에서 하나로 묶어 접어둔다.
 *
 * 다섯 편짜리 시리즈가 목록을 다 차지하면 다른 글이 안 보인다.
 * 접어두면 목록은 글의 종류만큼만 길어진다.
 */
function group(posts: PostMeta[]): Entry[] {
  const out: Entry[] = []
  const seen = new Set<string>()

  for (const post of posts) {
    if (!post.series) {
      out.push({ kind: 'post', post })
      continue
    }
    if (seen.has(post.series)) continue
    seen.add(post.series)

    // 시리즈 안에서는 1편부터. 목록은 최신순이지만 시리즈는 읽는 순서가 있다.
    const members = posts
      .filter((p) => p.series === post.series)
      .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))

    out.push({
      kind: 'series',
      name: post.series,
      posts: members,
      latest: post.date,
    })
  }
  return out
}

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState<Set<string>>(new Set())

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
  const entries = useMemo(() => group(shown), [shown])

  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  const TagRow = ({ post }: { post: PostMeta }) => (
    <div className="tags">
      {post.tags.map((t) => (
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
  )

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
        {entries.map((e) =>
          e.kind === 'post' ? (
            <li className="post-item" key={e.post.slug}>
              <Link href={`/posts/${e.post.slug}`}>
                <span className="post-date">{e.post.date}</span>
                <h2>{e.post.title}</h2>
                <p>{e.post.summary}</p>
              </Link>
              <TagRow post={e.post} />
            </li>
          ) : (
            <li className="post-item series" key={e.name}>
              <button
                className="series-head"
                onClick={() => toggle(e.name)}
                aria-expanded={open.has(e.name)}
              >
                <span className="series-mark" data-open={open.has(e.name)}>
                  ▸
                </span>
                <span className="series-body">
                  <span className="post-date">{e.latest}</span>
                  <span className="series-title">{e.name}</span>
                  <span className="series-count">{e.posts.length}편</span>
                </span>
              </button>

              {open.has(e.name) && (
                <ol className="series-list">
                  {e.posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/posts/${p.slug}`}>
                        <span className="series-part">{p.part}편</span>
                        <span className="series-item-title">{p.title}</span>
                        <span className="series-item-summary">{p.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ),
        )}
      </ul>
    </>
  )
}
