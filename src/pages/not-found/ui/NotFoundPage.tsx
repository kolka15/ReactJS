import { Link } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes.ts'

export const NotFoundPage = () => (
  <main>
    <h1>Страница не найдена</h1>

    <p>
      Адрес не совпал ни с одним маршрутом — вернитесь на <Link to={ROUTES.home}>главную</Link>.
    </p>
  </main>
)
