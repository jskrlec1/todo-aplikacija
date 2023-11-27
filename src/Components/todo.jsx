import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import PropTypes from "prop-types";

function Todo({ task, onDelete, onToggleComplete }) {
  return (
    <ListGroup>
      <ListGroup.Item
        key={task.id}
        style={{
          backgroundColor: task.completed ? "yellow" : "lightblue",
          marginBottom: "8px",
        }}
      >
        <Form.Check
          type="checkbox"
          id={`task-${task.id}`}
          label={task.text}
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <span
          className="ml-2"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text}
        </span>
        <span className="float-right" onClick={() => onDelete(task.id)}>
          &#x2716;
        </span>
      </ListGroup.Item>
    </ListGroup>
  );
}

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default Todo;
