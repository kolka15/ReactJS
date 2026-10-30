export const routes = {
  home: () => import('./pages/home.tsx'),
  about: () => import('./pages/about.tsx'),
}

export type RouteName = keyof typeof routes

export const resolveRoute = (): RouteName => (window.location.hash.slice(1) === 'about' ? 'about' : 'home')
