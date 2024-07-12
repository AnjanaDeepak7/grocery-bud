import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const List = ({ list, handleDelete, handleEdit }) => {
  return (
    <section>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article className="item-container" key={id}>
            <p className="item">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => handleEdit(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(id)}>
                <FaTrashAlt />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
