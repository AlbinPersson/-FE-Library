import { LibraryItem } from "types/LibraryItem";

export interface Column {
  label: string;
  path: string;
  content?: (libraryItem: LibraryItem) => any;
  filterContent?: (column: Column) => any;
}

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}
