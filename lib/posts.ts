import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  /** 화면에 보이는 날짜. YYYY-MM-DD */
  date: string
  /**
   * 정렬에 쓰는 값. 같은 날 여러 편을 쓰면 날짜만으로는 순서가 정해지지 않는다.
   * frontmatter에 시각을 같이 적으면 그 순서를 따른다.
   */
  sortKey: string
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
        // YAML이 날짜를 Date로 파싱한다. 문자열로 되돌린다.
        date: toDateString(data.date),
        sortKey: toSortKey(data.date),
        summary: String(data.summary ?? ''),
        tags: (data.tags ?? []) as string[],
        body: content,
      }
    })
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey))
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

/** 시각이 없으면 그날 00시로 본다. 같은 시각이면 파일 순서가 그대로 남는다. */
function toSortKey(value: unknown): string {
  if (value instanceof Date) return value.toISOString()
  const text = String(value).trim()
  return text.length > 10 ? text : `${text}T00:00:00.000Z`
}

export function loadPost(slug: string): Post | undefined {
  return loadPosts().find((p) => p.slug === slug)
}
