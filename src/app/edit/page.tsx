
import { listPages } from '@/services/data/pages'
import { Metadata } from 'next'
import Link from 'next/link'
import styles from './style.module.css'

export const metadata: Metadata = {
  title: 'All pages'
}

export default async function Page() {
  const pages = await listPages()
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>All pages</h1>
      </header>
      <ul className={styles.list}>
        {pages.map((page) => (
          <li key={page.path} className={styles.item}>
            <Link href={`/edit/${page.path}`}>
              <div className={styles.itemTitle}>{page.path}</div>
              <pre className={styles.itemProps}>{JSON.stringify(page.props)}</pre>
            </Link>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export const dynamic = 'force-dynamic'
