export function insertStyle(style: string, id: string, target?: HTMLElement) {
  const _target = target ?? document.head
  const styleIdKey = 'archive-app-style-id'

  if (_target.querySelector(`[${styleIdKey}=${id}]`)) {
    return
  }

  const styleNode = document.createElement('style')
  styleNode.setAttribute('type', 'text/css')
  styleNode.setAttribute(styleIdKey, id)

  _target.appendChild(styleNode)
  styleNode.innerText = style
}