import { Column, SortColumn } from "types/Table";

interface Props {
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
  columns: Column[];
}

function TableHeader({ columns, sortColumn, onSort }: Props) {
  const raiseSort = (path: string) => {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = (column: Column) => {
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-caret-up" />;
    return <i className="fas fa-caret-down" />;
  };

  return (
    <div className="header-Row">
      {columns.map((column) => (
        <span
          className="header-item"
          style={column.path ? { cursor: "pointer" } : { cursor: "default" }}
          key={column.path}
          onClick={column.path ? () => raiseSort(column.path) : () => {}}
        >
          {column.label} {renderSortIcon(column)}
        </span>
      ))}
    </div>
  );
}

export default TableHeader;
