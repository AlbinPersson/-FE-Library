import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { getCategories } from "services/categoryService";
import {
  addLibraryItem,
  getLibraryItem,
  updateLibraryItem,
} from "services/libraryService";
import { Category } from "types/Category";
import { Book, BookType } from "types/LibraryItem";
import "styles/LibraryItemForm.css";

interface FormData {
  title: string;
  author: string;
  pages: number;
  categoryId: string;
  type: BookType;
  borrower?: string;
}

function BookForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  async function fetchCategories() {
    const { data } = await getCategories();
    setCategories(data);
  }

  async function fetchLibraryItem() {
    try {
      const { data } = await getLibraryItem(id);
      const libraryItem = mapToViewModel(data as Book);

      reset(libraryItem);
    } catch (error) {
      history.push("/book/new");
    }
  }

  const mapToViewModel = (data: Book): FormData => {
    return {
      author: data.author,
      categoryId: data.category._id,
      pages: data.pages,
      title: data.title,
      borrower: data.borrower,
      type: data.type as BookType,
    };
  };

  useEffect(() => {
    fetchCategories();
    if (id !== "new") {
      fetchLibraryItem();
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (data.type === BookType.REFERENCE_BOOK || !data.borrower)
      delete data.borrower;

    if (id === "new") await addLibraryItem(data);
    else await updateLibraryItem(data, id);

    history.push("/");
  });

  return (
    <div className="form-main">
      <form className="form-box" onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          id="title"
        />

        <label htmlFor="author">Author</label>
        <input
          {...register("author", { required: true })}
          placeholder="Author"
          id="author"
        />

        <label htmlFor="pages">Pages</label>
        <input
          type="number"
          {...register("pages", { required: true })}
          placeholder="Pages"
          id="pages"
        />

        <label htmlFor="category">Category</label>
        <select {...register("categoryId", { required: true })} id="category">
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="type">Type</label>
        <select {...register("type", { required: true })} id="type">
          <option value={"reference_book"}>{"Reference Book"}</option>
          <option value={"book"}>{"Book"}</option>
        </select>

        {watch("type") === BookType.BOOK && id !== "new" && (
          <>
            <label htmlFor="borrower">Borrower</label>
            <input
              {...register("borrower")}
              placeholder="Borrower"
              id="borrower"
            />
          </>
        )}

        <input type="submit" />
      </form>
    </div>
  );
}

export default BookForm;
