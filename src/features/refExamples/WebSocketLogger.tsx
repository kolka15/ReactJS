import { useEffect, useRef } from 'react'

const SOCKET_URL = 'wss://echo.websocket.events'

const SOCKET_STATES = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']

export const WebSocketLogger = () => {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL)
    socketRef.current = socket

    socket.onopen = () => console.log('[WebSocketLogger] Соединение открыто')
    socket.onmessage = (event) => console.log('[WebSocketLogger] Входящее сообщение:', event.data)
    socket.onerror = () => console.log('[WebSocketLogger] Ошибка соединения')
    socket.onclose = (event) =>
      console.log('[WebSocketLogger] Соединение закрыто:', event.code, event.reason || 'без причины')

    return () => {
      socketRef.current?.close()
      socketRef.current = null
    }
  }, [])

  const sendTestMessage = () => {
    const socket = socketRef.current

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log(
        '[WebSocketLogger] Соединение не готово к отправке, состояние:',
        socket ? SOCKET_STATES[socket.readyState] : 'нет сокета',
      )
      return
    }

    socket.send('тестовое сообщение из WebSocketLogger')
  }

  return (
    <section>
      <h2>WebSocketLogger</h2>
      <p>
        Соединение создаётся один раз при монтировании и лежит в <code>useRef</code>, а{' '}
        <code>useEffect</code> закрывает его при размонтировании — перерисовок у компонента нет.
      </p>
      <p>
        <button type="button" onClick={sendTestMessage}>
          Отправить тестовое сообщение
        </button>
      </p>
    </section>
  )
}
