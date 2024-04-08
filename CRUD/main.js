let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit = document.getElementById('submit');


// Get total price
function getTotalPrice() {
    if(price.value != '') {
        let getTotalPrice = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = getTotalPrice;
        total.style.background = '#059c6e';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#92222';
    }
}


// save in loacal storage
let products;
if(localStorage.product != null) {
    products = JSON.parse(localStorage.product);
}
else {
    products = [];
}
// create product(CREATE)
sumbit.onclick = function() {
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    products.push(product);
    localStorage.setItem('product', JSON.stringify(products));
    console.log(product);
    clearData();
    displayProduct();
}


// clear input fields
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// display product(READ)
function displayProduct() {
    
}























// create number of products(COUNT)
// delete product
// update product
// search product
// input validation / clean data