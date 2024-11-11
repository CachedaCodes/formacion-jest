export default function toggleCompletion(id) {
    const todo = this.todos.find(todo => todo.id === id)
    todo.completed = !todo.completed
  }