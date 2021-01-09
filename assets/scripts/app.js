const productList = {
    products: [ 
        {
            title: 'A pillow', 
            imageUrl: 'https://i1.adis.ws/i/dreams/719-00201_main-shot_01_therapur-cool-pillow', 
            price: 19.99, description: 'A soft pillow'
        }, 
        {
            title: 'A carpet', 
            imageUrl: 'https://eurstockhub.com/wp-content/uploads/2020/11/c-2.jpg', 
            price: 89.99, description: 'A carpet which you might like, or not'
        }
    ],
    render(){
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';

        for(prod of this.products){
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <image src="${prod.imageUrl}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        }

        renderHook.append(prodList);
    }
};

productList.render();

