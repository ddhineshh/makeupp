var title = document.createElement("h1")
title.setAttribute("id", "nameOfStore")
title.setAttribute("class", "my-4")
title.innerHTML = "MakeUp Store" //TITLE ELEMENTS

var search = document.createElement("input")
search.setAttribute("class", "col-4 mx-auto my-4")
search.setAttribute("type", "text")
search.setAttribute("placeholder", "Filter by product like... lipstick")
search.setAttribute("id", "highlight") // FILTER BY  NAME

var brand = document.createElement('div')
brand.setAttribute('id', 'brand')
brand.setAttribute('class', 'text-center') //SELECT OPTIONS

var sortBy = document.createElement('div')
sortBy.setAttribute('id', 'sortBy') //FILTER NAME

var container = document.createElement('div')
container.setAttribute('class', 'd-flex justify-content-evenly my-4 flex-wrap')
container.setAttribute('id', 'content') //CONTENT

var content = document.createElement('div')
content.setAttribute('class', 'container-fluid') //APPENDING

content.append(title, search, brand, sortBy, container)
document.body.append(content)

//////////////////////////////////////
//LOAD CONTENT
container.innerHTML = `<h3 class="alert alert-success text-center" role="alert">
    Still Loading.. Please wait for a moment &#128556;
    </h3>`

let data = []


//FOR MULTIPLE USE
let getData = async function getData(link) {
    let response = await fetch(link)
    let resData = await response.json()
    return resData
}


//GETTING DATA
getData("https://makeup-api.herokuapp.com/api/v1/products.json")
    .then((e) => {
        data = e
        if (data.length == 0) {
            container.innerHTML = `<div class="alert alert-danger" role= "alert">No Data Available</div>`
        }
        else if (data) {
            displayProduct(data.slice(0, 100)) //TOTAL PRODUCT AVAILABLE 931.. SLICING OUT ONLY 100.. TAKES MORE TIME TO LOAD
            console.log(data);
        }
    })
    .catch((err) => {
        console.log(err.message);
    })


    //DISPLAYING IN CARD
let displayProduct = function displayProduct(finalData) {
    container.innerHTML = ""
    finalData.map((product) => container.innerHTML +=
        `
    <div class="card mx-3 my-3" style="width: 18rem;">
    <div class="card-header text-center text-white bg-dark">Brand: 
    ${product.brand}</div>
    <img src="${product.api_featured_image}" class="card-img-top border border-secondary">
    <div class="card-body bg-secondary text-white">
        <h3 class="card-title text-center">${product.name}</h3>
        <h4 class="card-title text-center">Price: $${product.price}</h4>
        <a class="card-title text-center" href=${product.product_link}>Buy Now</a>
        <p class="card-title text-center description"><b>Description: </b>${product.description}</p>
    </div>`
    )
}


//DISPLAY CARD BY FILTER
function displayProductWithMarkUp(finalData, userInput) {
    container.innerHTML = ""
    finalData.map((product) => container.innerHTML +=
        `
    <div class="card mx-3 my-3" style="width: 18rem;">
    <div class="card-header text-center text-white bg-dark">Brand: 
    ${product.brand}</div>
    <img src="${product.api_featured_image}" class="card-img-top border border-secondary">
    <div class="card-body bg-secondary text-white">
        <h3 class="card-title text-center">${product.name.toLowerCase().includes(userInput.toLowerCase()) ?
            `<mark style="background-color:yellow">${product.name}</mark> ` : product.name}</h3>
        <h4 class="card-title text-center">Price: $${product.price}</h4>
        <a class="card-title text-center" href=${product.product_link}>Buy Now</a>
        <p class="card-title text-center description"><b>Description: </b>${product.description}</p>
    </div>`
    )
}


//SELECT OPTIONS
brand.innerHTML = `
<input list="type" id="productType" >
<datalist id="type" >
  <option value="blush">
  <option value="bronzer">
  <option value="eyebrow">
  <option value="eyeliner">
  <option value="eyeshadow">
  <option value="foundation">
  <option value="lipstick">
  <option value="lip_liner">
  <option value="mascara">
  <option value="nail_polish">
</datalist>
<button onclick="myFunction()" id="getProductType">Search by type</button>
</form>`

let productType = document.getElementById("productType")

//FILTER BY PRODUCT TYPE
function myFunction() {
    console.log(productType.value);
    getData(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType.value}`)
        .then((e) => {
            data = e
            if (data) {
                //TOTAL PRODUCT AVAILABLE 931.. SLICING OUT ONLY 100.. TAKES MORE TIME TO LOAD
                console.log(data);
                displayProduct(data.slice(0, 100))
            }
        })
        .catch((err) => {
            console.log(err.message);
        })

}

//SECOND FILTER BY NAME
let filterOut = document.querySelector("#highlight")
filterOut.addEventListener("keyup", () => {
    let userInput = filterOut.value
    console.log(userInput)
    let newText = []
    if (userInput !== "") {
        newText = data.filter((product) => {
            return product.name.toLowerCase().includes(userInput.toLowerCase());
        })
        displayProductWithMarkUp(newText, userInput);
    } else {
        alert("please enter valid input")
    }
}
)

