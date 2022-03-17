import http from "services/httpService";
import config from "config.json";
import { CreateCategory } from "types/Category";

const apiEndpoint = `${config.apiBaseUrl}/categories`;

export function getCategories() {
  return http.get(apiEndpoint);
}

export function getCategory(id: string) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function addCategory(item: CreateCategory) {
  return http.post(apiEndpoint, item);
}

export function updateCategory(item: CreateCategory, id: string) {
  return http.put(apiEndpoint + `/${id}`, item);
}

export function deleteCategory(id: string) {
  return http.delete(apiEndpoint + `/${id}`);
}
