 console.log("hello");
let product = document.getElementById("product");
let numOfItems = document.getElementById("numOfItems");



let drJart = JSON.parse(localStorage.getItem("drJartProducts")) == undefined // proverka dali postoi key , ako ne postoi vrakja undefined
? [] // ako ne postoi togash davame vrednost prazna niza
: JSON.parse(localStorage.getItem("drJartProducts")); // zemame od storage podatoci za cartot
 console.log(drJart)
 let allItems = [];
 allItems = Array.from(drJartProducts);

 console.log(allItems.length);




function addToCart(id) {
    let clickedItem = allItems.find(el => el.id === id); // go naogjame elementot shto e clicknat vo nizata od response
    let addedProduct = {
        id: clickedItem.id,
        img: clickedItem.img,
        name: clickedItem.name,
        price: clickedItem.price,
        quantity: 1,
    };

    let found = drJart.find(el => el.id === addedProduct.id)
    if (found) {
        found.quantity++
    }
    else {
        drJart.push(addedProduct)
    }
    // go konvertirame arrayot vo json string i go pukame vo local storage
    localStorage.setItem("drJart", JSON.stringify(drJart));
   
     //itemCount()
}
function closeCart() {
    document.getElementById("product").innerHTML = "";

}
closeCart();
openCart();


{/* <input id="quantity" min="0" name="quantity" value="${item.quantity}" type="number"
class="form-control form-control-sm  text-center " />  */}

function openCart() {
product.innerHTML=""
   let storageItems = JSON.parse(localStorage.getItem("drJart"));
    for (let i = 0; storageItems.length; i++) {
        const item = storageItems[i];

        // numOfItems.innerHTML = storageItems.length + " " + "Items";
        console.log(item);
        let  newProduct =  htmlToElement(`
       
        <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="${item.img}"
            class="img-fluid rounded-3 " >
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
      
          <h6 class="text-muted">${item.name}</h6>
          
        </div>
        <div class="col-md-3 col-lg-4 col-xl-3 d-flex ">
          <button class="btn btn-link px-2" name="quantity"
          onclick="decrementItemQuantity(${item.id})" >
            <i class="fas fa-minus"></i>
          </button>


          <p id="cardQ${item.id}"> ${item.quantity}</p>

          <button class="btn btn-link px-2" name="quantity"
          onclick="incrementItemQuantity(${item.id})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="  col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="mb-0">${item.price}$</h6>
        </div>
        <div class=" col-md-1 col-lg-1 col-xl-1 text-end">
          <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
        </div>
      </div>

    `); 
    product.append(newProduct);
    }
}

function incrementItemQuantity(id) {
  let item = drJart.find((el) => el.id === id);
  item.quantity++;
  console.log(id)
 document.getElementById("cardQ"+id ).innerText = item.quantity;
  console.log(item.quantity)
  localStorage.setItem("drJart", JSON.stringify(drJart));

}

function decrementItemQuantity(id)
 {
  let item = drJart.find((el) => el.id === id);
  if (item.quantity === 1) {
    if (confirm("Are you sure ?")) {
      drJart = drJart.filter((el) => id !== el.id);
      document.getElementById(`${id}`).remove();
   
    }
  } else {
    item.quantity--;
    console.log(id)
    console.log(item.quantity)
    document.getElementById("cardQ" + id).innerText = item.quantity;
    // document.getElementById(`cardTotal${id}`).innerText = parseInt(item.cardQ * item.cardPrice);
  }
  localStorage.setItem("drJart", JSON.stringify(drJart));
  
}
function closeCart() {
  product.innerHTML = "";
  // document.getElementById("submit").remove();
  // itemCount();
}