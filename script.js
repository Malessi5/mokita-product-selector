const allpackages = document.querySelectorAll(".package");
const quantity = document.querySelector(".quantity");
let order = { frequency: 0, product: 0, addon: false };
let cartText = document.querySelector(".total-cart");
let discount = document.querySelector("#discount");
const addonText = document.querySelector(".addon-text");
const addonPrice = 15.98;
let savings = document.querySelectorAll(".parens");
let totalPrice;

const addonBtn = document.querySelector(".addon");
const addonRadio = document.querySelector("#addon-radio");
const subSavings = document.querySelector("#sub-savings");
const oneSavings = document.querySelector("#one-savings");
const regPrice = document.querySelector(".reg-price");
const packContainer = document.querySelector(".packages-container");
let subscribeChecked = true;
const costContainer = document.querySelector("div.cost-info-container");
const costContain = document.querySelector("div.cost-container");
const arrowContain = document.querySelector("div#arrow-container");

const addBtn = document.querySelector("#add-to-cart");

const subscriptionData = [
  {
    set: 1,
    origPrice: 56,
    price: 39.2,
    savings: "30%",
    variantId: "32322387607687",
  },
  {
    set: 2,
    origPrice: 112,
    price: 78.4,
    savings: "30%",
    variantId: "32322387640455",
  },
];

const oneTimeData = [
  {
    id: "4156326",
    set: 1,
    origPrice: 56,
    price: 50.4,
    savings: "10%",
    variantId: "31675032436871",
    discount: "GROW10",
  },
  {
    id: "4156334",
    set: 2,
    origPrice: 96,
    price: 81.6,
    savings: "15%",
    variantId: "31675032469639",
    discount: "GROW15",
  },
  {
    id: "4156347",
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

let selectedProduct = subscriptionData[0];

//create and append subcribe bullets when subscribe is selected
function createSubscribeBullets() {
  const container = document.createElement("div");
  container.classList.add("subBulletContain");

  const flexible = document.createElement("div");
  const flexibleHead = document.createElement("div");
  flexibleHead.classList.add("flex");

  const flexHead = document.createElement("h5");
  flexHead.innerText = "Flexible subscription plan";

  const flexImg = document.createElement("img");
  flexImg.src =
    "https://cdn.shopify.com/s/files/1/0271/6696/5895/files/subscribe.png?v=1646765834";

  const flexTest = document.createElement("h5");
  flexTest.classList.add("bullet-text");
  flexTest.innerText = "Change, pause, or skip your delivery";

  flexibleHead.appendChild(flexImg);
  flexibleHead.appendChild(flexHead);
  flexible.appendChild(flexibleHead);
  flexible.appendChild(flexTest);

  const cancelHead = document.createElement("div");
  cancelHead.classList.add("flex");

  const easyCancel = document.createElement("div");

  const eCHead = document.createElement("h5");
  eCHead.innerText = "Easy Cancel";

  const cancelImg = document.createElement("img");
  cancelImg.src =
    "https://cdn.shopify.com/s/files/1/0271/6696/5895/files/cancel.png?v=1646765834";

  const eCText = document.createElement("h5");
  eCText.classList.add("bullet-text");
  eCText.innerText = "You can cancel your subscription anytime";

  cancelHead.appendChild(cancelImg);
  cancelHead.appendChild(eCHead);
  easyCancel.appendChild(cancelHead);
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

  //terms link

  const link = document.createElement("span");
  link.innerText = "Subscription Terms";
  link.classList.add("sub-terms");
  link.addEventListener("click", showModal);

  container.appendChild(heading);
  container.appendChild(dropdown);
  container.appendChild(link);
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
      if (!package.classList.contains("selected-package")) {
        package.childNodes[1].checked = true;
        uncheckFreq(i);
        package.classList.add("selected-package");
        order.frequency = i;
        order.product = 0;
        subscribeChecked = !subscribeChecked;
        selectedProduct = subscribeChecked
          ? subscriptionData[0]
          : oneTimeData[0];
        refreshProducts(i);
        defaultPrices();
      }
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
  let savingsText = document.createElement("p");
  let priceText = document.createElement("p");

  const savings = addLineBreak(product.savings);

  product.set === 1
    ? (setText.innerText = `${product.set} Set`)
    : (setText.innerText = `${product.set} Sets`);

  savingsText.innerText = ` Save ${savings}`;

  priceText.innerText = `$${product.price.toFixed(2)}`;
  prod.appendChild(img);
  prod.appendChild(setText);
  prod.appendChild(savingsText);
  prod.appendChild(priceText);

  return prod;
}

function addLineBreak(str) {
  let arr = str.split("+");
  if (arr.length > 1) {
    let newStr = arr[0] + " \n" + arr[1];
    return newStr;
  } else {
    return str;
  }
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
      totalPrice = order.addon ? product.price + serum.price : product.price;
      selectedProduct = product;
      uncheck(i);
      prod.classList.add("selected-product");
      order.product = i;
      updateText();
    });
    quantity.appendChild(prod);
  });
}

function uncheck(index) {
  let allSets = document.querySelectorAll(".product");
  allSets.forEach((set, i) => {
    if (index !== i) {
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

  firstNode.childNodes[1].checked = true;
  firstNode.classList.add("selected-product");

  const displayedProducts = subscribeChecked ? subscriptionData : oneTimeData;
  totalPrice = displayedProducts[0].price;
  if (order.addon) {
    totalPrice += serum.price;
  }
  updateText();

  if (subscribeChecked) {
    createFreqDropdown();
    createSubscribeBullets();
  } else {
    removeFreqDropdown();
    removeSubcribeBullets();
  }
}

function addOnButtonListener() {
  addonBtn.addEventListener("click", (e) => {
    if (order.addon) {
      addonRadio.checked = false;
    } else {
      addonRadio.checked = true;
    }

    selectAddOn();
  });
}

function selectAddOn() {
  if (order.addon) {
    totalPrice -= serum.price;
    order.addon = false;
    updateText();
  } else if (!order.addon) {
    totalPrice += serum.price;
    updateText();
    order.addon = true;
  }
}

function createPriceStrikethrough(price) {
  let stPrice = document.createElement("SPAN");
  stPrice.innerText = `$${price.toFixed(2)}`;
  stPrice.style.textDecoration = "line-through";
  stPrice.style.color = "black";
  stPrice.style.fontWeight = "100";
  stPrice.classList.add = "st-price";
  return stPrice;
}

function updateText() {
  cartText.innerText = `$${totalPrice.toFixed(2)}`;

  if (subscribeChecked) {
    removeArrow();
    subSavings.innerText = `(save ${selectedProduct.savings})`;

    regPrice.innerText = `$${selectedProduct.price.toFixed(
      2
    )} + FREE SHIPPING `;
    regPrice.style.color = "sienna";
    let stPrice = createPriceStrikethrough(selectedProduct.origPrice);
    regPrice.appendChild(stPrice);
  } else {
    addArrow();
    const subIdx = selectedProduct.set - 1;

    const oneTime =
      document.querySelector(".one-time") || document.createElement("div");

    oneTime.classList.add("one-time");

    if (subIdx < 2) {
      const subPrice = subscriptionData[subIdx].price.toFixed(2);
      const savings = subscriptionData[subIdx].savings;
      regPrice.innerText = `$${subPrice} `;
      regPrice.style.color = "sienna";
      let stPrice = createPriceStrikethrough(
        subscriptionData[subIdx].origPrice
      );

      regPrice.appendChild(stPrice);
      oneTime.innerText = `You can have the same for only $${subPrice} if you subscribe. That's a savings of ${savings} and you can change or cancel your subscription at any time! 😱`;
    } else {
      regPrice.innerText = "";

      oneTime.innerText =
        "Save 20% today when purchasing 3 sets of Microsphere Shampoo & Conditioner. In general, Mokita customers begin noticing results after they start using their 3rd set of continued use.";
    }

    regPrice.appendChild(oneTime);
    oneSavings.innerText = `(save ${selectedProduct.savings})`;
  }
}

function showModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";

  const span = document.querySelector(".close");

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function addArrow() {
  const isArrow = document.querySelector(".arrow-img");

  if (!isArrow) {
    const arrow = document.createElement("img");
    arrow.setAttribute("class", "arrow-img");
    arrow.src =
      "https://cdn.shopify.com/s/files/1/0271/6696/5895/files/arrow.png?v=1646765834";
    arrowContain.appendChild(arrow);
  }
}

function removeArrow() {
  const isArrow = document.querySelector(".arrow-img");
  if (isArrow) {
    arrowContain.removeChild(isArrow);
  }
}

function addToCartListener() {
  addBtn.addEventListener("click", () => {
    if (!subscribeChecked) {
      let addedProduct = oneTimeData[order.product];
      if (order.addon) {
        // window.location.href = `https://mokita-md.myshopify.com/cart/${addedProduct.variantId}:1,${serum.variantId}:1?discount=${addedProduct.discount}`;
        window.location.href = `https://offers.mokita.co/checkout55083401?pid=${addedProduct.id}&addon=true`;
      } else {
        // window.location.href = `https://mokita-md.myshopify.com/cart/${addedProduct.variantId}:1?discount=${addedProduct.discount}`;
        window.location.href = `https://offers.mokita.co/checkout55083401?pid=${addedProduct.id}&addon=false`;
      }
    } else {
      const frequency = getFrequency();
      addItemToCart(subscriptionData[order.product], frequency);
    }
  });
}

function getFrequency() {
  const freqOption = document.querySelector("#frequency");
  const freq = freqOption.value;
  if (freq[0] === "2" || freq[0] === "3") {
    return parseInt(freq[0]);
  } else {
    return 1;
  }
}

function addItemToCart(product, frequency) {
  items = [
    {
      id: product.variantId,
      quantity: 1,
      properties: {
        shipping_interval_frequency: frequency,
        shipping_interval_unit_type: "months",
      },
    },
  ];

  if (order.addon) {
    items.push({
      id: serum.variantId,
      quantity: 1,
      properties: {
        shipping_interval_frequency: frequency,
        shipping_interval_unit_type: "months",
      },
    });
  }

  let params = createParamString(items);

  redirectToCart(params);
}

function createParamString(items) {
  let addon = items.length > 1;
  let { id, properties, quantity } = items[0];
  let paramStr = `?id=${id}&qty=${quantity}&freq=${properties.shipping_interval_frequency}&addon=${addon}`;

  return paramStr;
}

function redirectToCart(params) {
  window.location.href = "http://mokita.co/pages/token" + params;
  // window.location.href = "token.html" + params;
}

(function init() {
  defaultPrices();
  addPackageListeners();
  addOnButtonListener();
  addToCartListener();
})();
