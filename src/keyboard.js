export function keyboard(value) {
  let key = {}
  key.press = undefined

  window.addEventListener('keypress', pressListener)

  function pressListener(event) {
    event.preventDefault()
    if (value === event.code) key.press()
  }

  key.unsubscribe = () => {
    window.removeEventListener('keypress', pressListener)
  }

  return key
}
