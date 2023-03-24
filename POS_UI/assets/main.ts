interface Product{
    name: String;
    type: String;
    price: Number;
    quantity: Number;
    addProduct();
    updateProduct();
    removeProduct();
}

class ProductCatalog{
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

class Electronic implements Product{
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

class Clothing implements Product{
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

class Groceries implements Product{
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

const productFactory = (name:String,type:String,price:Number,quantity:Number)=>{
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

const addProduct = ()=>{
    console.log("Creating Product")
    // @ts-ignore
    var product_name:String = document.getElementById("product_name").value;
    // @ts-ignore
    var product_type:String = document.getElementById("product_type").value;
    // @ts-ignore
    var product_price:Number = document.getElementById("product_price").value;
    // @ts-ignore
    var product_quantity:Number = document.getElementById("product_quantity").value;
    // @ts-ignore
    var product:Product = productFactory(product_name,product_type,product_price,product_quantity)
    product.addProduct()
    window.location.href = "http://localhost:8000/products.html";
}
