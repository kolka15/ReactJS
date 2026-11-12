import { Link } from 'react-router-dom'

import { ActionStateWithReducer } from 'features/react19Examples/ActionStateWithReducer.tsx'
import { FormWithAsyncSave } from 'features/react19Examples/FormWithAsyncSave.tsx'
import { TodoListOptimistic } from 'features/react19Examples/TodoListOptimistic.tsx'
import { ROUTES } from 'shared/config/routes.ts'

import styles from './React19ExamplesPage.module.css'

export const React19ExamplesPage = () => (
  <main className={styles.page}>
    <p>
      <Link to={ROUTES.home}>← На главную</Link>
    </p>
    <h1>Новый React 19</h1>
    <FormWithAsyncSave />
    <TodoListOptimistic />
    <ActionStateWithReducer />
  </main>
)
