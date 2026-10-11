import { useRef, type FocusEvent } from 'react'

interface FocusData {
  transitionCount: number
}

const fieldTitle = (target: EventTarget) =>
  target instanceof HTMLElement ? (target.dataset.field ?? target.id) : 'неизвестный элемент'

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)
  const focusDataRef = useRef<FocusData>({ transitionCount: 0 })

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    // relatedTarget пуст при первом фокусе — такой фокус переходом не считается.
    if (!(event.relatedTarget instanceof HTMLElement)) return

    focusDataRef.current.transitionCount += 1

    console.log(
      `[FocusTracker] Переход фокуса №${focusDataRef.current.transitionCount}: ${fieldTitle(event.relatedTarget)} → ${event.target.dataset.field}`,
    )
  }

  const focusFirst = () => firstInputRef.current?.focus()

  return (
    <section>
      <h2>FocusTracker</h2>
      <p>
        Ссылки на поля и счётчик переходов лежат в <code>useRef</code>: фокус ставится через{' '}
        <code>focus()</code>, а счётчик обновляется без перерисовки и выводится только в консоль.
      </p>
      <p>
        <label htmlFor="focus-first">Первое поле</label>{' '}
        <input
          id="focus-first"
          data-field="первое поле"
          ref={firstInputRef}
          onFocus={handleFocus}
        />
      </p>
      <p>
        <label htmlFor="focus-second">Второе поле</label>{' '}
        <input
          id="focus-second"
          data-field="второе поле"
          ref={secondInputRef}
          onFocus={handleFocus}
        />
      </p>
      <p>
        <button type="button" data-field="кнопка" onClick={focusFirst}>
          Сфокусировать на первом
        </button>
      </p>
    </section>
  )
}
