import { useState } from "react";
import { Link } from "react-router-dom";
import "styles/TableAddButton.css";

function AddLibraryItem() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="add-new-box" onClick={() => setOpen(!isOpen)}>
      {!isOpen && <div className="open-buttom">Add new LibraryItem</div>}
      {isOpen && (
        <div className="add-row">
          <span className="add-item">
            <i
              onClick={() => setOpen(!isOpen)}
              className="fas fa-caret-left"
            ></i>
          </span>
          <Link className="add-item" to={`/media/new`}>
            Media
          </Link>
          <Link className="add-item" to={`/book/new`}>
            Book
          </Link>
        </div>
      )}
    </div>
  );
}

export default AddLibraryItem;
