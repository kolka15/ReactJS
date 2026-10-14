export const ROUTES = {
  home: '/',
  tasks: '/taskpage',
  register: '/register',
  subscribe: '/subscribe',
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
    code: 'Lesson 04 +2',
    title: 'Бонус: wizard на useActionState',
    summary: 'Два шага, состояния pending / error / success',
    to: 'subscribe',
  },
]
