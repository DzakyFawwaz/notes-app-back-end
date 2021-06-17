import { nanoid } from 'nanoid';
// eslint-disable-next-line import/extensions
import { notes } from './notes.js';

const addNoteListener = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Note gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllNoteHandler = () => ({
  status: 'success',
  data: {
    notes,
  },

});

const getNotesByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'note tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const { title, body, tags } = req.payload;

  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      body,
      tags,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'note berhasil diperbarui',
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'gagal memperbarui notes',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== 1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Note berhasil di hapus',
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'note gagal ditambahkan',
  });
  response.code(404);
  return response;
};

export {
  addNoteListener,
  getAllNoteHandler,
  getNotesByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
