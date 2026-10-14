import { Link } from 'react-router-dom'

import { SubscribeWizard } from 'features/subscribe/ui/SubscribeWizard.tsx'
import { ROUTES } from 'shared/config/routes.ts'

export const SubscribePage = () => (
  <main>
    <p>
      <Link to={ROUTES.home}>← На главную</Link>
    </p>

    <h1>Подписка на рассылку</h1>

    <SubscribeWizard />
  </main>
)
