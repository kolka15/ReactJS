import { Provider } from 'react-redux'

import { AuthProvider } from 'features/authRouting/model/AuthContext.tsx'

import { store } from './store'

import { AppRouter } from './router'

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </Provider>
)

export default App
