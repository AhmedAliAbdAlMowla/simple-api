export const getNotes = {
  summary: 'get Notes',
  operationId: 'get Notes',
  parameters: [
    {
      name: 'pageNumber',
      in: 'query',
      required: true,
      style: 'form',
      schema: { type: 'number' },
    },
    {
      name: 'pageSize',
      in: 'query',
      required: true,
      style: 'form',
      schema: { type: 'number' },
    },
  ],
  responses: { 200: { description: '', headers: {} } },
  tags: ['Note'],
};

export const create = {
  summary: 'create new note',
  description: 'you can use this end point to create new note. ',
  responses: { 200: { description: '', headers: {} } },
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
        example: {
          title: 'test',
          excerpt: 'this note explain how to create web page using plpla.',
        },
      },
    },
  },
  tags: ['Note'],
};

export const update = {
  summary: 'update note ',
  description: 'you can use this end point to update note. ',
  parameters: [
    {
      name: 'note_id',
      in: 'path',
      required: true,
      style: 'form',
      schema: { type: 'string' },
    },
  ],
  responses: { 200: { description: '', headers: {} } },
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
        example: {
          title: 'test',
          excerpt: 'this note should updated.',
        },
      },
    },
  },
  tags: ['Note'],
};

export const getOneNoteByNoteId = {
  summary: 'get one note by notet_id ',
  description: 'you can use this end point to get one note by noteId',
  parameters: [
    {
      name: 'note_id',
      in: 'path',
      required: true,
      style: 'form',
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    200: {
      description: '',
      headers: {},
    },
  },
  tags: ['Note'],
};
export const deleteNote = {
  summary: 'delete note.',
  description: 'you can use this end point to delete note.',
  parameters: [
    {
      name: 'note_id',
      in: 'path',
      required: true,
      style: 'form',
      schema: { type: 'string' },
    },
  ],
  responses: { 200: { description: '', headers: {} } },
  tags: ['Note'],
};
