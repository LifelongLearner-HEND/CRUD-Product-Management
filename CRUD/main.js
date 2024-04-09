let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit = document.getElementById('submit');


let mood = 'create';
let temp;
let isValid = false;
// Get total price
function getTotalPrice() {
    if (price.value != '') {
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
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product);
}
else {
    products = [];
}
// create product(CREATE)
sumbit.onclick = function () {
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

    cleanData();
    if (mood == 'create' && isValid == true) {
        // create number of a certain product(COUNT)
        if (product.count > 1) {
            for (let i = 0; i < product.count; i++) {
                products.push(product);
            }
        }
        else {
            products.push(product);
        }
        isValid = false;
    }
    else if(mood == 'create' && isValid == false){
        alert('Please fill all fields');
        displayProduct();
    }
    else if (mood == 'update') {
        products[temp] = product;
        mood = 'create';
        sumbit.innerHTML = 'Submit';
        count.style.display = 'block';
    }

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
    getTotalPrice();
    let table = '';
    for (let i = 0; i < products.length; i++) {
        table = table +
            `<tr>
            <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    // display delete all button if products exist
    let DeleteBtn = document.getElementById('deleteAll');
    if (products.length > 0) {
        DeleteBtn.style.display = 'block';
    }
    else {
        DeleteBtn.style.display = 'none';
    }
}
// always show data
displayProduct();


// delete product(DELETE)
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.product = JSON.stringify(products);
    displayProduct();
}


// Delete all products if exist
function deleteAllProducts() {
    localStorage.removeItem('product');
    products = [];
    displayProduct();
}


// update product
function updateProduct(index) {
    // display product data in input fields
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    category.value = products[index].category;
    getTotalPrice();
    count.style.display = 'none';
    sumbit.innerHTML = 'Update';
    mood = 'update';
    temp = index;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}


// determine search mode
let searchMood = 'title';
function getSearchMood(value) {
    let search = document.getElementById('search');
    if (value == 'searchByTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.focus();
    search.value = '';
    displayProduct();
}

// search product
function search(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < products.length; i++) {
            if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
                table +=
                    `<tr>
                    <td>${i}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
    else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
                table +=
                    `<tr>
                    <td>${i}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
}


// input validation - clean data
function cleanData() {
    if (title.value == '' && price.value == '' && taxes.value == '' && ads.value == '' && total.innerHTML == '' && count.value == '' && category.value == '') {
        isValid = false;
    }
    else {
        isValid = true;
    }
}