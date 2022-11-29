let data = []
let container = document.querySelector("#content")//CARD CONTENT


//ASYNC AWAIT FOR FUTURE PURPOSE
const getData = async (link) => {
    let response = await fetch(link)
    // ,{mode:"no-cors"}
    let resData = await response.json()
    return resData
}


//CONTENT LOADING MESSAGE
container.innerHTML = `<h3 class="alert alert-success text-center" role="alert">
    Still Loading.. Please wait for a moment &#128556;
    </h3>`

//HIGHLIGHTING WORDS IN INPUT TAG
let sortProduct = document.getElementById("sortBy")
sortProduct.innerHTML=`<input type="text" class="m-3" id="highlight" placeholder="Search for product">
<button onClick="search(id)" id="button">Find</button>`


//FETCHING URL IN JSON FORMAT
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



//DISPLAY PRODUCT IN CARDS
const displayProduct = (finalData) => {
    container.innerHTML = ""
    finalData.map((product) => container.innerHTML +=
        `
    <div class="card mx-3 my-3" style="width: 18rem;">
    <div class="card-header text-center text-white bg-dark">Brand: 
    ${product.brand.toUpperCase()}</div>
    <img src="${product.api_featured_image}" class="card-img-top border border-secondary">
    <div class="card-body bg-secondary text-white">
        <h3 class="card-title text-center">${product.name}</h3>
        <h4 class="card-title text-center">Price: $${product.price}</h4>
        <a class="card-title text-center" href=${product.product_link}>Buy Now</a>
        <p class="card-title text-center description"><b>Description: </b>${product.description}</p>
    </div>`
    )
}



//FILTER BY PRODUCT
document.querySelector("#input").addEventListener("input", (event) => {
    let finalData = data.filter((product) => product.product_type.toLowerCase().startsWith(event.target.value.toLowerCase()))

    if (finalData.length == 0) {
        container.innerHTML = `<div class="alert alert-danger" role="alert">Product Not Found :( </div>`
    }
    else {
        displayProduct(finalData)
    }
})


//OPTION MENU FOR PRODUCT TYPE
let dropBrand = document.getElementById("brand")
dropBrand.innerHTML = `<form>
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
<input type="submit" onClick="productTyp()" id="getProductType">
</form>`


//DISPLAY PRODUCT BY SELECTED OPTIONS
function productTyp(){
    let productType = document.getElementById("productType")
    getData(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType.value}`)
    .then((e) => {
        data = e
        if (data.length == 0) {
            container.innerHTML = `<div class="alert alert-danger" role= "alert">No Data Available</div>`
        }
        else if (data) {
            displayProduct(data.slice(0, 100))
            console.log(productType.value);
        }
    })
    .catch((err) => {
        console.log(err.message);
    })

}


//HIGHLIGHT TEXT WHILE SEARCHING
function search(e){
    let searched = document.getElementById("highlight").value
    if(searched !== ""){
        let text = document.getElementById("content").innerHTML;
        let re = new RegExp(searched,"g");
        let newText = text.replace(re, `<mark style="background-color:yellow">${searched}</mark>`)
        document.getElementById("content").innerHTML = newText
    }
}


