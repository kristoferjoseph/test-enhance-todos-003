class TodosList extends HTMLElement {
  constructor () {
    super()
    const template = document.getElementById('todos-list-template')
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.update = this.update.bind(this)
    this.list = this.shadowRoot.querySelector('js-list')
  }

  update (todos) {
    const items = todos.map(t => `
    <todo-item
      text="${t.text}"
      ${t.completed ? `completed="${t.completed}"` : ''}
      created="${t.created}"
      key="${t.key}"
    ></todo-item>
  `).join('')
    this.shadowRoot.innerHTML = items
  }

  set todos (value = []) {
    this.update(value)
  }

}

customElements.define('todos-list', TodosList)
export default TodosList
