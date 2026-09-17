const EMAIL = 'dreamjh1111@gmail.com'

const SUBJECT = '커피챗'

const BODY = [
  '안녕하세요.',
  '',
  '- 어떤 이야기를 나누고 싶으신지:',
  '- 편한 시간대:',
  '',
].join('\n')

/**
 * 글 맨 아래에 붙는 커피챗 블록.
 *
 * 글이 끝나는 자리가 제일 자연스러운 자리다.
 * 다 읽은 사람은 이미 어떻게 일하는 사람인지 알고 있어서,
 * 여기서 다시 자기소개를 하면 오히려 군더더기가 된다.
 *
 * 메일 제목과 항목 두 줄을 미리 채워둔다.
 * 빈 메일 창을 여는 것과 질문이 적혀 있는 것은 답장률이 다르다.
 */
export default function Ask() {
  const mailto =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(SUBJECT)}` +
    `&body=${encodeURIComponent(BODY)}`

  return (
    <aside className="ask">
      <h2>커피챗 환영합니다</h2>
      <p>
        원인이 나올 때까지 파보는 걸 좋아합니다.
        이 글들도 대부분 그렇게 나왔습니다.
      </p>
      <div className="ask-actions">
        <a className="ask-button" href={mailto}>메일 보내기</a>
        <a className="ask-button ask-button-quiet" href="/#contact">Contact 보기</a>
      </div>
    </aside>
  )
}
