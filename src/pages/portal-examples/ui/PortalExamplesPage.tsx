import { Link } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes.ts'

export const PortalExamplesPage = () => (
  <main>
    <p>
      <Link to={ROUTES.home}>← На главную</Link>
    </p>
    <h1>React.Portal</h1>

  </main>
)
