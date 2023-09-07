import * as auth from './auth';
import * as note from './note';

export default {
  openapi: '3.0.0',
  servers: [
    {
      url: 'http://localhost:5000/api/v1/',
      description: 'Devlopment server (uses test data)',
      variables: {},
    },
    {
      url: 'http://0.0.0.0/api/v1/',
      description: 'AWS',
      variables: {},
    },
  ],
  info: {
    version: 'v1',
    title: 'Simple API',
    description: 'This api was developed by ahmed ali for Dhari. ',
    termsOfService: '',
    contact: {},
    license: { name: '' },
  },

  tags: [
    {
      name: 'Auth',
      description: 'Everything about authentication and authorization.',
    },
    {
      name: 'Note',
      description: 'Everything about Notes.',
    },
  ],

  paths: {
    '/auth/signin': {
      post: auth.signIn,
    },
    '/auth/signup': {
      post: auth.signup,
    },
    '/auth/refresh-token': {
      post: auth.refreshToken,
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    '/note': {
      get: note.getNotes,
      post: note.create,
    },
    '/note/{note_id}': {
      get: note.getOneNoteByNoteId,
      patch: note.update,
      delete: note.deleteNote,
    },
  },

  components: {
    parameters: {
      Authorization: {
        name: 'Authorization',
        in: 'header',
        required: true,
        style: 'simple',
        schema: {
          type: 'string',
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        description: 'Enter JWT token',
        in: 'header',
      },
    },
  },
  security: [{ ApiKeyAuth: [] }],

  externalDocs: { url: '', description: '' },
  warnings: [],
};
