import http from "services/httpService";
import config from "config.json";
import { CreateBook } from "types/Book";
import { CreateMedia } from "types/Media";
import { LibraryItem } from "types/LibraryItem";

const apiEndpoint = `${config.apiBaseUrl}/libraryItems`;

export function getLibraryItems() {
  return http.get<LibraryItem[]>(apiEndpoint);
}

export function getLibraryItem(id: string) {
  return http.get<LibraryItem>(`${apiEndpoint}/${id}`);
}

export function addLibraryItem(item: CreateMedia | CreateBook) {
  return http.post(apiEndpoint, item);
}

export function updateLibraryItem(item: CreateMedia | CreateBook, id: string) {
  return http.put(`${apiEndpoint}/${id}`, item);
}

export function deleteLibraryItem(id: string) {
  return http.delete(`${apiEndpoint}/${id}`);
}
