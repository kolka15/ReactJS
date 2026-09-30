import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <main>
    <h1>Страница не найдена</h1>

    <p>
      Адрес не совпал ни с одним маршрутом — вернитесь на <Link to="/">главную</Link>.
    </p>
  </main>
)
