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
    success: function (output, status, xhr) {
      let newToken = xhr.getResponseHeader("x-shopify-generated-cart-token");

      if (newToken) {
        window.location.href = generateCheckoutLink(newToken);
      } else {
        window.location.href = checkoutUrl;
      }
    },
  });
}

function getCookieFromToken() {
  function get_cookie(name) {
    return (document.cookie.match("(^|; )" + name + "=([^;]*)") || 0)[2];
  }

  let token = "";
  let count = 0;

  while (!token && count < 10) {
    token = get_cookie("cart");
    count++;
  }
  return token;
}

async function getCartToken(data) {
  fetch("/cart.js")
    .then(function (res) {
      return res.json();
    })
    .then(function (cart) {
      document.cookie = `cart=${cart.token}`;

      let cartLink = generateCheckoutLink(cart.token);
      sendPostReq(data, cartLink);

      return cart.token;
    })
    .catch(function (e) {
      console.error("No cart token found", e);
    });
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

async function getToken(data) {
  let cookieToken = getCookieFromToken();

  if (cookieToken) {
    let cookieLink = generateCheckoutLink(cookieToken);
    sendPostReq(data, cookieLink);
    return;
  } else {
    getCartToken(data);
  }
}

(async function init() {
  const data = createObjectFromParams(window.location.href);
  await getToken(data);
})();
