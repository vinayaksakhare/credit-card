export const isPastDate = (month, year) => {
    const today = new Date();
    return parseInt(year, 10) === today.getFullYear() && month < today.getMonth() + 2;
}
