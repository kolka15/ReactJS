import { Link } from 'react-router-dom'

import { LESSON_LINKS, ROUTES } from 'shared/config/routes.ts'

import styles from './HomePage.module.css'

export const HomePage = () => (
  <main className={styles.page}>
    <header className={styles.header}>
      <h1 className={styles.title}>ReactJS</h1>
    </header>

    <ol className={styles.list}>
      {LESSON_LINKS.map((lesson) => (
        <li className={styles.item} key={lesson.code}>
          <Link className={styles.link} to={ROUTES[lesson.to]}>
            <span className={styles.code}>{lesson.code}</span>

            <span className={styles.body}>
              <span className={styles.itemTitle}>{lesson.title}</span>
              <span className={styles.summary}>{lesson.summary}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  </main>
)
