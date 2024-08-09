export const TODOS: TTodo[] = [
    {
        id: '1',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Go to gym',
        isCompleted: false,
    },
    {
        id: '2',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Go shopping',
        isCompleted: false,
    },
    {
        id: '3',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Buy bread',
        isCompleted: false,
        parentId: '2'
    },
    {
        id: '4',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Buy milk',
        isCompleted: false,
        parentId: '2'
    },
    {
        id: '5',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Watch movie',
        isCompleted: false,
    },
    {
        id: '6',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Do homework',
        isCompleted: false,
    },
    {
        id: '7',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Prepare for next day',
        isCompleted: false,
        parentId: '6'
    },
    {
        id: '8',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Buy some food for tomorrow',
        isCompleted: false,
        parentId: '6'
    },
    {
        id: '9',
        createdAt: '2021-07-01T00:00:00.000Z',
        description: 'Pack up food',
        isCompleted: false,
        parentId: '8'
    },
]