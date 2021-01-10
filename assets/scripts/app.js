class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // price;
    // description;

    constructor(title, imageUrl, desc, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = desc;
        this.price = price;
    }
}

class ProductItem {
    constructor(product){
        this.product = product;
    }

    addtoCart(){
        App.addProductToCart(this.product);
    }

    render(){
        const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <image src="${this.product.imageUrl}" alt="${this.product.title}">
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to cart</button>
                    </div>
                </div>
            `;
            const addCartButton = prodEl.querySelector('button');
            addCartButton.addEventListener('click',this.addtoCart.bind(this));
            return prodEl;
    }
}

class Cart {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totlalOutput.innerHTML = `<h2>Total \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount(){
        return this.items.reduce((prevValue, currentItem) => {
            return prevValue + currentItem.price;
        }, 0);
    }

    addToCart(product){
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render(){
        const sectionEl = document.createElement('section');
        sectionEl.innerHTML = `
            <h2>Total \$${0}</h2>
            <button>Order Now</button>
        `;
        sectionEl.className = 'cart';
        this.totlalOutput = sectionEl.querySelector('h2'); 
        return sectionEl;
    }
}

class ProductList {
    constructor(){}
    products = [
        new Product(
            'A pillow', 
            'https://i1.adis.ws/i/dreams/719-00201_main-shot_01_therapur-cool-pillow', 
            'A soft pillow', 
            19.99
        ),
        new Product(
            'A carpet', 
            'https://eurstockhub.com/wp-content/uploads/2020/11/c-2.jpg', 
            'A carpet which you might like, or not', 
            89.99
        )
    ];

    render(){
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';

        for(const prod of this.products){
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }

        return prodList;
    }
}

class Shop{

    render(){
        const renderHook = document.getElementById('app');

        const productList = new ProductList();
        const prodListEl = productList.render();

        this.cart = new Cart();
        const cartEl = this.cart.render();

        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    } 
}

class App{
    static cart;

    static init(){
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addToCart(product);
    }
}

App.init();






