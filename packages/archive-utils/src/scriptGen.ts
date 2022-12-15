export function genObjectScript(obj: Record<string, any>, modifiers?: Record<string, string>): string {
  const temp = { ...obj }
  const modifierKeys = Object.keys(modifiers ?? {})

  modifierKeys.forEach(key => {
    delete temp[key]
  })

  try {
    const jsonStr = JSON.stringify(temp)

    if (!modifierKeys.length) {
      return jsonStr
    }

    const innerJsonStr = jsonStr.slice(1, -1)
    return `{${innerJsonStr}${innerJsonStr ? ',' : ''}${modifierKeys.map(key => `${key}: ${modifiers![key]}`)}}`
  } catch (err) {
    // TODO log
    return '{}'
  }
}
