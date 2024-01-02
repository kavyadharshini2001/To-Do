import React, { useState } from "react";
import toast from "react-hot-toast";
import "./Todo.css";
import jsPDF from "jspdf";
function Todo() {
  const [todo, setTodo] = useState({
    list: "",
  });

  const [newTodo, setNewTodo] = useState([]);

  const add = () => {
    if (todo.list === "") {
      return toast.error("Empty list cannot be added");
    } else {
      toast.success("List Added Successfully");
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
  console.log(todo);

  const deleteList = (index) => {
    newTodo.splice(index, 1);
    setNewTodo([...newTodo]);
    toast.success("Removed");
  };
  const deleteAll = () => {
    setTodo({ list: "" });
    setNewTodo([]);
    toast.success("list cleared");
  };
  const downloadlist = () => {
    const doc = new jsPDF();

    doc.text("", 20, 10);

    newTodo.forEach((item, index) => {
      const yposition = 20 + index * 10;

      doc.text(`${index + 1}. ${item.list}`, 20, yposition);
    });

    doc.save("list.pdf");
  };

  return (
    <>
      <div className="container w-50 m-auto col-sm-4 col-md-6 col-lg-12">
        <p className="texteedit fw-semibold text-capitalize fs-3 p-5 ">
          Todo list
        </p>
      </div>

      <div className="container w-50 m-auto text-center ">
        <div className="row">
          <div className="col-6">
            <input
              typeof="text"
              style={{ width: "80%",height:"50px" }}
              name="list"
              value={todo.list}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-3">
            <button className="btn btn-sm btnedit" onClick={() => add()}>
              Add
            </button>
          </div>
          <div className="col-3">
            <button className="btn btn-sm btnedit " onClick={() => deleteAll()}>
              Delete All
            </button>
          </div>
        </div>
      </div>
      <div className="container w-50 m-auto text-center p-5">
        <div className="row">
          <div className="col-12 text-center">
            <table class="table table-warning">
              <tbody>
                {newTodo.map((data, index) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{index + 1}.</th>
                        <td>{data.list}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger text-black"
                            style={{ borderRadius: "50%" }}
                            onClick={() => deleteList(index)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=" w-50 m-auto text-end">
        <button className="btn btn-info" onClick={() => downloadlist()}>
          Download
        </button>
      </div>
    </>
  );
}

export default Todo;
