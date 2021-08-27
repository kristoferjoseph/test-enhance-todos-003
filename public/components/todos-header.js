class TodosHeader extends HTMLElement {
  constructor () {
    super()
    const template = document.getElementById('todos-header-template')

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    console.log('TodosHeader mounted')
  }
}

customElements.define('todos-header', TodosHeader)
export default TodosHeader
