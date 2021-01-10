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

class ElementAttribute{
    constructor(attrName, attrValue){
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {

    constructor(renderHookId){
        this.hookId = renderHookId;
    }

    createRootElement(tag, className, attributes) {
        const rootElement = document.createElement(tag);
        if(className){
            rootElement.className = className;
        }
        if(attributes && attributes.length > 0){
            for(const attr of attributes){
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ProductItem extends Component{
    constructor(hookId, product){
        super(hookId);
        this.product = product;
    }

    addtoCart(){
        App.addProductToCart(this.product);
    }

    render(){

        const prodEl = this.createRootElement('li', 'product-item');
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
    }
}

class Cart extends Component{
    items = [];

    constructor(hookId){
        super(hookId);
    }

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
        const sectionEl = this.createRootElement('section', 'cart');
        sectionEl.innerHTML = `
            <h2>Total \$${0}</h2>
            <button>Order Now</button>
        `;
        this.totlalOutput = sectionEl.querySelector('h2');
    }
}

class ProductList extends Component{
    constructor(hookId){
        super(hookId);
    }
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
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);

        for(const prod of this.products){
            const productItem = new ProductItem('prod-list' ,prod);
            productItem.render();
        }
    }
}

class Shop{

    render(){

        this.cart = new Cart('app');
        this.cart.render();
        const productList = new ProductList('app');
        productList.render();
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






