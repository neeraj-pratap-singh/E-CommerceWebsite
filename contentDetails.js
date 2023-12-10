console.clear();

// Fetch the product ID from the query string
let id = location.search.split('?')[1];
console.log('Product ID:', id);

// Load dynamic content after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Update the badge count if present in the cookies
    if (document.cookie.indexOf('counter=') >= 0) {
        let counter = document.cookie.split('counter=')[1].split(';')[0];
        let badgeElement = document.getElementById("badge");
        if (badgeElement) {
            badgeElement.innerHTML = counter;
        }
    }

    // Fetch product details if a product ID is present
    if (id) {
        fetchProducts(id);
    } else {
        console.error('Product ID is not specified in the query string.');
    }
});

// Function to handle the dynamic creation of content details
function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';
    mainContainer.appendChild(imageSectionDiv);

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.thumbnail;
    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';
    mainContainer.appendChild(productDetailsDiv);

    let h1 = document.createElement('h1');
    let h1Text = document.createTextNode(ob.title);
    h1.appendChild(h1Text);
    productDetailsDiv.appendChild(h1);

    let h4 = document.createElement('h4');
    let h4Text = document.createTextNode(ob.brand);
    h4.appendChild(h4Text);
    productDetailsDiv.appendChild(h4);

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';
    productDetailsDiv.appendChild(detailsDiv);

    let h3DetailsDiv = document.createElement('h3');
    let h3DetailsText = document.createTextNode('Rs ' + ob.price);
    h3DetailsDiv.appendChild(h3DetailsText);
    detailsDiv.appendChild(h3DetailsDiv);

    let h3 = document.createElement('h3');
    let h3Text = document.createTextNode('Description');
    h3.appendChild(h3Text);
    detailsDiv.appendChild(h3);

    let para = document.createElement('p');
    let paraText = document.createTextNode(ob.description);
    para.appendChild(paraText);
    detailsDiv.appendChild(para);

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';
    productDetailsDiv.appendChild(productPreviewDiv);

    let h3ProductPreviewDiv = document.createElement('h3');
    let h3ProductPreviewText = document.createTextNode('Product Preview');
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText);
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    ob.images.forEach((imageSrc, index) => {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.classList.add('previewImg');
        imgTagProductPreviewDiv.src = imageSrc;
        imgTagProductPreviewDiv.onclick = function() {
            console.log("Image clicked:", this.src);
            imgTag.src = this.src;
        };
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';
    productDetailsDiv.appendChild(buttonDiv);

    let buttonTag = document.createElement('button');
    buttonTag.textContent = 'Add to Cart';
    buttonTag.onclick = function() {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf('counter=') >= 0) {
            order += document.cookie.split('counter=')[1].split(';')[0];
            counter = parseInt(document.cookie.split('counter=')[1].split(';')[0], 10) + 1;
        }
        document.cookie = "orderId=" + order + ";counter=" + counter;
        let badgeElement = document.getElementById("badge");
        if (badgeElement) {
            badgeElement.innerHTML = counter;
        }
        console.log('Cookie updated:', document.cookie);
    };
    buttonDiv.appendChild(buttonTag);
}

// Function to fetch product details from the backend
function fetchProducts(productId) {
    fetch('https://dummyjson.com/products/' + productId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(contentDetails => {
            console.log('Product data:', contentDetails);
            dynamicContentDetails(contentDetails);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
