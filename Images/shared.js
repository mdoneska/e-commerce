
function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Trim za da izbrishime whitespace
    template.innerHTML = html;
    return template.content.firstChild; // posho go stavam kako innerHTML cel string go vrakjam prviot child sho e kartata bez <template> tagovite.
  }
  


  function getProducts(params) {
    for (let i = 0; i < params.length; i++) {
      const element = params[i];
      // stringot sho go sodrzhi htmlot
      let cardString = `<div class="item mb-4">
      <div class="card border-0 shadow">
          <img src="${element.img}" alt="" class="card-img-top">
          <div class="card-body"style="display: flex; flex-direction: column; justify-content: space-between;">
              <h5>${element.name}</h5>
              <p class="card-text"style="text-align: center";>${element.price}</p>
          </div>
          <button class="btn btn-basic" style="border-radius:50px; border-color:black;" onclick="addToCart(${element.id})">Add to cart</button></div>
      </div>
  </div> `;
      // dodavam vo html-ot na buttonot onclick="addToCart(${element.id})" za da ja povikuvam funkcijata dinamichki za sekoj element.
      // go isprakjam id-to od elementot bidejki nemam pristap nadvor od axios povikot.
    
      let cardEl = htmlToElement(cardString);
      card.append(cardEl);
     
    
    }}

/* <div class="card col-md-3" style="width: 18rem; display: flex; align-items: center; border:none">
      <img class="card-img-top" src="${element.img}" style="width: 300px; height: 300px;">
      <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between;">
        <h5 class="card-title" style="text-align: center;">${element.name}</h5>
       <p class="card-text"style="text-align: center";>${element.price}</p>
         </div>
        <button class="btn btn-basic" style="border-radius:50px; border-color:black;" onclick="addToCart(${element.id})">Add to cart</button></div>
      </div> */