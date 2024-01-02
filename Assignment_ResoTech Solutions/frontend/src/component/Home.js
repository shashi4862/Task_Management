import React from 'react'
import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

const Home = () => {

    const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [task, settask] = useState("");
  const [taskDisc, settaskDisc] = useState("");
  const [userId, setUserId] = useState("");

  const showTasks = async () => {
    try {
      const { data } = await axios.get("/api/show/tasks");
      console.log(data);
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //add task
  const addtask = async (e) => {
    e.preventDefault();
    try {
      const add = await axios.post("/api/create/list", { task, taskDisc });
      if (add.status === 200) {
        settask("");
        settaskDisc("");
        showTasks();
      }
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete single task
  const deletetask = async (id) => {
    try {
      const taskDelete = await axios.delete(`/api/delete/task/${id}`);
      if (taskDelete.status === 200) {
        showTasks();
      }
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //populate single task in the form
  const showSingleTask = async (id) => {
    setEditMode(true);
    try {
      const { data } = await axios.get(`/api/task/${id}`);
      settask(data.task);
      settaskDisc(data.taskDisc);
      setUserId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  //edit task
  const editTask = async (e) => {
    e.preventDefault();
    try {
      const edit = await axios.put(`/api/update/task/${userId}`, {
        task,
        taskDisc,
      });

      if (edit.status == 200) {
        setEditMode(false);
        settask("");
        settaskDisc("");
        showTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //toggle completed
  const completedTask = async (uid) => {
    try {
      await axios.put(`/api/toggle/${uid}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showTasks();
  }, []);

  return (
    <>
        <Header />
      <div className="container">
        <div
          className="form"
          style={{ paddingBottom: "50px", paddingTop: "50px" }}
        >
          <form onSubmit={editMode ? editTask : addtask}>
            <div
              className="form-wrapper"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ flex: 1, marginRight: "10px" }}>
                <input
                  onChange={(e) => settask(e.target.value)}
                  value={task}
                  className="form-control"
                  type="text"
                  placeholder="Task"
                  name="task"
                ></input>
              </div>
              <div style={{ flex: 1 }}>
                <input
                  onChange={(e) => settaskDisc(e.target.value)}
                  value={taskDisc}
                  className="form-control"
                  type="text"
                  placeholder="Description"
                  name="taskDisc"
                ></input>
              </div>
              {editMode ? (
                <button
                  type="submit"
                  style={{ width: "200px", marginLeft: "10px" }}
                  className="btn btn-primary btncolout"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ width: "200px", marginLeft: "10px" }}
                  className="btn btn-success"
                >
                  + ADD
                </button>
              )}
            </div>
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Description </th>
              <th scope="col">Actions</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((d) => (
                <tr
                  key={d.id}
                  className={d.completed ? `table-success` : `table-danger`}
                >
                  <th scope="row">{d.id}</th>
                  <td>{d.task}</td>
                  <td>{d.taskDisc}</td>
                  <td>
                    <i
                      onClick={() => showSingleTask(d.id)}
                      className="fa-solid fa-pen-to-square"
                      style={{
                        color: "skyBlue",
                        cursor: "pointer",
                        marginRight: "25px",
                      }}
                    >
                      &nbsp; Edit &nbsp; &nbsp;
                    </i>
                    <i
                      onClick={() => deletetask(d.id)}
                      style={{ color: "#ee8e8e", cursor: "pointer" }}
                      className="fa-solid fa-trash-can"
                    >
                      &nbsp;Delete
                    </i>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id="TaskDone"
                      checked={d.completed}
                      option_id="1"
                      onChange={() => completedTask(d.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home