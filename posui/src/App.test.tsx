import React from 'react';
import Selling from "./pages/selling";
import {ConcreteProductNotifier, ConcreteSalesPerson} from "./domain-lib/main";


test("test if notify calls productAddedToCart",()=>{
    const salesperson:ConcreteSalesPerson = new ConcreteSalesPerson();
    const productNotifier:ConcreteProductNotifier = new ConcreteProductNotifier();
    productNotifier.subscribe(salesperson);
    productNotifier.notify("Cup");
    expect(salesperson.productAddedToCart).toHaveBeenCalled();
});
