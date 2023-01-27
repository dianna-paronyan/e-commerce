const rightSide = document.querySelector('.right_side')
let count_buyed_products = document.querySelector('.count')
const cart = document.querySelector('.cart_box')
const cart_products = document.querySelector('.items')
const totalPrice = document.querySelector('h4')
const cartIcon = document.querySelector('.cart')
const date = document.querySelector('.date')

const productData = [
  {
    id: 1,
    image: 'images/2956afcacb8bf9ac0cf1baf5deec8e0d.jpg',
    description: 'Imagination | Bracelet',
    price: '20000AMD',
  },
  {
    id: 2,
    image: 'images/brooch2.jpg',
    description: 'White and Black | Brooch',
    price:'15000'
  },
  {
    id: 3,
    image: 'images/pendant1.jpg',
    description: 'Beehive | Pendant',
    price: '25000AMD',
  },
  {
    id: 4,
    image: 'images/ring7.jpg',
    description: 'Chrysanthemum | Ring',
    price: '18000AMD',
  },
  {
    id: 5,
    image: 'images/1_Palisade.jpg',
    description: 'Palisade | Bracelet',
    price: '35000AMD',
  },
  {
    id: 6,
    image: 'images/ring6.jpg',
    description: 'Constellation | Ring',
    price: '20000AMD',
  },
  {
    id: 7,
    image: 'images/pendant3.jpg',
    description: 'Nocturne | Pendant',
    price: '20000AMD',
  },
  {
    id: 8,
    image: 'images/earning1.jpg',
    description: 'Frozen music | Earrings',
    price: '15000AMD',
  },
  {
    id: 9,
    image:'images/1_Armenian-medieval-loom.webp',
    description: 'Armenian medieval | Earrings',
    price: '25000AMD',
  },
  {
    id: 10,
    image: 'images/1_The-world-in-the-palm.jpg',
    description: 'The world in the palm | Bracelet',
    price: '30000AMD',
  },
]

async function getProducts() {
  return productData
}

getProducts().then((res) => {
  // console.log(res);
  res.map((el) => {
    presentCards(el, res)
    if (localStorage.getItem('cart')) {
      cartItems(el.id)
    }
  })
})

const count = (data, id) => () => {
  parseInt(count_buyed_products.textContent++)
  count_buyed_products.className = 'count_visible'
  addCart(data, id)
}

// show data

function presentCards(res, data) {
  const card = document.createElement('div')
  card.className = 'card'
  const image = document.createElement('img')
  image.className = 'images'
  const textBox = document.createElement('div')
  textBox.className = 'text_box'
  const button_add_cart = document.createElement('button')
  button_add_cart.className = 'btn_add_cart'
  button_add_cart.textContent = 'add to cart'
  const h4 = document.createElement('h4')
  const p = document.createElement('p')
  image.src = res.image
  h4.textContent = res.description
  p.textContent = res.price
  card.appendChild(image)
  textBox.append(h4, p, button_add_cart)
  card.appendChild(textBox)
  rightSide.append(card)
  console.log(res, 'res')
  button_add_cart.addEventListener('click', count(data, res.id))
}

// add items in localstorage

let cartStorage = JSON.parse(localStorage.getItem('cart')) || []

function addCart(data, id) {
  let product = data.find((el) => el.id === id)
  cartStorage.push(product)

  localStorage.setItem('cart', JSON.stringify(cartStorage))
}

// show items in cart

let total = 0
function cartItems(id) {
  // console.log(id)
  JSON.parse(localStorage.getItem('cart'))?.filter((el) => {
    if (el.id === id) {
      console.log(el, 'el')
      const del_btn_div = document.createElement('div')
      const btn_del = document.createElement('button')
      const img = document.createElement('img')
      img.className = 'cart_img'
      img.src = el.image
      const desc = document.createElement('p')
      desc.textContent = el.description
      const price = document.createElement('p')
      price.textContent = el.price
      btn_del.textContent = 'Delete'
      btn_del.className = 'del_btn'
      total += parseInt(el.price)
      del_btn_div.append(btn_del)
      cart_products.append(img, desc, price, del_btn_div)

      btn_del.addEventListener('click', delete_cart_item(id))
    }
  })

  totalPrice.textContent = total + ' AMD'
}

const delete_cart_item = (id) => () => {
  let data = cartStorage.filter((el) => el.id !== id)
  localStorage.setItem('cart', JSON.stringify(data))
}

//  featured

const box = document.querySelector('.bottom')
const img_sm = document.querySelector('.img')
const img_featured = document.querySelectorAll('.img_featured')

window.onload = () => {
  generateRandomCards(productData)
}

function generateRandomCards(arr) {
  const r = Math.floor(Math.random() * arr.length)
  const image = document.createElement('img')
  image.className = 'img_sm'
  image.src = arr[r].image
  const desc = document.createElement('p')
  desc.textContent = arr[r].description
  const price = document.createElement('p')
  price.textContent = arr[r].price
  box.append(image, desc, price)
}

//  date

date.textContent = new Date().getFullYear()

// modal window inplementation

let modal = document.getElementById('myModal')

let span = document.querySelector('.close')

cartIcon.onclick = function () {
  modal.style.display = 'block'
}
span.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (e) {
  console.log(e)
  if (e.target === modal) {
    modal.style.display = 'none'
  }
}
