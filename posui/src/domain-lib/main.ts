//Product interface
export interface Product{
    name: String;
    type: String;
    price: Number;
    quantity: Number;
    addProduct():Boolean;
    updateProduct():Number;
    removeProduct():Number;
}
//Product catalog class
export class ProductCatalog{
    private static catalog:ProductCatalog;
    private constructor(){
        // window.localStorage.setItem("products",JSON.stringify([]))
        console.log("Initialised object store in localStorage");
        console.log(localStorage.getItem("products"));
    }

    static getInstance(){
        if(this.catalog == null){
            return new ProductCatalog();
        }
        return this.catalog;
    }

    saveProduct(product:Product){
        // save product
        // @ts-ignore
        var products:Product[] = JSON.parse(localStorage.getItem("products"));
        localStorage.setItem("products",JSON.stringify([product,...products]))
        console.log(`New Product list: ${localStorage.getItem("products")}`);
    }
}

export class Electronic implements Product{
    name; type; price; quantity;

    constructor(name:String,type:String,price:Number,quantity:Number){
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }

    addProduct() {
        var catalog:ProductCatalog = ProductCatalog.getInstance();
        catalog.saveProduct(this);
        console.log("Added Product to Storage")
        return true;
    }

    updateProduct() {
        return 1;
    }

    removeProduct() {
        return 1;
    }
}

export class Clothing implements Product{
    name; type; price; quantity;

    constructor(name:String,type:String,price:Number,quantity:Number){
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }

    addProduct() {
        var catalog:ProductCatalog = ProductCatalog.getInstance();
        catalog.saveProduct(this);
        console.log("Added Product to Storage");
        return true
    }

    updateProduct() {
        return 1;
    }

    removeProduct() {
        return 1;
    }
}

export class Groceries implements Product{
    name; type; price; quantity;

    constructor(name:String,type:String,price:Number,quantity:Number){
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }

    addProduct(){
        var catalog:ProductCatalog = ProductCatalog.getInstance();
        catalog.saveProduct(this);
        console.log("Added Product to Storage");
        return true;
    }

    updateProduct() {
        return 1;
    }

    removeProduct() {
        return 1;
    }
}

export const productFactory = (name:String,type:String,price:Number,quantity:Number)=>{
    switch(type){
        case "Clothing":
            return new Clothing(name,type,price,quantity);
        case "Groceries":
            return new Groceries(name,type,price,quantity);
        case "Electronic":
            return new Electronic(name,type,price,quantity);
        default:
            window.alert("Product Type is not supported")
    }
}

// Decorator Pattern
//@ts-ignore
export class ProductDecorator implements Product{
    protected product: Product;
     name;
    protected type;
     price;
     quantity;


    constructor(product: Product) {
        this.product = product;
        this.name = product.name;
        this.type = product.type;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    addProduct():Boolean{
     return this.product.addProduct();
    }

    updateProduct(): Number {
        return this.product.updateProduct();
    }

    removeProduct(): Number {
        return this.product.removeProduct();
    }

    shipProduct(address:String){
        console.log(`Product will be shipped to address ${address}`)
    }

    wrapProduct(){
        console.log(`The product ${this.product.name} has been wrapped`)
    }

    expressShip(){
        console.log(``)
    }

}


// Observer pattern for notifying the salesperson
export interface SalesPerson {
    productAddedToCart(data:any):void;
}

export interface ProductNotifier{
    subscribe(salesperson:SalesPerson):void;
    unsubscribe(salesperson:SalesPerson):void;
}

export class ConcreteProductNotifier implements ProductNotifier {
    private salespeople:SalesPerson[] = [];

    subscribe(salesperson:SalesPerson){
        this.salespeople.push(salesperson);
    }
    unsubscribe(salesperson:SalesPerson) {
        const index = this.salespeople.indexOf(salesperson);
        if(index >- 1){
            this.salespeople.splice(index,1);
        }
    }

    notify(data:any){
        this.salespeople.forEach((salesperson)=> salesperson.productAddedToCart(data))
    }
}

export class ConcreteSalesPerson implements  SalesPerson{
    productAddedToCart(data:any) {
        alert(`Product Added to cart ${data}`);
    }
}

// Strategy Pattern
export interface PaymentStrategy{
    makePayment(amount:number):void;
}

export class PayWithCash implements PaymentStrategy{
    makePayment(amount:number): void {
        console.log("Payment made with Cash");
        alert("Payment made with Cash");
    }

}

export class PayWithCard implements PaymentStrategy{
    makePayment(amount:number): void {
        console.log("Payment made with a Card");
        alert("Payment made with a Card");
    }

}

export class PaymentContext{
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy:PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public setPaymentStrategy(paymentStrategy:PaymentStrategy){
        this.paymentStrategy = paymentStrategy;
    }

    public executePayment(amount:number){
        this.paymentStrategy.makePayment(amount);
    }
}


//Observer Pattern for Notifying the cart
export interface Cart{
    updateCart():any;
}

export class ConcreteCart implements Cart{
    updateCart(): any {
        console.log("Cart Notified");
        alert("Cart Notified and Updated")
    }

}

export interface BarCodeReader{
    subscribe(cart:Cart):any;
    unsubscribe(cart:Cart):any;

}

export class ConcreteBarCodeReader implements BarCodeReader{
    private carts:Cart[] = [];
    subscribe(cart: Cart): any {
        this.carts.push(cart);
    }

    unsubscribe(cart: Cart): any {
        const index = this.carts.indexOf(cart);
        if(index > -1){
            this.carts.splice(index,1)
        }
    }

    public notify():any{
        this.carts.forEach((cart)=>{
            cart.updateCart();
        })
    }

}

