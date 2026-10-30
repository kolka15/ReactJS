export const ROUTES = {
  home: '/',
  tasks: '/taskpage',
  register: '/register',
  subscribe: '/subscribe',
  refExamples: '/ref-examples',
  public: '/public',
  login: '/login',
  signUp: '/sign-up',
  profile: '/profile',
} as const

export type RouteKey = keyof typeof ROUTES

export interface LessonLink {
  code: string
  title: string
  summary: string
  to: Exclude<RouteKey, 'home'>
}

export const LESSON_LINKS: LessonLink[] = [
  {
    code: 'Lesson 01',
    title: 'Архитектура React-приложений',
    summary: 'FSD-структура, сущность Task, список задач',
    to: 'tasks',
  },
  {
    code: 'Lesson 02',
    title: 'Оптимизация производительности',
    summary: 'React.memo, useMemo, useCallback',
    to: 'tasks',
  },
  {
    code: 'Lesson 03',
    title: 'Advanced Redux и асинхронность',
    summary: 'RTK Query, useTasks, локальное удаление',
    to: 'tasks',
  },
  {
    code: 'Lesson 04',
    title: 'Управление формами',
    summary: 'React Hook Form, zod, useFieldArray',
    to: 'register',
  },
  {
    code: 'Lesson 04 bonus',
    title: 'Бонус: wizard на useActionState',
    summary: 'Два шага, состояния pending / error / success',
    to: 'subscribe',
  },
  {
    code: 'Lesson 05',
    title: 'Работа с useRef в React',
    summary: 'useRef вместо useState, замеры без перерисовок',
    to: 'refExamples',
  },
  {
    code: 'Lesson 06',
    title: 'Работа с защищёнными маршрутами',
    summary: 'Outlet, AuthContext, useAuth, PublicPage и ProtectedRoute',
    to: 'public',
  },
]
