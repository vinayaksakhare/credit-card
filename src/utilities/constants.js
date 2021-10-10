export const AMEX_CARD_NUMBER_REGEX = /(.{4})(.{6})(.{5})/g;
export const NON_AMEX_CARD_NUMBER_REGEX = /(.{4})/g;
export const LAST_SPACE_CHARACTER_REGEX = /\s+$/;
export const CREDIT_CARD_HOLDER_NAME_REGEX = /^((?:[A-Za-z.]+ ?){1,3})$/;
export const NON_DIGIT_REGEX = /[^0-9]/g;
export const NON_WORD_DOT_SPACE_REGEX = /[^A-Za-z. ]/g;

export const AMEX_CARD_CVV_MAXLENGTH = 4;
export const NON_AMEX_CARD_CVV_MAXLENGTH = 3;
export const AMEX_CARD_NUMBER_MAXLENGTH = 15;
export const NON_AMEX_CARD_NUMBER_MAXLENGTH = 16;
export const AMEX_CARD_NUMBER_SPACES = 2;
export const NON_AMEX_CARD_NUMBER_SPACES = 3;

export const CREDIT_CARD_ERROR_MESSAGES = {
    cardNameError: 'Please enter valid card holder name',
    cardNumberError: 'Please enter valid card number',
    cvvError: 'Please enter valid CVV',
};
