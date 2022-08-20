const cssPromices = {}

function loadResource(src) {

  //css
  if (src.endsWith('.js')) {
    return import(src)
  }
  //js
  if (src.endsWith('.css') && !cssPromices[src]) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = src
    cssPromices[src] = new Promise(resolve => {
      link.addEventListener('load', () => resolve())
    })
    document.head.append(link)
    return cssPromices[src]
  }
  //Данные сервера
  return fetch(src).then(res => res.json())
}

export default loadResource