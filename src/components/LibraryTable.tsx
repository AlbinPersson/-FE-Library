import { Link } from "react-router-dom";
import { LibraryItem, Book } from "types/LibraryItem";
import { Column, SortColumn } from "types/Table";
import TableHeader from "components/common/TableHeader";
import TableBody from "components/common/TableBody";
import AddLibraryItem from "components/AddLibraryItem";
import utils from "utils";
import "styles/TableBody.css";
import "styles/TableHeader.css";

interface Props {
  libraryItems: LibraryItem[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
  onDelete: (id: string) => void;
}

function LibraryTable({ libraryItems, onSort, sortColumn, onDelete }: Props) {
  const columns: Column[] = [
    {
      path: "title",
      label: "Title",
      content: (libraryItem: LibraryItem) => {
        return (
          <span className="library-table-titel-box">
            <Link to={`/${utils.findType(libraryItem)}/${libraryItem._id}`}>
              {libraryItem.title}
              {` (${utils.generateAcronym(libraryItem.title)})`}
            </Link>
            <span className="library-table-author">
              {(libraryItem as Book).author}
            </span>
          </span>
        );
      },
    },
    { path: "category.name", label: "Category" },
    {
      path: "type",
      label: "Type",
      content: (libraryItem: LibraryItem) => {
        return <span> {utils.formatType(libraryItem.type)}</span>;
      },
    },
    {
      path: "borrower",
      label: "Borrower",
      content: (libraryItem: LibraryItem) => (
        <div>
          <div>{libraryItem.borrower}</div>
          <div>{utils.formatDate(libraryItem.borrowDate)}</div>
        </div>
      ),
    },
    {
      path: "delete",
      label: "",
      content: (libraryItem: LibraryItem) => (
        <button
          className="library-item-delete"
          onClick={() => onDelete(libraryItem._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody data={libraryItems} columns={columns} />
      <div className="table-buttons">
        <AddLibraryItem />
        <Link className="add-new-box" to="/categories">
          Categories
        </Link>
      </div>
    </div>
  );
}

export default LibraryTable;
