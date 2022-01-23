const allpackages = document.querySelectorAll(".package");
const quantity = document.querySelector(".quantity");
let order = { frequency: 0, package: 0, addon: false };
// let total = document.querySelector("#total-price");
let cartText = document.querySelector(".total-cart");
let discount = document.querySelector("#discount");
const addonText = document.querySelector(".addon-text");
const addonPrice = 15.98;
let savings = document.querySelectorAll(".parens");
let totalPrice;
const addonBtn = document.querySelector(".addon");
const subSavings = document.querySelector("#sub-savings");
const oneSavings = document.querySelector("#one-savings");
const regPrice = document.querySelector(".reg-price");
const packContainer = document.querySelector(".packages-container");
let subscribeChecked = true;

const checkoutBtn = document.querySelector("#checkout");

const subscriptionData = [
  {
    set: 1,
    origPrice: 56,
    price: 39.2,
    savings: "30% + FREE SHIPPING",
    variantId: "32322387607687",
  },
  {
    set: 2,
    origPrice: 112,
    price: 78.4,
    savings: "30% + FREE SHIPPING",
    variantId: "32322387640455",
  },
];

const oneTimeData = [
  {
    set: 1,
    origPrice: 56,
    price: 50.4,
    savings: "10%",
    variantId: "31675032436871",
    discount: "GROW10",
  },
  {
    set: 2,
    origPrice: 96,
    price: 81.6,
    savings: "15%",
    variantId: "31675032469639",
    discount: "GROW15",
  },
  {
    set: 3,
    origPrice: 142,
    price: 113.6,
    savings: "20%",
    variantId: "31675032502407",
    discount: "GROW20",
  },
];

const serum = {
  origPrice: 56,
  price: 22.4,
  savings: "60%",
  variantId: "41460880965784",
};

// const allPrices = [
//   [
//     {
//       discount: 30,
//       price: 45.47,
//       text: "1 Set - Save 30%",
//       originalPrice: 64.95,
//       savings: 19.48,
//       sub: true,
//     },
//     {
//       discount: 35,
//       price: 57.74,
//       text: "2 Sets - Save 35%",
//       originalPrice: 88.83,
//       savings: 31.09,
//       sub: true,
//     },
//   ],
//   [
//     {
//       discount: 0,
//       price: 64.95,
//       text: "1 Set",
//       originalPrice: 64.95,
//       savings: 0,
//       sub: false,
//     },
//     {
//       discount: 10,
//       price: 89.95,
//       text: "2 Sets - Save 10%",
//       originalPrice: 88.83,
//       savings: 8.99,
//       sub: false,
//     },
//     {
//       discount: 20,
//       price: 109.45,
//       text: "3 Sets - Save 20%",
//       originalPrice: 109.45,
//       savings: 27.36,
//       sub: false,
//     },
//   ],
// ];

let selectedProduct = subscriptionData[0];

// let prices = allPrices[0];

// checkoutBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   //   if(order.addon){
//   //     if(order.frequency === 0){

//   //     } else {

//   //     }
//   //   } else{
//   //         if(order.frequency === 0){

//   //     } else {

//   //     }
//   //   }
// });

//create and append subcribe bullets when subscribe is selected
function createSubscribeBullets() {
  const container = document.createElement("div");
  container.classList.add("subBulletContain");

  const flexible = document.createElement("div");

  const flexHead = document.createElement("h5");
  flexHead.innerText = "Flexible subscription plan";

  const flexTest = document.createElement("h5");
  flexTest.classList.add("bullet-text");
  flexTest.innerText = "Change, pause, or skip your delivery";

  flexible.appendChild(flexHead);
  flexible.appendChild(flexTest);

  const easyCancel = document.createElement("div");

  const eCHead = document.createElement("h5");
  eCHead.innerText = "Easy Cancel";

  const eCText = document.createElement("h5");
  eCText.classList.add("bullet-text");
  eCText.innerText = "You can cancel your subscription anytime";

  easyCancel.appendChild(eCHead);
  easyCancel.appendChild(eCText);

  container.appendChild(flexible);
  container.appendChild(easyCancel);

  packContainer.appendChild(container);
}

//create and append the frequency dropdown menu
function createFreqDropdown() {
  const container = document.createElement("div");
  container.classList.add("frequencySelect");

  const heading = document.createElement("h4");
  heading.innerText = "Delivery Frequency";

  //create dropdown menu
  const dropdown = document.createElement("select");
  dropdown.name = "frequency";
  dropdown.id = "frequency";

  const options = ["Monthly (recommended)", "2 Months", "3 Months"];

  for (let val of options) {
    let option = document.createElement("option");
    option.value = val;
    option.text = val;
    dropdown.appendChild(option);
  }

  container.appendChild(heading);
  container.appendChild(dropdown);
  packContainer.appendChild(container);
}

//remove subscribe bullets when one-time is selected
function removeSubcribeBullets() {
  const bulletContainer = document.querySelector(".subBulletContain");
  packContainer.removeChild(bulletContainer);
}

function removeFreqDropdown() {
  const freq = document.querySelector(".frequencySelect");
  packContainer.removeChild(freq);
}

function addPackageListeners() {
  allpackages.forEach((package, i) => {
    package.addEventListener("click", () => {
      // console.log(package.childNodes)
      package.childNodes[1].checked = true;
      uncheckFreq(i);
      package.classList.add("selected-package");
      order.frequency = i;
      // prices = allPrices[i];
      subscribeChecked = !subscribeChecked;
      selectedProduct = subscribeChecked ? subscriptionData[0] : oneTimeData[0];
      refreshProducts(i);
      defaultPrices();
    });
  });
}

function refreshProducts(ind) {
  if (ind === order.frequency) {
    while (quantity.firstChild) {
      quantity.removeChild(quantity.firstChild);
    }
  }
}

//create quantity option components

function createQuantityOption(product) {
  const prod = document.createElement("div");
  prod.classList.add("product");
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://cdn.shopify.com/s/files/1/1847/3469/products/sc.jpg?v=1608115503"
  );
  let setText = document.createElement("p");
  let priceText = document.createElement("p");
  setText.innerText = `${product.set} Set - Save ${product.savings}`;
  priceText.innerText = `$${product.price}`;
  prod.appendChild(img);
  prod.appendChild(setText);
  prod.appendChild(priceText);

  return prod;
}

//display selected types of products

function addProducts() {
  const displayedProducts = subscribeChecked ? subscriptionData : oneTimeData;

  displayedProducts.forEach((product, i) => {
    let prod = createQuantityOption(product);

    if (order.package === i) {
      prod.classList.add("selected-product");
    }

    prod.addEventListener("click", () => {
      // discount.innerText = `${product.discount}% off`;
      totalPrice = order.addon ? product.price + addonPrice : product.price;
      selectedProduct = product;
      uncheck(i);
      order.product = i;
      prod.classList.add("selected-product");
      updateText();
    });
    quantity.appendChild(prod);
  });
}

function uncheck(index) {
  let allSets = document.querySelectorAll(".product");
  allSets.forEach((set, i) => {
    if (index !== i) {
      // set.childNodes[0].checked = false;
      set.classList.remove("selected-product");
    }
  });
}

function uncheckFreq(index) {
  allpackages.forEach((set, i) => {
    if (index !== i) {
      set.childNodes[1].checked = false;
      set.classList.remove("selected-package");
    }
  });
}

//set default prices
function defaultPrices() {
  addProducts();
  const allpackages = document.querySelectorAll(".product");
  const firstNode = allpackages[0];
  // console.log(allpackages.childNodes[0])
  firstNode.childNodes[1].checked = true;
  firstNode.classList.add("selected-product");
  // discount.innerText = `${prices[0].discount}% off`;

  const displayedProducts = subscribeChecked ? subscriptionData : oneTimeData;
  totalPrice = displayedProducts[0].price;
  updateText();

  if (subscribeChecked) {
    createFreqDropdown();
    createSubscribeBullets();
  } else {
    removeFreqDropdown();
    removeSubcribeBullets();
  }
  // total.innerText = totalPrice
  // cartText.innerText = `$${totalPrice}`
  // subSavings.innerText = `(save $${prices[0].savings})`
}

addonBtn.addEventListener("click", (e) => {
  // if(e.target.nodeName = 'DIV'){

  let radio = addonBtn.childNodes[1].childNodes[0];
  radio.checked = !radio.checked;

  if (order.addon) {
    totalPrice -= addonPrice;
    order.addon = false;
    // total.innerText = totalPrice;
    updateText();
    // cartText.innerText = `$${totalPrice}`
    // addonText.style.color='darkslategray'
  } else if (!order.addon) {
    totalPrice += addonPrice;
    updateText();
    // total.innerText = totalPrice
    // cartText.innerText = `$${totalPrice}`
    order.addon = true;
  }
});

function updateText() {
  // total.innerText = `$${totalPrice}`;
  cartText.innerText = `$${totalPrice}`;
  //discount.innerText = `${selectedProduct.discount}% off`;

  if (subscribeChecked) {
    subSavings.innerText = `(save $${selectedProduct.savings})`;

    regPrice.innerText = `$${selectedProduct.price.toFixed(2)} `;
    regPrice.style.color = "sienna";
    let stPrice = document.createElement("SPAN");
    stPrice.innerText = `$${selectedProduct.origPrice.toFixed(2)}`;
    stPrice.style.textDecoration = "line-through";
    stPrice.style.color = "black";
    stPrice.style.fontWeight = "100";
    regPrice.appendChild(stPrice);
  } else {
    regPrice.innerText = "";
    oneSavings.innerText = `(save $${selectedProduct.savings})`;
  }
}

defaultPrices();
addPackageListeners();
