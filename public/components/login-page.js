class LoginPage extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {
    console.log('LoginPage mounted')
  }

}

customElements.define('login-page', LoginPage)
