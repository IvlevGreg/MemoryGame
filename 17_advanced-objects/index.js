const form = document.getElementById('form')
const input = document.getElementById('proto-input')
const protoList = document.getElementById('proto-list')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  protoList.innerHTML = ''

  getPrototypesChain(window[input.value]).forEach(proto => {
    const li = document.createElement('li')

    if(proto.constructor) {
    li.textContent = proto.constructor.name} else {
      li.textContent = proto
    }

    protoList.append(li)
  });
})

function getPrototypesChain(obj) {
  var proto = Object.getPrototypeOf(obj);
  if (null === proto) {
      return [];
  }

  return [proto].concat(getPrototypesChain(proto));
}

// function createLiElement(parent, text){
//   const li = document.createElement('li')
//   li.textContent = 
//   // li.

// }

// console.log(getPrototypesChain({}));