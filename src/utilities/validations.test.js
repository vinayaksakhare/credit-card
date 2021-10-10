import { isPastDate } from './validations';

describe('valiadtions', () => {
    describe('isPastDate', () => {
        it('should return true if past date is passed', () => {
            expect(isPastDate('02', 2021)).toEqual(true);
        });

        it('should return false if future date is passed', () => {
            expect(isPastDate('02', 2022)).toEqual(false);
        });
    });
});
