function createObjectFromParams(urlStr) {
  const paramStr = urlStr.split("?")[1];
  let idParam = paramStr.split("&")[0];
  let id = idParam.split("=")[1];
  const urlParams = new URLSearchParams(paramStr);
  let qty = parseInt(urlParams.get("qty"));
  let freq = parseInt(urlParams.get("freq"));
  let addon = urlParams.get("addon");
  let products = [];

  let product = {
    id: id,
    properties: {
      shipping_interval_frequency: freq,
      shipping_interval_unit_type: "months",
    },
    quantity: qty,
  };

  products.push(product);

  if (addon === "true") {
    let serum = {
      id: "41460880965784",
      properties: {
        shipping_interval_frequency: freq,
        shipping_interval_unit_type: "months",
      },
      quantity: qty,
    };

    products.push(serum);
  }
  return products;
}

function sendPostReq(items, checkoutUrl) {
  jQuery.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: { items: items },
    dataType: "json",
    success: function () {
      window.location.href = checkoutUrl;
    },
  });
}

function reChargeProcessCart() {
  function get_cookie(name) {
    return (document.cookie.match("(^|; )" + name + "=([^;]*)") || 0)[2];
  }

  let token;
  let foundToken = false;
  let count = 0;

  let cookieCheck = setInterval(() => {
    token = get_cookie("cart");
    count++;
    if (token || count >= 5) {
      foundToken = true;
      console.log("onion token =", token);
      clearInterval(cookieCheck);
    }
  }, 1000);

  if (!foundToken) {
    token = getCartToken();
  }

  return generateCheckoutLink(token);
}

function generateCheckoutLink(token) {
  try {
    var ga_linker = ga.getAll()[0].get("linkerParam");
  } catch (err) {
    var ga_linker = "";
  }
  let checkout_url =
    "https://checkout.rechargeapps.com/r/checkout?myshopify_domain=mokita-md.myshopify.com&cart_token=" +
    token +
    "&" +
    ga_linker;

  return checkout_url;
}

function getCartToken() {
  fetch("/cart.js")
    .then(function (res) {
      return res.json();
    })
    .then(function (cart) {
      console.log("bidge token =", cart.token);
      return cart.token;
    });
}

(function init() {
  const checkoutUrl = reChargeProcessCart();
  const data = createObjectFromParams(window.location.href);

  if (data && checkoutUrl) {
    sendPostReq(data, checkoutUrl);
  }
})();
