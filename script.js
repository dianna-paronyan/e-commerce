const rightSide = document.querySelector(".right_side");
let count_buyed_products = document.querySelector(".count");
const cart = document.querySelector(".cart_box");
const cart_products = document.querySelector(".items");
const totalPrice = document.querySelector("h4");
const cartIcon = document.querySelector('.cart')

const productData = [
  {
    id: 1,
    image: "images/2956afcacb8bf9ac0cf1baf5deec8e0d.jpg",
    description: "Braclet",
    price: "10000AMD",
    count: 0,
  },
  {
    id: 2,
    image: "images/brooch1.jpg",
    description: "Brooch",
    price: "8000AMD",
    count: 0,
  },
  {
    id: 3,
    image: "images/pendant1.jpg",
    description: "Pendant",
    price: "25000AMD",
    count: 0,
  },
  { 
    id: 4, 
    image: "images/ring7.jpg", 
    description: "Ring", 
    price: "15000AMD" 
  },
  {
    id: 5,
    image: "images/1_Palisade.jpg",
    description: "Braclet",
    price: "15000AMD",
    count: 0,
  },
  {
    id: 6,
    image: "images/ring6.jpg",
    description: "Ring",
    price: "15000AMD",
    count: 0,
  },
  {
    id: 7,
    image: "images/pendant3.jpg",
    description: "Pendant",
    price: "20000AMD",
    count: 0,
  },
  {
    id: 8,
    image: "images/earning1.jpg",
    description: "Earning",
    price: "15000AMD",
    count: 0,
  },
  {
    id: 9,
    image: "images/brooch2.jpg",
    description: "Brooch",
    price: "10000AMD",
    count: 0,
  },
  {
    id: 10,
    image: "images/1_The-world-in-the-palm.jpg",
    description: "Braclet",
    price: "20000AMD",
    count: 0,
  },
];

async function getProducts() {
  return productData;
}
let products = [];

getProducts().then((res) => {
    products.push(res)
    console.log(res);
    res.map((el) => {
        presentCards(el,res);
        cartItems(el.id);
        // if(!localStorage.getItem('cart')){
        //     localStorage.setItem('cart', '[]')
        // }else{
        //   cartItems(el.id);
        // }
    });
});

const count = (data,id) => () => {
  parseInt(count_buyed_products.textContent++);
  count_buyed_products.className = "count_visible";
  addCart(data,id);
  cartItems(id)
};

function presentCards(res, data) {
  const card = document.createElement("div");
  card.className = "card";
  const image = document.createElement("img");
  image.className = "images";
  const textBox = document.createElement("div");
  textBox.className = "text_box";
  const button_add_cart = document.createElement("button");
  button_add_cart.className = "btn_add_cart";
  button_add_cart.textContent = "add to cart";
  const h5 = document.createElement("h5");
  const p = document.createElement("p");
  image.src = res.image;
  h5.textContent = res.description;
  p.textContent = res.price;
  card.appendChild(image);
  textBox.append(h5, p, button_add_cart);
  card.appendChild(textBox);
  rightSide.append(card);

  button_add_cart.addEventListener("click", count(data, res.id));
}

let cartStorage = JSON.parse(localStorage.getItem('cart'));

function addCart(data, id){
    let product =  data?.find((el)=>el.id === id)
    if(cartStorage && cartStorage.length === 0){
        cartStorage?.push(product);
    }
    else{
        let res = cartStorage?.find((el)=>el.id === id);
        if(res === undefined){
           return cartStorage?.push(product)
        }
    }  
    localStorage.setItem('cart', JSON.stringify(cartStorage))
 
    // console.log(data)
}
let total = 0;
function cartItems(id){
    JSON.parse(localStorage.getItem('cart'))?.filter((el)=>{
        if(el.id === id){
          el.count += 1
            console.log(el.count,'count')
            const img = document.createElement('img');
            img.className = 'cart_img';
            img.src = el.image;
            const desc = document.createElement('p');
            desc.textContent = el.description;
            const price = document.createElement('p');
            price.textContent = el.price;
            total += parseInt(el.price);
            cart_products.append(img, desc, price);
        }
    })
    
    totalPrice.textContent = total + ' AMD';
}

// cartItems()
cartIcon.addEventListener('click', ()=> {
    if(cart.className === 'cart_box'){
        cart.className = 'cart_box_visible';
      }else{
        cart.className = 'cart_box'
      
    }
})

// function cart_pr(){
//   JSON.parse(localStorage.getItem('cart')).map((el)=>{
//     // if(el.id === id){
//         const img = document.createElement('img');
//         img.className = 'cart_img';
//         img.src = el.image;
//         const desc = document.createElement('p');
//         desc.textContent = el.description;
//         const price = document.createElement('p');
//         price.textContent = el.price;
//         total += parseInt(el.price);
//         cart_products.append(img, desc, price);
//     // }
// })

// totalPrice.textContent = total + ' AMD';
// }