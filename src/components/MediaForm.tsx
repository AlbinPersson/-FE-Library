import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { getCategories } from "services/categoryService";
import {
  addLibraryItem,
  getLibraryItem,
  updateLibraryItem,
} from "services/libraryService";
import { Category } from "types/Category";
import { Media, MediaType } from "types/LibraryItem";

interface FormData {
  title: string;
  runTimeMinutes: number;
  categoryId: string;
  type: MediaType;
  borrower?: string;
}

function MediaForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  async function fetchCategories() {
    const { data } = await getCategories();
    setCategories(data);
  }

  async function fetchLibraryItem() {
    try {
      const { data } = await getLibraryItem(id);
      const libraryItem = mapToViewModel(data as Media);

      reset(libraryItem);
    } catch (error) {
      history.push("/media/new");
    }
  }

  const mapToViewModel = (data: Media): FormData => {
    return {
      categoryId: data.category._id,
      title: data.title,
      runTimeMinutes: data.runTimeMinutes,
      borrower: data.borrower,
      type: data.type as MediaType,
    };
  };

  useEffect(() => {
    fetchCategories();
    if (id !== "new") {
      fetchLibraryItem();
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!data.borrower) delete data.borrower;

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

        <label htmlFor="runTimeMinutes">Run time minutes</label>
        <input
          id="runTimeMinutes"
          type="number"
          {...register("runTimeMinutes", { required: true })}
          placeholder="Run time minutes"
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
          <option value={"dvd"}>{"DVD"}</option>
          <option value={"audio_book"}>{"Audio Book"}</option>
        </select>

        {id !== "new" && (
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
export default MediaForm;
