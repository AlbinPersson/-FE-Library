export interface CreateBook {
  title: string;
  author: string;
  pages: number;
  categoryId: string;
  type: string;
  burrower?: string;
}
