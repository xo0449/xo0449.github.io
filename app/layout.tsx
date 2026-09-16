import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Toc from './toc'

export const metadata: Metadata = {
  title: 'xo0449',
  description: '백엔드 개발자의 기록',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link href="/">xo0449</Link>
          <nav className="nav-links">
            <a href="https://xo0449.github.io/backend-lab/">backend-lab</a>
            <a href="https://github.com/xo0449">GitHub</a>
          </nav>
        </header>
        <div className="shell">
          <main>{children}</main>
          <Toc />
        </div>
      </body>
    </html>
  )
}
