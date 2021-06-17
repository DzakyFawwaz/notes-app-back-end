/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions

import {
  addNoteListener,
  deleteNoteByIdHandler,
  editNoteByIdHandler,
  getAllNoteHandler,
  getNotesByIdHandler,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteListener,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

// eslint-disable-next-line import/prefer-default-export
export { routes };
