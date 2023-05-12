import React from 'react';
import {
    Clothing,
    ConcreteProductNotifier,
    ConcreteSalesPerson,
    Electronic,
    PaymentContext, PayWithCard,
    PayWithCash,
    ProductCatalog,
    ProductDecorator,
    productFactory
} from "./domain-lib/main";


describe("collection of tests for GoF design patterns",()=>{
    beforeAll(async ()=>{

    });

    afterAll(async ()=>{

    });

    test("singleton pattern",async ()=>{
        // Arrange and Act
        const catalog1: ProductCatalog = ProductCatalog.getInstance();
        const catalog2: ProductCatalog = ProductCatalog.getInstance();

        // Assert
        expect(catalog1).toEqual(catalog2);
    });

    test("factory design pattern", async () =>{
        // Arrange and Act
        //@ts-ignore
        const product = productFactory("item1","Clothing",2000,22);
        const product2 = productFactory("item1","None",2000,22);
        const product3 = productFactory("item1","Electronic",2000,22);

        // Assert
        expect(product).toBeInstanceOf(Clothing);
        expect(product3).toBeInstanceOf(Electronic);
        expect(product2).toBeUndefined();
    });

    test("Decorator pattern", async ()=>{
        // Arrange and assert
        //@ts-ignore
        const product = new ProductDecorator(productFactory("Meat","Groceries",3000,1));

        // Assert
        expect(product).toHaveProperty("product");
    });

    test("observer pattern", async () =>{
        // Arrange
        const salesperson:ConcreteSalesPerson = new ConcreteSalesPerson();
        const productNotifier:ConcreteProductNotifier = new ConcreteProductNotifier();
        const spyProductAddedToCart = jest.spyOn(salesperson,"productAddedToCart");
        productNotifier.subscribe(salesperson);
        productNotifier.notify("Item1");


        // Assert
        expect(spyProductAddedToCart).toHaveBeenCalledTimes(1);
    });

    test("strategy pattern", async () =>{
        // Arrange
        const cash = new PayWithCash();
        const card = new PayWithCard();
        const paymentContext: PaymentContext = new PaymentContext(cash);
        const spyCashMakePayment = jest.spyOn(cash,"makePayment");
        const spyCardMakePayment = jest.spyOn(card,"makePayment");

        // Act
        paymentContext.executePayment(2324);

        // Assert
        expect(spyCashMakePayment).toHaveBeenCalledTimes(1);

        // Arrange
        paymentContext.setPaymentStrategy(card);

        // Act
        paymentContext.executePayment(4000);

        // Assert
        expect(spyCardMakePayment).toHaveBeenCalledTimes(1);

    });
})




