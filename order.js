const priceData = { 4156236: 56, 4156334: 96, 4156347: 168 };

function populateSummary(data) {
  const { desc, set, price, origPrice, bump, bumpPrice } = data;
  jQuery(".productdesc p:first-child").text(desc);
  jQuery(".pack.martopbottom span").text(`Exclusive Offer - ${set} Pack`);
  jQuery("p.productprice").text(price);
  jQuery("p.oldprice").text(origPrice);
  let savings = Math.round(((price - origPrice) / origPrice) * 100);
  jQuery("p.savings").text(`${savings}% SAVINGS APPLIED`);

  let totals = jQuery(".pull-right.elOrderProductOptinPrice.product-price");
  let totalCost = bump ? price + bumpPrice : price;
  totals[1].textContent = totalCost.toFixed(2);
  totals[4].textContent = totalCost.toFixed(2);
  //index 1 and 4
}

function getParamObject(urlStr) {
  const urlParams = new URLSearchParams(urlStr);
  let id = urlParams.get("pid");
  let addon = urlParams.get("addon");

  let product = {
    desc: "Microsphere Shampoo & Conditioner",
    bump: addon,
    bumpPrice: 0,
    origPrice: `$${priceData[id].toFixed(2).toString()}`,
  };

  jQuery(".pull-left.elOrderProductOptinProductName input").each((i, e) => {
    if (jQuery(e).attr("value") === id) {
      product.price = jQuery(e).attr("data-product-amount");
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
  let data = getParamObject(window.location.href);
  populateSummary(data);
})();
