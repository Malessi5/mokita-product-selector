function createObjectFromParams(urlStr) {
  const urlParams = new URLSearchParams(urlStr);
  let id = urlParams.get("id");
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

function sendPostReq(items) {
  jQuery.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: { items: items },
    dataType: "json",
    success: function () {
      window.location.href = "/cart";
    },
  });
}

(function init() {
  const data = createObjectFromParams(window.location.href);
  sendPostReq(data);
})();
