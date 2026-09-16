import { loadPosts } from '../../lib/posts'
import PostList from '../post-list'

export default function Posts() {
  const posts = loadPosts().map(({ body, ...meta }) => meta)

  return (
    <>
      <h1 className="page-title">글</h1>
      <p className="intro">
        일하면서 마주친 문제와 그때 내린 판단을 적습니다.
        코드로 재현해본 것은{' '}
        <a href="https://xo0449.github.io/backend-lab/">backend-lab</a>에 있습니다.
      </p>
      <PostList posts={posts} />
    </>
  )
}
