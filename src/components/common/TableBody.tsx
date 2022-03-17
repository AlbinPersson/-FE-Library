import _ from "lodash";
import { LibraryItem } from "types/LibraryItem";
import { Column } from "types/Table";

interface Props {
  data: LibraryItem[];
  columns: Column[];
}

function TableBody({ data, columns }: Props) {
  const renderCell = (item: LibraryItem, column: Column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };

  const createKey = (item: LibraryItem, column: Column) => {
    return item._id + column.path;
  };
  return (
    <div className="library-body">
      {data.map((item) => (
        <div className="library-table-row" key={item._id}>
          {columns.map((column) => (
            <span key={createKey(item, column)}>
              {renderCell(item, column)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableBody;
