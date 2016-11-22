//ajax function 

function getInfo() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1")

    request.addEventListener("load", function () {
        let response = JSON.parse(request.responseText);
        console.log(response);
        response = response.productList;
        console.log(response);

        let heroSection = document.querySelector("#hero");
        let productSection = document.querySelector("#products");

        for (let i = 0; i < response.length; i++) {
            let section = document.createElement("section");

            //mouseover function 

            section.onmouseover = function() {
                heroSection.innerHTML = "";

                //hero pic div
                let heroImageContainer = document.createElement("div");
                heroImageContainer.className = "heroImageContainer";
                let images = document.createElement("img");
                images.src = response[i].imageUrls.md;
                images.className = "images";
                heroImageContainer.appendChild(images);

                //hero description text container

                let heroTextContainer = document.createElement("div");
                heroTextContainer.className = "heroTextContainer";

                let heroDescription = document.createElement("p");
                heroDescription.innerHTML = response[i].description;
                heroDescription.className = "heroDescription";

                let bulletPointsContainer = document.createElement("ul");
                let marketingBullets = response[i].marketingBullets;
                console.log(marketingBullets);

                for (let j = 0; j < marketingBullets.length; j++){
                let bulletPoints = document.createElement("li");
                bulletPoints.innerHTML = marketingBullets[j];
                bulletPoints.className = "bulletPoints";
                bulletPointsContainer.appendChild(bulletPoints);
                }

                heroTextContainer.appendChild(heroDescription);
                heroTextContainer.appendChild(bulletPointsContainer);

                //hero cart button container
                let cartButtonBox = document.createElement("div");
                cartButtonBox.className = "cartButtonBox";

                //add to cart button
                let addToCartBtn = document.createElement("button");
                addToCartBtn.innerHTML = "Add to cart";
                addToCartBtn.onclick = function () {
                    alert("$" + response[i].pricing.price.retail);
                };
                addToCartBtn.className = "addToCartBtn";

                //adding hero price
                let heroPrice = document.createElement("p");
                heroPrice.innerHTML = "$" + response[i].pricing.price.retail;
                heroPrice.className = "heroPrice";

                cartButtonBox.appendChild(addToCartBtn);
                cartButtonBox.appendChild(heroPrice);

                heroSection.appendChild(heroImageContainer);
                heroSection.appendChild(heroTextContainer);
                heroSection.appendChild(cartButtonBox);
            }


            //creating the smaller product section
            section.className = "productItem";

            //adding images
            let image = document.createElement("img");
            image.src = response[i].imageUrls.sm;
            image.className = "image";
            section.appendChild(image);
            
            //adding discriptors
            let descriptors = document.createElement("p");
            descriptors.innerHTML = response[i].description;
            descriptors.className = "descriptors";
            section.appendChild(descriptors);

            //adding price
            let pricing = document.createElement("p");
            pricing.innerHTML = "$" + response[i].pricing.price.retail;
            pricing.className = "pricing";
            section.appendChild(pricing);

            //adding "view more" button
            let viewBtn = document.createElement("button");
            viewBtn.innerHTML = "View More";
            viewBtn.className = "viewBtn";
            section.appendChild(viewBtn);

            productSection.appendChild(section);
        };

    });
    request.send();
};


window.addEventListener("load", function () {
    console.log("loading");
    getInfo();
});