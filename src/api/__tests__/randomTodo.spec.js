import getRandomTodo from '../randomTodo';
import {jest} from '@jest/globals';
import apiConstants from '../apiConstants';

describe('getRandomTodo', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })

    it('should throw an error if the API request fails', async () => {
        global.fetch = jest.fn(() => new Error(''));
        const mockFetch = global.fetch;

        await expect(getRandomTodo()).rejects.toThrow('API request failed');
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should return a random todo object', async () => {
        const mockedResult = 'abc';
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([mockedResult])
        }));
        const mockFetch = global.fetch;

        const result = await getRandomTodo();
        expect(result).toEqual(mockedResult);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(`${apiConstants.randomNumberUrl}min=100&max=100`);
    });
});