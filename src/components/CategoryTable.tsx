import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "services/categoryService";
import { Category } from "types/Category";
import "styles/CategoryTable.css";

function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>();

  async function fetchCategories() {
    const { data: categories } = await getCategories();
    setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-main">
      <div className="category-table">
        <div className="category-table-box">
          {categories?.map((category) => (
            <Link
              key={category._id}
              className="category-row"
              to={`/category/${category._id}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="add-new-category-box">
          <Link className="add-new-category" to={"/category/new"}>
            Add new
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryTable;
