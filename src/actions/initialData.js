export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['col-2', 'col-1', 'col-3'],
      columns: [
        {
          id: 'col-1',
          boardId: 'board-1',
          title: 'Todo',
          cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'col-1',
              title: 'Title card 1',
              cover: null
            },
            {
              id: 'card-2',
              boardId: 'board-2',
              columnId: 'col-2',
              title: 'Title card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-3',
              columnId: 'col-3',
              title: 'Title card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-4',
              columnId: 'col-4',
              title: 'Title card 4',
              cover: null
            },
            {
              id: 'card-5',
              boardId: 'board-5',
              columnId: 'col-5',
              title: 'Title card 5',
              cover: null
            }
          ]
        },
        {
          id: 'col-2',
          boardId: 'board-1',
          title: 'Improgress',
          cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'col-1',
              title: 'Title card 1',
              cover: 'assets/thenq.jpg'
            },
            {
              id: 'card-2',
              boardId: 'board-2',
              columnId: 'col-2',
              title: 'Title card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-3',
              columnId: 'col-3',
              title: 'Title card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-4',
              columnId: 'col-4',
              title: 'Title card 4',
              cover: null
            },
            {
              id: 'card-5',
              boardId: 'board-5',
              columnId: 'col-5',
              title: 'Title card 5',
              cover: null
            }
          ]
        }
      ]
    }
  ]
}
