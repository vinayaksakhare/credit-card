import { useEffect, useState } from 'react';
import ExpiryMonthDropDown from './ExpiryMonthDropDown';
import ExpiryYearDropDown from './ExpiryYearDropDown';
import CreditCardLogo from './CreditCardLogo';
import {
    AMEX_CARD_NUMBER_REGEX,
    NON_AMEX_CARD_NUMBER_REGEX,
    LAST_SPACE_CHARACTER_REGEX,
    CREDIT_CARD_HOLDER_NAME_REGEX,
    NON_DIGIT_REGEX,
    NON_WORD_DOT_SPACE_REGEX,
    AMEX_CARD_CVV_MAXLENGTH,
    NON_AMEX_CARD_CVV_MAXLENGTH,
    AMEX_CARD_NUMBER_MAXLENGTH,
    NON_AMEX_CARD_NUMBER_MAXLENGTH,
    AMEX_CARD_NUMBER_SPACES,
    NON_AMEX_CARD_NUMBER_SPACES,
    CREDIT_CARD_ERROR_MESSAGES,
} from './../../utilities/constants';
import {
    isPastDate
} from './../../utilities/validations';

const CreditCard = () => {

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberMaxLength, setCardNumberMaxLength] = useState('');
    const [cvv, setCvv] = useState('');
    const [cvvMaxLength, setCvvMaxLength] = useState('');
    const [cardType, setCardType] = useState('');
    const [expMonth, setExpMonth] = useState('MM');
    const [expYear, setExpYear] = useState('YYYY');
    const [cardError, setCardError] = useState({
        cardNameError: false,
        cardNumberError: false,
        cvvError: false,
    });

    useEffect(() => {
        if(cardNumber.startsWith(34) || cardNumber.startsWith(37)) setCardType('A');
        else if(cardNumber.startsWith(4)) setCardType('V');
        else if(cardNumber.startsWith(5)) setCardType('M');
        else if(cardNumber.startsWith(6)) setCardType('D');
        else setCardType('');
    }, [cardNumber]);

    useEffect(() => {
        setCvvMaxLength(cardType === 'A' ? AMEX_CARD_CVV_MAXLENGTH : NON_AMEX_CARD_CVV_MAXLENGTH);
        setCardNumberMaxLength(cardType === 'A' ? 
            AMEX_CARD_NUMBER_MAXLENGTH + AMEX_CARD_NUMBER_SPACES : 
            NON_AMEX_CARD_NUMBER_MAXLENGTH + NON_AMEX_CARD_NUMBER_SPACES);
        setCvv('');
    }, [cardType]);

    useEffect(() => {
        if (expMonth !== 'MM' && expYear !== 'YYYY') {
            if (isPastDate(expMonth, expYear)){
                setExpMonth('MM'); 
            }
        }
    }, [expMonth, expYear]);

    const handleCardNameChange = (e) => {
        let cardName = e.target.value;
        cardName = cardName.replace(NON_WORD_DOT_SPACE_REGEX, '');
        setCardName(cardName);
    };

    const handleCardNumberChange = (e) => {
        let cardNumber = e.target.value;
        cardNumber = cardNumber.replace(NON_DIGIT_REGEX, '');
        cardNumber = cardType === 'A' ?  cardNumber.replace(AMEX_CARD_NUMBER_REGEX, '$1 $2 $3') : 
        cardNumber.replace(NON_AMEX_CARD_NUMBER_REGEX, '$1 ').replace(LAST_SPACE_CHARACTER_REGEX, '');
        setCardNumber(cardNumber);
    };

    const handleCVVChange = (e) => {
        let cvv = e.target.value;
        cvv = cvv.replace(NON_DIGIT_REGEX, '');
        setCvv(cvv);
    }

    const handleCardHolderNameOnBlur = () => {
        const validate = CREDIT_CARD_HOLDER_NAME_REGEX;
        let isCardNameValid = validate.test(cardName);
        setCardError({
            ...cardError,
            cardNameError: !isCardNameValid
        });
    }

    const handleCardNumberOnBlur = () => {
        let isCardNumberValid = true;
        let strippedCardNumber = cardNumber.replace(/ /g, '');
        if ((cardType === 'A' && strippedCardNumber.length !== AMEX_CARD_NUMBER_MAXLENGTH) ||
            (cardType !== 'A' && strippedCardNumber.length !== NON_AMEX_CARD_NUMBER_MAXLENGTH)
        ) {
            isCardNumberValid = false;
        }
        setCardError({
            ...cardError,
            cardNumberError: !isCardNumberValid
        });
    }

    const handleCVVOnBlur = () => {
        let isCvvValid = true;
        if ((cardType === 'A' && cvv.length !== AMEX_CARD_CVV_MAXLENGTH) ||
            (cardType !== 'A' && cvv.length !== NON_AMEX_CARD_CVV_MAXLENGTH)
         ) {
                isCvvValid = false;
        }
        setCardError({
            ...cardError,
            cvvError: !isCvvValid
        });
    }

    return (
        <>
            <div className="card-container">
                <CreditCardLogo cardType={cardType} />
                <div className="card-details-container">
                    <input 
                        type="text" 
                        placeholder="CARDHOLDER NAME" 
                        name="cc_name_on_card" 
                        id="cc_name_on_card"
                        maxLength="25" 
                        aria-required="true"
                        value={cardName}
                        onChange={handleCardNameChange}
                        onBlur={handleCardHolderNameOnBlur}
                    />
                    <input 
                        type="text" 
                        placeholder="CARDNUMBER" 
                        name="cc_number"
                        id="cc_number" 
                        minLength={cardNumberMaxLength}
                        maxLength={cardNumberMaxLength}
                        data-msg-required="Card number is mandatory" 
                        aria-required="true" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        onBlur={handleCardNumberOnBlur}
                    />
                </div>
                <div className="card-validity-container">
                    <div className="card-expiry-container">
                        <span>EXP Date</span>
                        <ExpiryMonthDropDown 
                            name="cc_exp_month" 
                            id="cc_exp_month"
                            aria-required="true"
                            value={expMonth}
                            setExpMonth= {setExpMonth}
                        />
                        <ExpiryYearDropDown
                            name="cc_exp_year" 
                            id="cc_exp_year"
                            aria-required="true"
                            value={expYear}
                            setExpYear= {setExpYear}
                        />
                    </div>
                    <div className="card-cvv-container">
                        <label>CVV2</label>
                        <input
                            type="password"
                            name="cc_cvv" 
                            id="cc_cvv" 
                            maxLength={cvvMaxLength}
                            size={cvvMaxLength} 
                            data-msg-required="CVV is mandatory" 
                            aria-required="true"
                            value={cvv}
                            onChange={handleCVVChange}
                            onBlur={handleCVVOnBlur}
                        />
                    </div>
                </div>
            </div>
            <div>
            {
                Object.keys(cardError).map(key => 
                    cardError[key] && 
                    <div
                        key={key}
                        id={`cc_error_${key}`}
                        className="error-message"
                        role="alert"
                    >
                        {CREDIT_CARD_ERROR_MESSAGES[key]}
                    </div>
                )
            }
            </div>
        </>
    )
}

export default CreditCard;
