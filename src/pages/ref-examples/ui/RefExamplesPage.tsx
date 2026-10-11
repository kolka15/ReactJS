import { Link } from 'react-router-dom'

import { ClickTimer } from 'features/refExamples/ClickTimer.tsx'
import { DebouncedLogger } from 'features/refExamples/DebouncedLogger.tsx'
import { FocusTracker } from 'features/refExamples/FocusTracker.tsx'
import { PreviousInput } from 'features/refExamples/PreviousInput.tsx'
import { ROUTES } from 'shared/config/routes.ts'

export const RefExamplesPage = () => (
  <main>
    <p>
      <Link to={ROUTES.home}>← На главную</Link>
    </p>
    <ClickTimer />
    <PreviousInput />
    <FocusTracker />
    <DebouncedLogger />
  </main>
)
