import logging from '../../utils/logging';

export default function addTodo(newTodo) {
    this.todos.push({
        id: this.todos.length + 1,
        text: newTodo,
        completed: false
      })
      logging.logString(`New ToDo: ${newTodo}`);
}