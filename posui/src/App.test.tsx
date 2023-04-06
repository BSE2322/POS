import React from 'react';
import {render, screen} from "@testing-library/react";
import Selling from "./pages/selling";
import {ConcreteProductNotifier, ConcreteSalesPerson, PaymentContext, PayWithCash} from "./domain-lib/main";


test("test if notify calls productAddedToCart",()=>{
    const salesperson:ConcreteSalesPerson = new ConcreteSalesPerson();
    const productNotifier:ConcreteProductNotifier = new ConcreteProductNotifier();
    productNotifier.subscribe(salesperson);
    productNotifier.notify("Cup");
    expect(salesperson.productAddedToCart).toHaveBeenCalled();
});


test("test that the right payment method is used",()=>{
    render(<Selling/>);
    let paymentContext: PaymentContext = new PaymentContext(new PayWithCash());
    const form = screen.getByText("Pay")
    form.click();
    expect(paymentContext.executePayment).toHaveBeenCalled();
});



