interface Product{
    name: String;
    type: String;
    price: Number;
    quantity: Number;
    addProduct();
    updateProduct();
    removeProduct();
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
        console.log("Added Product to DB")
        return 1;
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

    addProduct(): Product {
        console.log("Added Product")
        var electronic: Product = new Clothing(this.name,this.type,this.price,this.quantity);
        return electronic;
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

    addProduct(): Product {
        console.log("Added Product")
        var electronic: Product = new Groceries(this.name,this.type,this.price,this.quantity);
        return electronic;
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
    window.location.replace("http://www.w3schools.com");
}