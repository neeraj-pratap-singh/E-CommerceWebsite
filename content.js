function createProductBox(product) {
  let boxDiv = document.createElement("div");
  boxDiv.className = "product-box";

  let boxLink = document.createElement("a");
  boxLink.href = `/contentDetails.html?${product.id}`;

  let imgTag = document.createElement("img");
  imgTag.src = product.thumbnail;

  let detailsDiv = document.createElement("div");
  detailsDiv.className = "product-details";

  let h3 = document.createElement("h3");
  h3.textContent = product.title;

  let h4 = document.createElement("h4");
  h4.textContent = product.brand;

  let h2 = document.createElement("h2");
  h2.textContent = `₹ ${product.price}`;

  detailsDiv.append(h3, h4, h2);
  boxLink.append(imgTag, detailsDiv);
  boxDiv.appendChild(boxLink);

  return boxDiv;
}

function displayProducts(products) {
  const containerElectronics = document.getElementById("containerElectronics");

  products.forEach(product => {
      const productBox = createProductBox(product);
      containerElectronics.appendChild(productBox);
  });
}


function fetchProducts() {
  fetch("https://dummyjson.com/products")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(products => {
      displayProducts(products.products); // Adjust according to the JSON structure
    })
    .catch(error => {
      console.error("Failed to fetch products:", error);
    });
}

document.addEventListener("DOMContentLoaded", fetchProducts);

