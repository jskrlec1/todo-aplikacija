import React, { Component } from "react";
import { ListGroup, Form } from "react-bootstrap";
import PropTypes from "prop-types";

class Todo1 extends Component {
  render() {
    const { title, tasks, onDelete, onToggleComplete } = this.props;

    return (
        <div style={{ marginBottom: '8px' }}>
        <h2>{title}</h2>
        <ListGroup>
          {tasks.map((task) => (
            <ListGroup.Item
            key={task.id}
            style={{
              backgroundColor: task.completed ? "yellow" : "lightblue",
              marginBottom: "8px",
            }}>
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
          ))}
        </ListGroup>
      </div>
    );
  }
}

Todo1.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default Todo1;
