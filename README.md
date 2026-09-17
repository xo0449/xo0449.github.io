# xo0449.github.io

백엔드 개발자의 기록. https://xo0449.github.io

## 글 쓰기

`posts/` 아래에 마크다운 파일을 추가하면 목록에 나타납니다.
등록 절차는 없습니다.

```markdown
---
title: 제목
date: 2026-09-15
summary: 한 줄 요약
tags: [mysql, 성능]
---

본문
```

`title`과 `date`가 없으면 빌드가 실패합니다.

글의 종류와 제목 규칙은 [WRITING.md](WRITING.md)에 있습니다.

## 실행

```bash
npm install
npm run dev
```

## 라이선스

코드는 [MIT](LICENSE)입니다. `posts/` 아래의 글과 `public/` 아래의 이미지는
라이선스 대상이 아니며 저작권은 xo0449에게 있습니다. 출처를 밝힌 인용은
환영하지만, 글 전체를 복제하거나 재배포하려면 사전에 허락을 받아야 합니다.
