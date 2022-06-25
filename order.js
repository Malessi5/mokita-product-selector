const priceData = { 4156236: 56, 4156334: 96, 4156347: 168, bump: 56 };

function populateSummary(data) {
  const { desc, set, price, origPrice, bump, bumpPrice } = data;
  jQuery(".productdesc p:first-child")[0].textContent = desc;
  jQuery(".pack.martopbottom span")[0].textContent =
    "Exclusive Offer - " + set.toString() + " Pack";
  jQuery("p.productprice")[0].textContent = "$" + price.toFixed(2);
  jQuery("p.oldprice span")[0].textContent = "$" + origPrice.toFixed(2);
  let savings = Math.round(((origPrice - price) / origPrice) * 100);
  jQuery("p.savings")[0].textContent =
    "$" + savings.toString() + "% SAVINGS APPLIED";

  if (!bump) {
    jQuery("div#serum").remove();
  }

  let totals = jQuery(".pull-right.elOrderProductOptinPrice.product-price");
  let totalCost = bump ? price + parseFloat(bumpPrice) : price;
  totals[1].textContent = totalCost.toFixed(2);
  totals[4].textContent = totalCost.toFixed(2);
}

function getParamObject(urlStr) {
  const urlParams = new URLSearchParams(urlStr);
  let idArr = urlStr.split("?")[1].split("&")[0];
  let id = idArr.split("=")[1];
  let addon = urlParams.get("addon") === "true";
  console.log("pid", id);
  let product = {
    desc: "Microsphere Shampoo & Conditioner",
    bump: addon,
    bumpPrice: 0,
    origPrice: priceData[id],
  };

  jQuery(".pull-left.elOrderProductOptinProductName input").each((i, e) => {
    if (jQuery(e).attr("value") === id) {
      product.price = parseFloat(jQuery(e).attr("data-product-amount"));
      product.set = parseInt(i + 1);
      jQuery(e).prop("checked", true);
    }

    if (i === 3 && addon) {
      jQuery(e).prop("checked", true);
      product.bumpPrice = jQuery(e).attr("data-product-amount");
    }
  });

  return product;
}

(function init() {
  setTimeout(function () {
    let data = getParamObject(window.location.href);
    console.log("data", data);
    populateSummary(data);
  }, 500);
})();
