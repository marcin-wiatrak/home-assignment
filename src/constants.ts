import { TMenuItem, TTodo } from './types.ts'
import { v4 as uuidv4 } from 'uuid'
import { BookmarksIcon, HomeIcon, PersonIcon, SearchIcon } from './assets/icons'

export const TODOS: TTodo[] = [
  {
    id: `task-${uuidv4()}`,
    description: 'Go to gym',
    isCompleted: false,
    subtasks: [],
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Go shopping',
    isCompleted: false,
    subtasks: [
      {
        id: `task-${uuidv4()}`,
        description: 'Buy bread1',
        isCompleted: false,
        subtasks: [],
      },
      {
        id: `task-${uuidv4()}`,
        description: 'Buy bread2',
        isCompleted: false,
        subtasks: [
          {
            id: `task-${uuidv4()}`,
            description: 'Buy bread3',
            isCompleted: false,
            subtasks: [],
          },
        ],
      },
      {
        id: `task-${uuidv4()}`,
        description: 'Buy bread4',
        isCompleted: false,
        subtasks: [],
      },
    ],
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Buy bread',
    isCompleted: false,
    subtasks: [],
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Buy milk',
    isCompleted: false,
    subtasks: [],
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Watch movie',
    isCompleted: false,
    subtasks: [],
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Prepare for next day',
    isCompleted: false,
    subtasks: [
      {
        id: `task-${uuidv4()}`,
        description: 'Do homework',
        isCompleted: false,
        subtasks: [],
      },
      {
        id: `task-${uuidv4()}`,
        description: 'Buy some food for tomorrow',
        isCompleted: false,
        subtasks: [
          {
            id: `task-${uuidv4()}`,
            description: 'Pack up food',
            isCompleted: false,
            subtasks: [],
          },
        ],
      },
    ],
  },
]

export const MENU_ITEMS: TMenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: HomeIcon,
  },
  {
    id: 'boards',
    title: 'Boards',
    icon: BookmarksIcon,
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: PersonIcon,
  },
  {
    id: 'search',
    title: 'Search',
    icon: SearchIcon,
  },
]
