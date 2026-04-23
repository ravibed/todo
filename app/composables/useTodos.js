export const useTodos = () => {
  const todos = ref([])
  const filter = ref('all')

  const addTodo = (text) => {
    if (!text.trim()) return
    todos.value.unshift({
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    })
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter(t => !t.completed)
  }

  const filteredTodos = computed(() => {
    if (filter.value === 'active') return todos.value.filter(t => !t.completed)
    if (filter.value === 'completed') return todos.value.filter(t => t.completed)
    return todos.value
  })

  const stats = computed(() => ({
    total: todos.value.length,
    active: todos.value.filter(t => !t.completed).length,
    completed: todos.value.filter(t => t.completed).length
  }))

  return {
    todos,
    filter,
    filteredTodos,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  }
}