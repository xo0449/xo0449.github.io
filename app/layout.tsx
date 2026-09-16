import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Toc from './toc'

export const viewport = { colorScheme: 'light' as const }

export const metadata: Metadata = {
  title: '홍종혁 · 백엔드 개발자',
  description: '커머스 백엔드 개발자. 임베디드와 통신을 거쳐 왔습니다.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="site-header-wrap">
        <header className="site-header">
          <Link href="/">xo0449</Link>
          <nav className="nav-links">
            <Link href="/posts">글</Link>
            <a href="https://xo0449.github.io/backend-lab/">backend-lab</a>
            <a href="/#contact">Contact</a>
            <a href="https://github.com/xo0449">GitHub</a>
          </nav>
        </header>
        </div>
        <div className="shell">
          <main>{children}</main>
          <Toc />
        </div>
      </body>
    </html>
  )
}
