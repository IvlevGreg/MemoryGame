const form = document.getElementById('form')
const input = document.getElementById('proto-input')
const protoList = document.getElementById('proto-list')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  protoList.innerHTML = ''
  input.classList.remove('is-invalid')
  try {
    const propertyList = createPropertyList(Object.keys(
        Object.getPrototypeOf(window[input.value]).prototype))
        const li = document.createElement('li')
        li.textContent = input.value
        li.classList.add('p-3')
        protoList.append(li)
        li.append(propertyList)
        
      } catch (error) {
        console.log(error);
        input.classList.add('is-invalid')
        return
      }

  getPrototypesChain(window[input.value]).forEach(proto => {
    const li = document.createElement('li')
    li.classList.add('p-3')
    if(proto.name) {
      li.textContent = proto.name 
      const propertyList =  createPropertyList(Object.keys(proto.prototype))
      li.append(propertyList)
    } else {
        li.textContent = proto.constructor.name
      }
      
      protoList.append(li)
    });
  })
  
  function getPrototypesChain(obj) {
    var proto = Object.getPrototypeOf(obj);
    if (null === proto) {
      return [];
    }
    if ('Function' === proto.constructor.name && !proto.name) {
      return getPrototypesChain(proto);
    }

  return [proto].concat(getPrototypesChain(proto));
}

function createPropertyList(arr) {
  const propertyList = document.createElement('ol')
  propertyList.classList.add('row')

  arr.forEach((property) => {
    const propertyElement = document.createElement('li')
    propertyElement.classList.add('col-3')
    const propertyText = document.createElement('div')
    propertyText.classList.add('propery-text')
    propertyText.textContent = property 

    propertyElement.append(propertyText)
    propertyList.append(propertyElement)
  })

  return propertyList
}
