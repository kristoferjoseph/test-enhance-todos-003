export default function TodoItem (state = {}, html) {
  const {
    completed = false,
    created = '',
    key = '',
    text = ''
  } = state
  return html`
<li>
  <form
    class="js-update"
    action="/todos/${key}"
    method="POST"
    >
    <label for="completed">
    <input
      class="js-completed"
      type="checkbox"
      name="completed"
      ${completed ? 'checked="checked"' : ''}
      >
    </label>
    <label for="text">
    <input
      class="js-text"
      name="text"
      placeholder="${text}"
      type="text"
      value="${text}"
      >
    </label>
      <input
        class="js-key"
        type="hidden"
        name="key"
        value="${key}"
        >
      <input
        class="js-created"
        type="hidden"
        name="created"
        value="${created}"
        >
  </form>
  <form
    class="js-destroy"
    action="/todos/delete"
    method="POST"
    >
    <input
      class="js-key"
      type="hidden"
      name="key"
      value="${key}"
      >
    <button>🗑</button>
  </form>
</li>
`
}
