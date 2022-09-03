export default function createGoodsList(data, container){
  const ul = document.createElement('ul')
  ul.classList.add('row',)

    data.products.forEach(good => {
      const col = document.createElement('div')
      col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-xl-3', 'mb-5')
      col.style.height = 'auto'

      const li = document.createElement('li')
      li.classList.add('card')
      li.style.height = '100%'

      const image = document.createElement('img')
      image.classList.add('card-img-top')
      image.src = good.image
      image.alt = `picture of the: ${'good.name'}`

      const h3 = document.createElement('h3')
      h3.classList.add('card-text', 'p-2')
      h3.textContent = good.name

      const p = document.createElement('p')
      p.classList.add('card-text', 'text-muted', 'p-2')
      p.textContent = `price: ${good.price}`
      p.style.marginTop = 'auto'

      li.append(image)
      li.append(h3)
      li.append(p)
      col.append(li)
      ul.append(col)
    });
  container.append(ul)
}

