import { http } from "./http";
import { NoteType } from "../type/types";
import noteInterface from "../interfaces/note";

export const getAllNotes = async (
  page: number = 1,
  per_page: number = 6,
  search: string = ""
) => {
  return await http.get<NoteType>(
    `api/note?page=${page}&per_page=${per_page}&search=${encodeURIComponent(
      search
    )}`
  );
};

export const getByIdNote = async (id: number) => {
  return await http.get<noteInterface>(`api/note/${id}`);
};

export const createNote = async (noteData: any) => {
  return await http.post(`api/note`, noteData);
};

export const updateNote = async (
  id: number,
  data: { title: string; text: string }
) => {
  return await http.put(`/api/note/${id}`, data);
};

export const deleteNote = async (id: number) => {
  return await http.delete(`api/note/${id}`);
};
