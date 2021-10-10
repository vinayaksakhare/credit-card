import React from 'react';
import { render, queryByAttribute, fireEvent, screen } from '@testing-library/react';
import { CREDIT_CARD_ERROR_MESSAGES } from './../../utilities/constants';
import CreditCard from './CreditCard';

describe('Credit Card', () => {
    let getById = '';
    let dom = null;

    beforeEach(() => {
        getById = queryByAttribute.bind(null, 'id');
        dom = render(<CreditCard />);
    });

    it('should match snapshot', () => {
        const { asFragment } = render(<CreditCard />);
        expect(asFragment()).toMatchSnapshot();
    });

    describe('Cardholder Name', () => {
        it('should not show error if card holder name is filled properly', () => {
            const cardHolderName = getById(dom.container, 'cc_name_on_card');
            fireEvent.change(cardHolderName, {target: {value: 'John Doe'}});
            fireEvent.focusOut(cardHolderName);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cardNameError']);
            expect(errorDiv).toBeNull();
        });

        it('should not show error if card holder name has dot in card holder name', () => {
            const cardHolderName = getById(dom.container, 'cc_name_on_card');
            fireEvent.change(cardHolderName, {target: {value: 'Dr. John Doe'}});
            fireEvent.focusOut(cardHolderName);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cardNameError']);
            expect(errorDiv).toBeNull();
        });

        it('should show error if card holder name has more than 3 space seperated names', () => {
            const cardHolderName = getById(dom.container, 'cc_name_on_card');
            fireEvent.change(cardHolderName, {target: {value: 'A B C D'}});
            fireEvent.focusOut(cardHolderName);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cardNameError']);
            expect(errorDiv).toBeTruthy();
        });

        it('should show error if card holder name is touched and empty', () => {
            const cardHolderName = getById(dom.container, 'cc_name_on_card');
            fireEvent.change(cardHolderName, {target: {value: ''}});
            fireEvent.focusOut(cardHolderName);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cardNameError']);
            expect(errorDiv).toBeTruthy();
        });
    });

    describe('Card Logo', () => {
        it('should show Example card logo if card number is empty', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: ''}});
            fireEvent.focusOut(cardNumber);
            const exampleLogo = screen.queryByText('card_example.svg');
            expect(exampleLogo).toBeTruthy();
        });

        it('should show AMEX logo if card number starts with 34 or 37', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '3412 123456 67890'}});
            fireEvent.focusOut(cardNumber);
            const amexLogo = screen.queryByText('american_express.svg');
            expect(amexLogo).toBeTruthy();
        });

        it('should show VISA logo if card number starts with 4', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '4412 12345 6789 1111'}});
            fireEvent.focusOut(cardNumber);
            const visaLogo = screen.queryByText('visa.svg');
            expect(visaLogo).toBeTruthy();
        });

        it('should show Mastercard logo if card number starts with 5', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '5412 12345 6789 1111'}});
            fireEvent.focusOut(cardNumber);
            const mastercardLogo = screen.queryByText('mastercard.svg');
            expect(mastercardLogo).toBeTruthy();
        });

        it('should show Discover logo if card number starts with 6', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '6412 12345 6789 1111'}});
            fireEvent.focusOut(cardNumber);
            const discoverLogo = screen.queryByText('discover.svg');
            expect(discoverLogo).toBeTruthy();
        });
    });

    describe('Card Number', () => {
        it('should show error if card number is touched and empty', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: ''}});
            fireEvent.focusOut(cardNumber);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cardNumberError']);
            expect(errorDiv).toBeTruthy();
        });

        it('should show error if card number is touched and less than 15 digits', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '6412 12345'}});
            fireEvent.focusOut(cardNumber);
            const errorDiv = screen.getByText(CREDIT_CARD_ERROR_MESSAGES['cardNumberError']);
            expect(errorDiv).toBeTruthy();
        });

        it('should show 16 digit card number with group of 4', () => {
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '4412123456789012'}});
            fireEvent.focusOut(cardNumber);
            expect(cardNumber).toHaveValue('4412 1234 5678 9012');
        });
    });

    describe('CVV', () => {
        it('should show error if cvv is touched and empty', () => {
            const cvv = getById(dom.container, 'cc_cvv');
            fireEvent.change(cvv, {target: {value: ''}});
            fireEvent.focusOut(cvv);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cvvError']);
            expect(errorDiv).toBeTruthy();
        });

        it('should show error if cvv is touched and not having 4 digits for AMEX card number', () => {
            const cvv = getById(dom.container, 'cc_cvv');
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '3412 123456 67890'}});
            fireEvent.change(cvv, {target: {value: '123'}});
            fireEvent.focusOut(cvv);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cvvError']);
            expect(errorDiv).toBeTruthy();
        });

        it('should show error if cvv is touched and not having 3 digits for NON-AMEX card number', () => {
            const cvv = getById(dom.container, 'cc_cvv');
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '4412 1234 5678 9012'}});
            fireEvent.change(cvv, {target: {value: '12'}});
            fireEvent.focusOut(cvv);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cvvError']);
            expect(errorDiv).toBeTruthy();
        });

        it('should NOT show error if cvv is touched and having 4 digits for AMEX card number', () => {
            const cvv = getById(dom.container, 'cc_cvv');
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '3412 123456 67890'}});
            fireEvent.change(cvv, {target: {value: '1234'}});
            fireEvent.focusOut(cvv);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cvvError']);
            expect(errorDiv).toBeNull();
        });

        it('should NOT show error if cvv is touched and having 3 digits for NON-AMEX card number', () => {
            const cvv = getById(dom.container, 'cc_cvv');
            const cardNumber = getById(dom.container, 'cc_number');
            fireEvent.change(cardNumber, {target: {value: '4412 1234 5678 9012'}});
            fireEvent.change(cvv, {target: {value: '123'}});
            fireEvent.focusOut(cvv);
            const errorDiv = screen.queryByText(CREDIT_CARD_ERROR_MESSAGES['cvvError']);
            expect(errorDiv).toBeNull();
        });
    });

    describe('Expiry Date', () => {
        it('should not allow user to select past date', () => {
            const expiryMonth = getById(dom.container, 'cc_exp_month');
            const expiryYear = getById(dom.container, 'cc_exp_year');
            fireEvent.change(expiryMonth, {target: {value: '02'}});
            fireEvent.change(expiryYear, {target: {value: '2021'}});
            fireEvent.focusOut(expiryYear);
            expect(expiryMonth).toHaveValue('MM');
        });
    });
});
