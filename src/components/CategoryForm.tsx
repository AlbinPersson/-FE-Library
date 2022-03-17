import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "services/categoryService";

function CategoryForm() {
  const { register, handleSubmit, setValue } = useForm();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  async function fetchCategory() {
    try {
      const { data: category } = await getCategory(id);
      setValue("category", category.name);
    } catch (error) {
      history.push("/category/new");
    }
  }

  useEffect(() => {
    if (id !== "new") {
      fetchCategory();
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const categoryDB = { name: data.category };

    try {
      if (id === "new") await addCategory(categoryDB);
      else await updateCategory(categoryDB, id);

      history.push("/");
    } catch (error) {
      alert("Category name not unique");
    }
  });

  const handleDelete = async () => {
    try {
      await deleteCategory(id);
      history.push("/");
    } catch (error) {
      alert("Cannot be deleted until the reference is removed first");
    }
  };

  return (
    <div className="category-main">
      <form className="category-table" onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <input
          {...register("category", { required: true })}
          placeholder="Category Name"
          id="category"
        />
        <input type="submit" />
      </form>
      {id !== "new" && (
        <button className="category-delete" onClick={() => handleDelete()}>
          Delete Category
        </button>
      )}
    </div>
  );
}
export default CategoryForm;
