export default function TodosPage(state = {}, html) {
  const todos = state.todos || [];
  const todoItem = (todo) =>
    html`
<todo-item ...${todo}></todo-item>
  `;
  const activeTodos = todos
    .filter((t) => !t.completed)
    .map((t) => todoItem(t))
    .join("");

  const completedTodos = todos
    .filter((t) => t.completed)
    .map((t) => todoItem(t))
    .join("");

  return html`
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>">
<!-- HACK: this tells enhance to include the todo-item template -->
<todo-item style="display:none"></todo-item>
<div class="middle">
  <todos-header></todos-header>

  <form
   class="js-form"
   action="/todos"
   method="POST"
  >
    <input
     class="js-text-input"
     autofocus
     name="text"
     type="text"
     placeholder="Enter your todo"
    >
  </form>

  <todos-list class='js-active-todos'>
    ${activeTodos}
  </todos-list>

  <h3>Completed</h3>
  <todos-list class='js-completed-todos'>
    ${completedTodos}
  </todos-list>
</div>
`
}
