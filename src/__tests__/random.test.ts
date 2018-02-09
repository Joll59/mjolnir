import { equals } from '../helpers/random';
import { expect } from 'chai';

const trueArray = [[1, 3], [1, 3]];
const falseArray = [[1, 5], [1, 3, 4]];
describe('equals', () => {
    it(
        'checks if two arrays of equal lengths are equal',
        () => {
            expect(
                equals(trueArray[1], trueArray[0])).to.equal(true);
        }
    );
    it('expects arrays of different lengths to NOT be equal', () => {
        expect(
            equals(falseArray[1], trueArray[1])).to.equal(false);
    });

    it('expects arrays of equal lengths but different values to NOT be equal', () => {
        expect(
            equals(falseArray[0], trueArray[1])).to.equal(false);
    });
});