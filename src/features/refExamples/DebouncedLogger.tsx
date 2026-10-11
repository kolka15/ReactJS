import { type ChangeEvent, useEffect, useRef } from 'react'


const DEBOUNCE_DELAY = 1000

export const DebouncedLogger = () => {
  const timerRef = useRef<number | null>(null)

  useEffect(() => () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
    }, [],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }

    const text = event.target.value

    timerRef.current = setTimeout(() => {
      timerRef.current = null
      console.log(`Прошла секунда после последнего символа: "${text}"`)
    }, DEBOUNCE_DELAY)
  }

  return (
    <section>
      <h2>DebouncedLogger</h2>
      <p>
        Идентификатор таймера лежит в <code>useRef</code>: каждый <code>onChange</code> сбрасывает
        предыдущий <code>setTimeout</code>, и лог выходит через секунду после последнего символа.
      </p>
      <p>
        <label htmlFor="debounced-input">Текст</label>{' '}
        <input id="debounced-input" onChange={handleChange} />
      </p>
    </section>
  )
}
