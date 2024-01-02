import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./Todo.css";

function Todo() {
  const [todo, setTodo] = useState({
    list: "",
  });

  const [newTodo, setNewTodo] = useState([]);
  const [boxeditHeight, setBoxeditHeight] = useState("400px"); // Initial height

  const add = () => {
    if (todo.list === "") {
      return toast.error("empty list cannot be added");
    } else {
      toast.success("list added successfully");
    }
    console.log(todo);
    setNewTodo([...newTodo, todo]);
    setTodo({
      list: "",
    });
  };

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const deleteList = (index) => {
    newTodo.splice(index, 1);
    setNewTodo([...newTodo]);
    toast.success("removed");
  };

  const deleteAll = () => {
    setTodo({ list: "" });
    setNewTodo([]);
    toast.success("list cleared");
  };

  useEffect(() => {
    // Adjust the height dynamically based on the number of list items
    const newHeight = `${100 + newTodo.length * 40}px`; // You can adjust the multiplier and base height as needed
    setBoxeditHeight(newHeight);
  }, [newTodo]);

  return (
    <>
      <div className="container text-warning w-50 m-auto">
        <p className="text-warning">Todo</p>
      </div>

      <div
        className="boxedit"
        style={{
          backgroundImage:  'linear-gradient(to right top, #370506, #3c0507, #410607, #460607, #4b0707)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          maxHeight: '1000px', // Set a maximum height for the boxedit div
          overflowY: 'visible', // Add vertical scrollbar if content exceeds the maximum height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <div className="container w-50 m-auto text-center">
          <div className="row">
            <div className="col-6">
              <textarea
                type="text"
                style={{ width: "100%" }}
                name="list"
                value={todo.list}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-3">
              <button
                className="btn btn-outline btn-warning"
                onClick={() => add()}
              >
                add
              </button>
            </div>
            <div className="col-3">
              <button
                className="btn btn-outline btn-danger"
                onClick={() => deleteAll()}
              >
                delete all
              </button>
            </div>
          </div>
        </div>

        <div className="container w-50 m-auto text-center mt-3">
          <div className="row">
            <div className="col-12 text-center">
              <table className="table table-warning">
                <tbody>
                  {newTodo.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}.</th>
                      <td>{data.list}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          style={{ borderRadius: "50%" }}
                          onClick={() => deleteList(index)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
