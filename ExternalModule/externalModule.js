module.exports = function changeOver(prods, ele) {
  let change = prods.replace(/{%image%}/g, ele.image);
  change = change.replace(/{%productName%}/g, ele.productName);
  change = change.replace(/{%quantity%}/g, ele.quantity);
  change = change.replace(/{%price%}/g, ele.price);
  change = change.replace(/{%id%}/g, ele.id);

  change = change.replace(/{%from%}/g, ele.from);
  change = change.replace(/{%nutrients%}/g, ele.nutrients);
  change = change.replace(/{%description%}/g, ele.description);
  if (!ele.organic) change = change.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return change;
};
