import { useEffect, useRef, useState } from 'react'

export const PreviousInput = () => {
  const [value, setValue] = useState('')
  const previousValueRef = useRef('')

  useEffect(() => {
    previousValueRef.current = value
  }, [value])

  // eslint-disable-next-line react-hooks/refs -- по условию задания предыдущее значение показывается в UI именно из ref
  const previousValue = previousValueRef.current

  return (
    <section>
      <h2>PreviousInput</h2>
      <p>
        Предыдущее значение лежит в <code>useRef</code>: <code>useEffect</code> обновляет его после
        отрисовки, поэтому во время рендера в ref ещё хранится прошлое значение.
      </p>
      <label htmlFor="previous-input">Текст</label>
      <p>
        <input
          id="previous-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </p>
      <p>Предыдущее значение: {previousValue === '' ? '—' : previousValue}</p>
    </section>
  )
}
