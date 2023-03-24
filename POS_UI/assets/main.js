var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ProductCatalog = /** @class */ (function () {
    function ProductCatalog() {
        // window.localStorage.setItem("products",JSON.stringify([]))
        console.log("Initialised object store in localStorage");
        console.log(localStorage.getItem("products"));
    }
    ProductCatalog.getInstance = function () {
        if (this.catalog == null) {
            return new ProductCatalog();
        }
        return this.catalog;
    };
    ProductCatalog.prototype.saveProduct = function (product) {
        // save product
        // @ts-ignore
        var products = JSON.parse(localStorage.getItem("products"));
        localStorage.setItem("products", JSON.stringify(__spreadArray([product], products, true)));
        console.log("New Product list: ".concat(localStorage.getItem("products")));
    };
    return ProductCatalog;
}());
var Electronic = /** @class */ (function () {
    function Electronic(name, type, price, quantity) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }
    Electronic.prototype.addProduct = function () {
        var catalog = ProductCatalog.getInstance();
        catalog.saveProduct(this);
        console.log("Added Product to Storage");
        return true;
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
        var catalog = ProductCatalog.getInstance();
        catalog.saveProduct(this);
        console.log("Added Product to Storage");
        return true;
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
        var catalog = ProductCatalog.getInstance();
        catalog.saveProduct(this);
        console.log("Added Product to Storage");
        return true;
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
    window.location.href = "http://localhost:8000/products.html";
};
var isProduct = function (obj) {
    return (
    // @ts-ignore
    "name" in obj && typeof obj.name == "string" &&
        // @ts-ignore
        "type" in obj && typeof obj.type == "string" &&
        "price" in obj && typeof obj.price == "number" &&
        "quantity" in obj && typeof obj.quantity == "number");
};
var testSetuP = function () {
    console.log("Run tests");
    // create Clothig
    var clothing = productFactory("Gucci", "Clothing", 30000, 90);
    var electronic = productFactory("Macbook Pro", "Electronic", 4000000, 80);
    var food = productFactory("Mandazi", "Groceries", 400, 30);
    if (isProduct(clothing)) {
        console.log("Test Clothing conforms to specification");
    }
    else {
        alert("Tests failed");
    }
    if (isProduct(electronic)) {
        console.log("Test Electronic conforms to specification");
    }
    else {
        alert("Tests failed");
    }
    if (isProduct(food)) {
        console.log("Test Grocery conforms to specification");
    }
    else {
        alert("Tests failed");
    }
};
testSetuP();
