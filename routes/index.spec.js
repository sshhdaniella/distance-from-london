const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

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
});

describe('Route Tests', () => {
    test('Gets the index route', async done => {
        const res = await request.get('/')
        expect(res.status).toEqual(200);
        done();
    });
    test('Gets the /users/:city route with query of 20 miles', async done => {
        const res = await request.get('/users/London?miles=20');
        expect(res.status).toEqual(200);
        done();
    });
    test('Expect error to be shown if no miles are provided', async done => {
        const res = await request.get('/users/London');
        expect(res.text).toContain('You must provide distance in miles');
        done();
    });
    test('Expect error to be shown if miles are provided as negative numbers', async done => {
        const res = await request.get('/users/London?miles=-20');
        expect(res.text).toContain('You must enter a positive number');
        done();
    });
    test('Expect error to be shown if miles as string', async done => {
        const res = await request.get('/users/London?miles="hello"');
        expect(res.text).toContain('You must enter a number');
        done();
    });
});
