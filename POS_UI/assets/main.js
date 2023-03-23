var Electronic = /** @class */ (function () {
    function Electronic(name, type, price, quantity) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }
    Electronic.prototype.addProduct = function () {
        console.log("Added Product to DB");
        return 1;
    };
    Electronic.prototype.updateProduct = function () {
        return 1;
    };
    Electronic.prototype.removeProduct = function () {
        return 1;
    };
    return Electronic;
}());
var Clothing = /** @class */ (function () {
    function Clothing(name, type, price, quantity) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }
    Clothing.prototype.addProduct = function () {
        console.log("Added Product");
        var electronic = new Clothing(this.name, this.type, this.price, this.quantity);
        return electronic;
    };
    Clothing.prototype.updateProduct = function () {
        return 1;
    };
    Clothing.prototype.removeProduct = function () {
        return 1;
    };
    return Clothing;
}());
var Groceries = /** @class */ (function () {
    function Groceries(name, type, price, quantity) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }
    Groceries.prototype.addProduct = function () {
        console.log("Added Product");
        var electronic = new Groceries(this.name, this.type, this.price, this.quantity);
        return electronic;
    };
    Groceries.prototype.updateProduct = function () {
        return 1;
    };
    Groceries.prototype.removeProduct = function () {
        return 1;
    };
    return Groceries;
}());
var productFactory = function (name, type, price, quantity) {
    switch (type) {
        case "Clothing":
            return new Clothing(name, type, price, quantity);
        case "Groceries":
            return new Groceries(name, type, price, quantity);
        case "Electronic":
            return new Electronic(name, type, price, quantity);
        default:
            window.alert("Product Type is not supported");
    }
};
var addProduct = function () {
    console.log("Creating Product");
    // @ts-ignore
    var product_name = document.getElementById("product_name").value;
    // @ts-ignore
    var product_type = document.getElementById("product_type").value;
    // @ts-ignore
    var product_price = document.getElementById("product_price").value;
    // @ts-ignore
    var product_quantity = document.getElementById("product_quantity").value;
    // @ts-ignore
    var product = productFactory(product_name, product_type, product_price, product_quantity);
    product.addProduct();
    window.location.replace("http://www.w3schools.com");
};
