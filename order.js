const priceData = { 4156326: 56, 4156334: 96, 4156347: 168, bump: 56 };

function populateSummary(data) {
  const { desc, set, price, origPrice, bump, bumpPrice } = data;
  jQuery(".productdesc p:first-child")[0].textContent = desc;
  jQuery(".pack.martopbottom span")[0].textContent =
    "Exclusive Offer - " + set.toString() + " Pack";
  jQuery("p.productprice")[0].textContent = "$" + price.toFixed(2);
  jQuery("p.oldprice span")[0].textContent = "$" + origPrice.toFixed(2);
  jQuery("span.dot p")[0].textContent = set;

  let savings = Math.round(((origPrice - price) / origPrice) * 100).toString();
  jQuery(".holidaymessage b")[1].textContent =
    savings + "% Savings Applied + Free Expedited Shipping";
  jQuery("p.savings")[0].textContent = savings + "% SAVINGS APPLIED";

  const check = document.createElement("img");
  check.src =
    "https://offers.mokita.co/hosted/images/ef/68819914f0482eaccc2af260e0b183/greencheck.png";

  jQuery("p.savings")[0].append(check);

  if (bump) {
    // jQuery("input#bump-offer").prop("checked", true);
    jQuery("input#bump-offer").trigger("click");
  }

  let totals = jQuery(".pull-right.elOrderProductOptinPrice.product-price");
  let totalCost = bump ? price + parseFloat(bumpPrice) : price;

  jQuery('.pull-left:contains("Subtotal") + .pull-right').textContent =
    totalCost.toFixed(2);
  jQuery('.pull-left:contains("Order Total:") + .pull-right').textContent =
    totalCost.toFixed(2);
  // let totalIdx = totals.length - 1;
  // totals[totalIdx - 3].textContent = totalCost.toFixed(2);
  // totals[totalIdx].textContent = totalCost.toFixed(2);
}

function getParamObject(urlStr) {
  const urlParams = new URLSearchParams(urlStr);
  let idArr = urlStr.split("?")[1].split("&")[0];
  let id = idArr.split("=")[1];
  let addon = urlParams.get("addon") === "true";

  if (addon) {
    jQuery("div#serum").show();
  }

  console.log("pid", id);
  let bumpPrice = jQuery(
    ".pull-left.elOrderProductOptinProductName input"
  )[3].getAttribute("data-product-amount");

  let product = {
    desc: "Microsphere Shampoo & Conditioner",
    bump: addon,
    bumpPrice: bumpPrice,
    origPrice: priceData[id],
  };

  jQuery(".pull-left.elOrderProductOptinProductName input").each((i, e) => {
    if (jQuery(e).attr("value") === id) {
      product.price = parseFloat(jQuery(e).attr("data-product-amount"));
      product.set = parseInt(i + 1);
      // jQuery(e).prop("checked", true);
      jQuery(e).trigger("click");
    }
  });

  return product;
}

(function init() {
  setTimeout(function () {
    let data = getParamObject(window.location.href);
    console.log("data", data);
    populateSummary(data);
  });
})();
