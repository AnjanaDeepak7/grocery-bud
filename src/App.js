import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import List from "./components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      showAlert(true, "danger", "Enter a value");
    } else if (value && isEditing) {
      // handle edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            const myItem = { ...item, title: value };
            return myItem;
          }
          return item;
        })
      );
      setValue("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Item Edited");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: value };
      const newList = [...list, newItem];
      setList(newList);
      setValue("");
      showAlert(true, "success", "item added");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const handleDelete = (id) => {
    const newList = list.filter((eachItem) => eachItem.id !== id);
    setList(newList);
    showAlert(true, "danger", "Item Removed");
  };
  const handleClear = () => {
    setList([]);
    showAlert(true, "danger", "Empty list");
  };
  const handleEdit = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setValue(specificItem.title);
    setIsEditing(true);
    setEditID(id);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <>
      <h1>Grocery Bud</h1>
      <section className="main-container">
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="e.g. eggs"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button type="submit">{isEditing ? "edit" : "submit"}</button>
        </form>
        <List
          list={list}
          setList={setList}
          showAlert={showAlert}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
        {list.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            Clear All
          </button>
        )}
      </section>
    </>
  );
}

export default App;
