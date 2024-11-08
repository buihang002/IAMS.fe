import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const DailyReportPage = () => {
  const [reports, setReports] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [questions, setQuestions] = useState("");
  const [editReportId, setEditReportId] = useState(null);
  const [editTodos, setEditTodos] = useState([]);
  const [editYesterdayTodos, setEditYesterdayTodos] = useState([]);
  const [editQuestions, setEditQuestions] = useState("");

  useEffect(() => {
    const storedReports = localStorage.getItem("dailyReports");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyReports", JSON.stringify(reports));
  }, [reports]);

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      setTodos([...todos, { text: todoInput, completed: false }]);
      setTodoInput("");
    }
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleCreateReport = () => {
    const previousReport = reports[0];
    const yesterdayTodos = previousReport ? previousReport.todos : [];

    const newReport = {
      id: reports.length + 1,
      dateTime: dayjs().format("YYYY-MM-DD HH:mm"),
      createdAt: dayjs(),
      yesterdayTodos,
      todos,
      questions,
    };

    setReports([newReport, ...reports]);
    setTodos([]);
    setQuestions("");
  };

  const handleEditReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    const canEdit = dayjs().diff(dayjs(report.createdAt), "minute") <= 15;
    if (canEdit) {
      setEditReportId(reportId);
      setEditYesterdayTodos(report.yesterdayTodos);
      setEditTodos(report.todos);
      setEditQuestions(report.questions);
    } else {
      alert("You can only edit a report within 15 minutes of its creation.");
    }
  };

  const handleSaveEdit = () => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === editReportId
          ? {
              ...report,
              yesterdayTodos: editYesterdayTodos,
              todos: editTodos,
              questions: editQuestions,
            }
          : report
      )
    );
    setEditReportId(null);
  };

  const handleToggleEditTodo = (index, setEditFunc, todos) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setEditFunc(updatedTodos);
  };

  return (
    <div className="min-h-screen  p-6 mt-11">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Daily Report</h1>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">Create Daily Report</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-2">To-Do List</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                placeholder="Add a new task..."
                className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddTodo}
                className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul>
              {todos.map((todo, index) => (
                <li key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(index)}
                    className="mr-2"
                  />
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Questions</label>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="Enter any questions or notes..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleCreateReport}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Create Daily Report
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Reports</h2>
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                {editReportId === report.id ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">
                        Date: {report.dateTime}
                      </h3>
                      <span className="text-sm text-gray-500">
                        Report ID: {report.id}
                      </span>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Yesterday's Work:</h4>
                      <ul>
                        {editYesterdayTodos.map((todo, index) => (
                          <li key={index} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() =>
                                handleToggleEditTodo(
                                  index,
                                  setEditYesterdayTodos,
                                  editYesterdayTodos
                                )
                              }
                              className="mr-2"
                            />
                            <span
                              className={
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }
                            >
                              {todo.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Today's To-Do List:</h4>
                      <ul>
                        {editTodos.map((todo, index) => (
                          <li key={index} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() =>
                                handleToggleEditTodo(
                                  index,
                                  setEditTodos,
                                  editTodos
                                )
                              }
                              className="mr-2"
                            />
                            <span
                              className={
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }
                            >
                              {todo.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Questions:</h4>
                      <textarea
                        value={editQuestions}
                        onChange={(e) => setEditQuestions(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={handleSaveEdit}
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">
                        Date: {report.dateTime}
                      </h3>
                      <span className="text-sm text-gray-500">
                        Report ID: {report.id}
                      </span>
                      <button
                        onClick={() => handleEditReport(report.id)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Yesterday's Work:</h4>
                      <ul>
                        {report.yesterdayTodos.map((todo, index) => (
                          <li key={index} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              className="mr-2"
                              disabled
                            />
                            <span
                              className={
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }
                            >
                              {todo.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Today's To-Do List:</h4>
                      <ul>
                        {report.todos.map((todo, index) => (
                          <li key={index} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              className="mr-2"
                              disabled
                            />
                            <span
                              className={
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }
                            >
                              {todo.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Questions:</h4>
                      <p>{report.questions}</p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No reports available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReportPage;
