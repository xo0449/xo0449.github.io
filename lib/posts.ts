import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

export interface Post extends PostMeta {
  body: string
}

/**
 * posts/ 아래 마크다운을 읽는다. 파일을 추가하면 목록에 나타난다.
 * 등록 절차는 없다.
 */
export function loadPosts(): Post[] {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), 'utf8')
      const { data, content } = matter(raw)
      const slug = file.replace(/\.md$/, '')

      if (!data.title) throw new Error(`[${slug}] title이 없습니다`)
      if (!data.date) throw new Error(`[${slug}] date가 없습니다`)

      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        summary: String(data.summary ?? ''),
        tags: (data.tags ?? []) as string[],
        body: content,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function loadPost(slug: string): Post | undefined {
  return loadPosts().find((p) => p.slug === slug)
}
