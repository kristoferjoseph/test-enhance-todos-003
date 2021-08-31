import API from '/data/api.js'

class TodosPage extends HTMLElement {
  constructor () {
    super()
    this.api = API()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
    this.form = this.querySelector('.js-form')
    this.textInput = this.querySelector('.js-text-input')
    this.activeTodosList = this.querySelector('.js-active-todos')
    this.completedTodosList = this.querySelector('.js-completed-todos')
    this.form.addEventListener('submit', this.handleSubmit)
  }

  connectedCallback () {
    this.api.list()
    this.api.subscribe(this.update, [ 'todos' ])
    if (this.isConnected) {
      this.textInput.focus()
    }
  }

  disconnectedCallback () {
    this.api.unsubscribe(this.update)
  }

  update ({ todos }) {
    const activeTodos = todos.filter(t => !t.completed)
    const completedTodos = todos.filter(t => t.completed)
    this.activeTodosList.todos = activeTodos
    this.completedTodosList.todos = completedTodos
    if (this.isConnected) {
      this.textInput.focus()
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    try {
      this.api.create(
        JSON.stringify(
          Object.fromEntries(
            new FormData(this.form)
          )
        )
      )
      this.textInput.value = ''
    }
    catch (err) {
      console.error(err)
    }
  }
}

customElements.define('todos-page', TodosPage)
