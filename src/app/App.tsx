import { Provider } from 'react-redux'

import { store } from './store'

import { AppRouter } from './router'

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

export default App
