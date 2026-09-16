import Link from 'next/link'
import { loadPosts } from '../lib/posts'

const EMAIL = 'dreamjh1111@gmail.com'

const CAREER = [
  {
    company: '커머스 서비스',
    role: '백엔드 개발자',
    period: '재직 중',
    points: [
      '관리자 도구, 앱 API, 판매자 도구, 서버리스 작업, AWS 인프라를 넘나들며 작업했습니다.',
      '결제사 제휴 할인 운영 체계를 설계부터 구현까지 단독으로 맡았습니다. 예산 소진 자동 중단과 정산 근거를 만들어 매일 하던 수기 작업을 없앴습니다.',
      '현황 화면이 12억 행을 읽던 집계를 실행계획을 바탕으로 구조부터 바꿨습니다. 막아뒀던 기능을 되살렸습니다.',
      '인스턴스가 늘면서 생긴 배치 중복 실행을 네임드 락으로 직렬화했습니다.',
      '영상 트랜스코딩 파이프라인을 관리형 서비스로 전환했습니다. 검증 환경을 따로 구성해 dev에서 확인한 뒤 prod로 확장했습니다.',
      '디지털 상품 라이선스 키 발급 체계를 만들었습니다. KMS 암호화와 취소 시 회수 흐름을 포함합니다.',
    ],
  },
  {
    company: '우당네트웍',
    role: '인프라·백엔드 총괄',
    period: '2023 ~ 2024',
    points: [
      '동물 실험 대행 서비스의 전체 아키텍처를 설계하고 구현했습니다.',
      'AWS 인프라와 CI/CD 파이프라인, 결제 시스템을 구축했습니다.',
      '3개월 만에 서비스를 출시해 월 매출 1억을 달성했습니다.',
    ],
  },
  {
    company: '아리아텍',
    role: '통신연구원',
    period: '2021',
    points: [
      '5G 통신 과금 서버의 이중화와 설치, 배포를 담당했습니다.',
      '수십만 명이 동시에 사용해도 견디도록 시나리오를 작성하고 부하 테스트를 진행했습니다.',
    ],
  },
  {
    company: 'Continental Automotive',
    role: 'SW 엔지니어링 인턴',
    period: '2020, 6개월',
    points: ['차량용 클러스터 개발과 분석, 테스트를 담당했습니다.'],
  },
]

const STACK = [
  { label: '언어', items: 'TypeScript, JavaScript, Java, Kotlin' },
  { label: '프레임워크', items: 'NestJS, Spring Boot, GraphQL' },
  { label: '데이터', items: 'MySQL, TypeORM, Redis, OpenSearch' },
  { label: '인프라', items: 'AWS, Terraform, Docker, CloudWatch' },
]

export default function Home() {
  const recent = loadPosts().slice(0, 3)

  return (
    <>
      <section className="hero">
        <h1>홍종혁</h1>
        <p className="hero-line">
          백엔드 개발자입니다. 임베디드와 통신을 거쳐 커머스 백엔드로 왔습니다.
        </p>
        <p className="hero-sub">
          돈과 자산이 걸린 기능을 설계부터 운영까지 맡아왔습니다.
          운영 중에 드러나는 문제를 측정해서 고치는 일을 주로 합니다.
        </p>
      </section>

      <section className="block">
        <h2>경력</h2>
        {CAREER.map((c) => (
          <article className="career" key={c.company + c.period}>
            <header className="career-head">
              <span className="career-company">{c.company}</span>
              <span className="career-period">{c.period}</span>
            </header>
            <div className="career-role">{c.role}</div>
            <ul className="career-points">
              {c.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="block">
        <h2>기술</h2>
        <dl className="stack">
          {STACK.map((s) => (
            <div className="stack-row" key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
        <p className="note">
          설명할 수 있는 것만 적었습니다. 근거는{' '}
          <a href="https://xo0449.github.io/backend-lab/">backend-lab</a>에 코드와
          측정으로 남겨두고 있습니다.
        </p>
      </section>

      <section className="block">
        <h2>학력과 자격</h2>
        <dl className="stack">
          <div className="stack-row">
            <dt>고려대학교</dt>
            <dd>전자·기계융합공학과, 임베디드 공학 전공 (2014.03 ~ 2022.02)</dd>
          </div>
          <div className="stack-row">
            <dt>삼성 청년 SW 아카데미</dt>
            <dd>8기 (2022.07 ~ 2023.04)</dd>
          </div>
          <div className="stack-row">
            <dt>정보처리기사</dt>
            <dd>2024.09</dd>
          </div>
        </dl>
      </section>

      {recent.length > 0 && (
        <section className="block">
          <h2>최근 글</h2>
          <ul className="post-list">
            {recent.map((p) => (
              <li className="post-item" key={p.slug}>
                <Link href={`/posts/${p.slug}`}>
                  <span className="post-date">{p.date}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="note">
            <Link href="/posts">글 전체 보기</Link>
          </p>
        </section>
      )}

      <section className="block" id="contact">
        <h2>Contact</h2>
        <dl className="stack">
          <div className="stack-row">
            <dt>이메일</dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </dd>
          </div>
          <div className="stack-row">
            <dt>GitHub</dt>
            <dd>
              <a href="https://github.com/xo0449">github.com/xo0449</a>
            </dd>
          </div>
          <div className="stack-row">
            <dt>backend-lab</dt>
            <dd>
              <a href="https://xo0449.github.io/backend-lab/">
                문제를 재현하고 고쳐보는 기록
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </>
  )
}
