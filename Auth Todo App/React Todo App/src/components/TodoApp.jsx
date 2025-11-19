import React, { useEffect, useState } from "react";
import styles from "./TodoApp.module.css";
import ButtonCmp from "./ButtonCmp";
import TextField from "./TextField";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
const TodoApp = () => {
  // Input Feilds
  const [todoValue, setTodoValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");

  const [todos, setTodos] = useState([]);
  // console.log("todos", todos);
  const addTodo = async () => {
    // console.log("todoValue", todoValue);
    try {
      if (todoValue.length < 3) {
        alert("invalid value");
        return;
      }
      // todos.unshift(todoValue);
      // setTodos([...todos]);

      // setTodoValue("");

      const res = await addDoc(collection(db, "todos"), {
        value: todoValue,
        createAt: new Date(),
      });
      setTodoValue("");

      console.log("res", res);
      fetchData();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const deleteAll = async () => {
    // console.log("deleteAll");
    // setTodos([]);

    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const array = [];

      querySnapshot.forEach((todo) => {
        const docRef = doc(db, "todos", todo.id);
        array.push(deleteDoc(docRef));
      });

      await Promise.all(array);
      alert("All todos deleted");
      setTodos([]);
      await fetchData();
    } catch (error) {
      console.error("Error deleting documents: ", error.message);
    }
  };

  const deleteTodo = async (id) => {
    // console.log("deleteTodo", indexNumber);
    // todos.splice(indexNumber, 1);
    // setTodos([...todos]);

    console.log("id", id);

    await deleteDoc(doc(db, "todos", id));
    fetchData();
  };

  const [editIndexNumber, setEditIndexNumber] = useState(null);
  const editHandler = (id) => {
    setEditIndexNumber(id);
  };

  console.log("editIndexNumber", editIndexNumber);

  // const saveHandler = (indexNumber) => {
  //   console.log("editInputValue", editInputValue);
  //   todos.splice(indexNumber, 1, editInputValue);
  //   setTodos([...todos]);
  //   setEditIndexNumber(null);

  // };

  const saveHandler = async (id) => {
    try {
      const docRef = doc(db, "todos", id); // reference to Firestore doc
      await updateDoc(docRef, { value: editInputValue }); // update value
      setEditIndexNumber(null); // exit edit mode
      setEditInputValue(""); // clear input
      await fetchData(); // refresh todos from Firestore
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "todos"));
      // console.log("Response", querySnapShot);

      const tempArr = [];
      querySnapShot.forEach((doc) => {
        console.log("Data", doc.data(), doc.id);

        tempArr.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      console.log("tempArr", tempArr);
      setTodos(tempArr);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>Todo App</h1>
      {/* header */}
      <div className={styles.header}>
        <TextField
          placeholder="Enter todos..."
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
        />

        <ButtonCmp title="Add Todo" onClick={addTodo} />
        <ButtonCmp title={"Delete All"} onClick={deleteAll} />
      </div>

      {/* listing */}
      <div>
        <ul className={styles.list}>
          {todos.map((obj) => {
            console.log("value", obj);
            return editIndexNumber === obj.id ? (
              <div key={obj.id}>
                <TextField
                  placeholder="Edit Value..."
                  onChange={(e) => setEditInputValue(e.target.value)}
                  value={editInputValue}
                />
                <ButtonCmp title={"Save"} onClick={() => saveHandler(obj.id)} />
                <ButtonCmp
                  title={"Cancel"}
                  onClick={() => setEditIndexNumber(null)}
                />
              </div>
            ) : (
              <li key={obj.id}>
                {obj.value}
                <div>
                  <ButtonCmp onClick={() => editHandler(obj.id)} title="Edit" />
                  <ButtonCmp
                    title="Delete"
                    onClick={() => deleteTodo(obj.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
