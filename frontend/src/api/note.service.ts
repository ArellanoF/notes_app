import { http } from "./http";
import { NoteType } from "../type/types";
import noteInterface from "../interfaces/note";
import { BackendSuccessResponse, BackendErrorResponse } from "../interfaces/interface";

const handleApiCall = async <T>(
  apiCall: () => Promise<any>, 
  defaultErrorMessage: string
): Promise<T> => {
  try {
    const response = await apiCall();
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      const backendError: BackendErrorResponse = error.response.data;
      
      let errorMessage = backendError.message || backendError.error || defaultErrorMessage;
      
      if (backendError.errors) {
        const validationErrors = Object.values(backendError.errors).flat();
        errorMessage += `. Errores: ${validationErrors.join(', ')}`;
      }
      
      throw new Error(errorMessage);
    }
    
    console.error(defaultErrorMessage, error);
    throw new Error(error.message || defaultErrorMessage);
  }
};

export const getAllNotes = async (
  page: number = 1,
  per_page: number = 6,
  search: string = ""
) => {
  return handleApiCall<NoteType>(
    () => http.get<NoteType>(
      `api/note?page=${page}&per_page=${per_page}&search=${encodeURIComponent(search)}`
    ),
    "Error getting grades"
  );
};

export const getByIdNote = async (id: number) => {
  return handleApiCall<noteInterface>(
    () => http.get<noteInterface>(`api/note/${id}`),
    `Error getting note with ID ${id}`
  );
};

export const createNote = async (noteData: any) => {
  return handleApiCall<BackendSuccessResponse>(
    () => http.post(`api/note`, noteData),
    "Error creating note"
  );
};

export const updateNote = async (
  id: number,
  data: { title: string; text: string }
) => {
  return handleApiCall<BackendSuccessResponse>(
    () => http.put(`/api/note/${id}`, data),
    `Error updating note with ID ${id}`
  );
};

export const deleteNote = async (id: number) => {
  return handleApiCall<BackendSuccessResponse>(
    () => http.delete(`api/note/${id}`),
    `Error deleting note with ID ${id}`
  );
};