import "./App.css";
import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Todo from "./Components/todo";
import Todo1 from "./Components/todo1";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

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

  return (
    <Container className="mt-5 border border-danger p-4" style={{ backgroundColor: 'chartreuse' }}>
      <Row>
        <Col className="text-center">
          <h1>Moji zadaci</h1>
          <Form>
          <Form.Group controlId="taskInput">
  <Form.Control
    type="text"
    placeholder="Novi zadatak"
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
  />
</Form.Group>

            <br />
            <Button variant="primary" onClick={addTask}>
              Dodaj
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
      <Col style={{ marginBottom: '8px', marginRight: '8px' }}>
          <Todo
            title="Svi zadaci"
            tasks={tasks}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </Col>
        <Col style={{ marginBottom: '8px', marginRight: '8px' }}>
          <Todo1
            title="Aktivni zadaci"
            tasks={tasks.filter((task) => !task.completed)}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </Col>
        <Col style={{ marginBottom: '8px', marginRight: '8px' }}>
          <Todo1
            title="Završeni zadaci"
            tasks={tasks.filter((task) => task.completed)}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
          <Button
            variant="danger"
            className="mt-3"
            onClick={deleteCompletedTasks}
          >
            Izbriši završene zadatke
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
