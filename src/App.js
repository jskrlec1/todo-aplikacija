
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Todo from "./Components/todo";
import "./App.css"; 

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const getFilteredTasks = () => {
    switch (currentFilter) {
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  return (
    <Container
      className="mt-5 border border-danger p-4"
      style={{ backgroundColor: "chartreuse" }}
    >
      <Row>
        <Col className="text-center">
          <h1>Moji zadaci</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskInput">
              <Form.Control
                type="text"
                placeholder="Novi zadatak"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ textAlign: "center" }}
              />
            </Form.Group>
            <br />
            <Button id="dodajButton" variant="primary" type="submit">
              Dodaj
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <Button
            className="custom-button"
            variant="primary"
            onClick={() => setCurrentFilter("All")}
            style={{
              marginBottom: "8px",
              marginRight: "8px",
            }}
          >
            Svi zadaci
          </Button>
          <Button
            className="custom-button"
            variant="primary"
            onClick={() => setCurrentFilter("Active")}
            style={{
              marginBottom: "8px",
              marginRight: "8px",
            }}
          >
            Aktivni zadaci
          </Button>
          <Button
            className="custom-button"
            variant="primary"
            onClick={() => setCurrentFilter("Completed")}
          >
            Završeni zadaci
          </Button>
          <Button
            className="custom-button"
            variant="danger"
            id="deleteButton"
            onClick={deleteCompletedTasks}
          >
            Izbriši završene zadatke
          </Button>
        </Col>
      </Row>
      {getFilteredTasks().map((task) => (
        <Todo
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      ))}
    </Container>
  );
}

export default App;
