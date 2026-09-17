/**
 * 시리즈 글의 제목은 "시리즈 이름 — 소제목" 꼴이다.
 * 글 자체는 그 이름을 달고 있어야 목록 밖에서도 어디 소속인지 보인다.
 * 그런데 시리즈 이름이 이미 옆에 적힌 자리에서는 같은 말이 두 번 나온다.
 * 그런 자리에서만 접두어를 뗀다.
 *
 * posts.ts가 아니라 따로 둔 이유는 posts.ts가 node:fs를 쓰기 때문이다.
 * 목록은 클라이언트 컴포넌트라, 거기서 posts.ts의 함수를 부르면
 * fs가 브라우저 번들로 딸려 들어가 빌드가 깨진다.
 */
export function subtitleOf(title: string, series: string): string {
  const prefix = `${series} — `
  return title.startsWith(prefix) ? title.slice(prefix.length) : title
}
