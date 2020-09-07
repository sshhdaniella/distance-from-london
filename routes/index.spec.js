const milesToMeters = require("./getMeters");
const getData = require("./getData");

const mockKeys = ['id', 'first_name', 'last_name', 'email', 'ip_address', 'latitude', 'longitude' ];

describe('Miles to meters function tests', () => {
    test("convert 1 mile to meters", () => {
        expect(milesToMeters(1)).toBe(1609.34);
    });
    test("convert 400 miles to meters", () => {
        expect(milesToMeters(400)).toBe(643736);
    });
});

describe('Get data from endpoint tests', () => {
    test('returned object contains these keys', async () => {
        const data = await getData('https://dwp-techtest.herokuapp.com/city/London/users');
        expect(Object.keys(data[0]).sort()).toEqual(mockKeys.sort());
    });
    test('no data returned with unknown city', async () => {
        const data = await getData('https://dwp-techtest.herokuapp.com/city/Newcastle/users');
        expect(data).toStrictEqual([]);
    });
    // test('getData throws error on empty string', async () => {
    //     const data = await getData();
    //     expect(data).toThrow('Only absolute URLs are supported');
    // });
});

describe('Route tests', () => {
    // it('works with async/await', async () => {
    //     expect.assertions(1);
    //     const data = await user.getUserName(4);
    //     expect(data).toEqual('Mark');
    // });
});