import { Category } from "types/Category";
import { LibraryItem } from "types/LibraryItem";

export function generateAcronym(string: string) {
  const wordSplit = string.split(" ");
  const acronymParts = wordSplit.map((word) => word[0]);
  return acronymParts.join("").toUpperCase();
}

export function formatType(type: string) {
  if (type === "dvd") return type.toUpperCase();

  const noUnderScore = type.replace("_", " ");
  const finalText = noUnderScore[0].toUpperCase() + noUnderScore.slice(1);

  return finalText;
}

export function formatDate(date?: string) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("sv-SE");
}

export function findType(libraryItem: LibraryItem) {
  let type = "media";
  if (["book", "reference_book"].includes(libraryItem.type)) {
    type = "book";
  }
  return type;
}

export function findCategoryId(categoryId: string, categories: Category[]) {
  for (const c of categories) {
    if (c._id === categoryId) {
      return c._id;
    }
  }
}

export default {
  findCategoryId,
  findType,
  formatDate,
  formatType,
  generateAcronym,
};
