import { useRef } from 'react'

interface ClickData {
  startTime: number | null
  clickCount: number
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  })

  const handleClick = () => {
    const clickData = clickDataRef.current
    const now = Date.now()

    if (clickData.startTime === null) {
      clickData.startTime = now
      clickData.clickCount = 1
      console.log('[ClickTimer] Первый клик зафиксирован')
      return
    }

    clickData.clickCount += 1

    console.log(
      `[ClickTimer] Клик №${clickData.clickCount}: прошло ${now - clickData.startTime} мс с момента первого клика`,
    )
  }

  return (
    <section>
      <h2>ClickTimer</h2>
      <p>
        Время первого клика и счётчик кликов хранятся в <code>useRef</code>. Их обновление не
        вызывает перерисовку компонента, поэтому результат виден только в консоли.
      </p>
      <button type="button" onClick={handleClick}>
        Сделать клик
      </button>
    </section>
  )
}
