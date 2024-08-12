import { TTodo } from './types.ts'
import { v4 as uuidv4 } from 'uuid'

export const TODOS: TTodo[] = [
  {
    id: `task-${uuidv4()}`,
    description: 'Go to gym',
    isCompleted: false,
    subtasks: []
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Go shopping',
    isCompleted: false,
    subtasks: [
      {
        id: `task-${uuidv4()}`,
        description: 'Buy bread',
        isCompleted: false,
        subtasks: []
      },
      {
        id: `task-${uuidv4()}`,
        description: 'Buy bread',
        isCompleted: false,
        subtasks: [
          {
            id: `task-${uuidv4()}`,
            description: 'Buy bread',
            isCompleted: false,
            subtasks: []
          },
        ]
      },
      {
        id: `task-${uuidv4()}`,
        description: 'Buy bread',
        isCompleted: false,
        subtasks: []
      },
    ]
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Buy bread',
    isCompleted: false,
    subtasks: []
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Buy milk',
    isCompleted: false,
    subtasks: []
  },
  {
    id: `task-${uuidv4()}`,
    description: 'Watch movie',
    isCompleted: false,
    subtasks: []
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
        subtasks: []
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
            subtasks: []
          },
        ]
      },
    ]
  },
]
