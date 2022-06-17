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

function sendPostReq(items, token) {
  jQuery.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: { items: items },
    dataType: "json",
    success: function () {
      window.location.href =
        "https://checkout.rechargeapps.com/r/checkout?myshopify_domain=mokita-md.myshopify.com&cart_token=" +
        token;
    },
  });
}

function getCartToken(data) {
  fetch("/cart.js")
    .then(function (res) {
      return res.json();
    })
    .then(function (cart) {
      sendPostReq(data, cart.token);
    });
}

(function init() {
  const data = createObjectFromParams(window.location.href);
  getCartToken(data);
})();
