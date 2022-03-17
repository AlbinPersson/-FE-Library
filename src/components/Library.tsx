import _ from "lodash";
import { useEffect, useState } from "react";
import { deleteLibraryItem, getLibraryItems } from "services/libraryService";
import { LibraryItem } from "types/LibraryItem";
import { SortColumn } from "types/Table";
import LibraryTable from "components/LibraryTable";
import "styles/Table.css";

function Library() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "category.name",
    order: "asc",
  });

  useEffect(() => {
    fetchLibraryItems();
    const sortColumn = sessionStorage.getItem("sortColumn");
    if (sortColumn) setSortColumn(JSON.parse(sortColumn));
  }, []);

  async function fetchLibraryItems() {
    const { data: libraryItems } = await getLibraryItems();
    setLibraryItems(libraryItems);
  }

  const handleSort = (sortColumn: SortColumn) => {
    setSortColumn({ ...sortColumn });
    sessionStorage.setItem("sortColumn", JSON.stringify(sortColumn));
  };

  const handleDelete = async (id: string) => {
    const filterdLibraryItems = libraryItems?.filter(
      (libraryItem) => libraryItem._id !== id
    );
    setLibraryItems(filterdLibraryItems);
    await deleteLibraryItem(id);
  };

  const sorted = _.orderBy(libraryItems, [sortColumn.path], [sortColumn.order]);

  return (
    <div className="main">
      <LibraryTable
        onDelete={handleDelete}
        libraryItems={sorted}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
    </div>
  );
}

export default Library;
