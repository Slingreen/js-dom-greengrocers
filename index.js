const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const createStore = (item) =>
{
    return `<li class="product" data-product-name="${item.id}">
    <div class="store--item-icon">
      <img src="assets/icons/${item.id}.svg" alt="${item.name}" />
    </div>
    <button class = "prd--btn">Add to cart</button>
  </li>`
}

const createCart = (item) =>
{
    return `<li class = "cart--items" data-product-name="${item.id}">
    <img
      class="cart--item-icon"
      src="assets/icons/${item.id}.svg"
      alt="${item.name}"
    />
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  </li>`
}

const createEntireStore = (store) =>
{
    return store.map(p => createStore(p))
}

const createEntireCart = (cart) =>
{
    return cart.map(p => createCart(p))
}

document.getElementsByClassName('item-list store--item-list')[0].innerHTML = createEntireStore(state.items).join("")

// Event listener for toggling artworks
const productElements = document.querySelectorAll('.product');
let cartElements = document.querySelectorAll('.cart--items');

productElements.forEach(productElement => {
  const button = productElement.querySelector('.prd--btn');
  // console.log(button)
    
    // when select button is clicked
    button.addEventListener('click', () => {
      const productName = productElement.getAttribute("data-product-name")
      if(state.cart.some(p => p.id === productName)){
        state.cart.find(p => p.id === productName).quantity++
      }else{
        state.cart.push(state.items.find(p => p.id === productName)) 
        state.cart.find(p => p.id === productName).quantity = 1
      }
      document.getElementsByClassName('item-list cart--item-list')[0].innerHTML = createEntireCart(state.cart).join("")
      cartElements = document.querySelectorAll('.cart--items');
      additonalButtons()
      renderTotal()   
    });
  });
  
  
  function additonalButtons(){
    cartElements.forEach(cartElement => {
      const addButton = cartElement.querySelector('.quantity-btn.add-btn.center');
      const amount = cartElement.querySelector('.quantity-text.center');
      const removeButton = cartElement.querySelector('.quantity-btn.remove-btn.center');
      const productName = cartElement.getAttribute("data-product-name")
      
      addButton.addEventListener('click', () => {
        if(state.cart.some(p => p.id === productName)){
          state.cart.find(p => p.id === productName).quantity++
          amount.textContent = state.cart.find(p => p.id === productName).quantity
          renderTotal()
        }
      })
      
      removeButton.addEventListener('click', () => {
        if(state.cart.some(p => p.id === productName)){
          state.cart.find(p => p.id === productName).quantity--
          amount.textContent = state.cart.find(p => p.id === productName).quantity
          renderTotal()
          console.log(state.cart.find(p => p.id === productName).quantity)
          if (state.cart.find(p => p.id === productName).quantity < 1) {
            console.log("time to remove")
            state.cart.splice(state.cart.indexOf(state.cart.find(p => p.id === productName)), 1)
            document.getElementsByClassName('item-list cart--item-list')[0].innerHTML = createEntireCart(state.cart).join("")
            cartElements = document.querySelectorAll('.cart--items');
            additonalButtons()
          }
        }
      })
    })
}

function renderTotal(){
  const totalElement = document.querySelector('.total-number')
  let total = 0;
  state.cart.forEach(item => {
    total += item.price * item.quantity
  })
  totalElement.textContent = "£"+total.toFixed(2)
}