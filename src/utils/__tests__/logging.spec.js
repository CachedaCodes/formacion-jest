import logging from '../logging';
import {jest} from '@jest/globals'

describe('logging', () => {
    describe('logString', () => {
        let consoleLogSpy;

        beforeEach(() => {
            jest.restoreAllMocks();
            consoleLogSpy = jest.spyOn(console, 'log');
        });

        it('should log the string with the specified level', () => {
            const str = 'Hello, world!';
            const level = 'info';

            logging.logString(str, level);

            expect(consoleLogSpy).toHaveBeenCalledWith(`[my_todo ${level.toUpperCase()}] ${str}`);
        });

        it('should log the string with the default level if no level is specified', () => {
            const str = 'Hello, world!';

            logging.logString(str);

            expect(consoleLogSpy).toHaveBeenCalledWith(`[my_todo INFO] ${str}`);
        });
    });

    describe('getLogLevel', () => {
        it('should return the specified log level', () => {
            const levels = [undefined, 'error', 'warn'];
            const expectedResults = ['[my_todo INFO]', '[my_todo ERROR]' ,'[my_todo WARN]'];

            levels.forEach((level, index) => {
                const result = logging.getLogLevel(level);

                expect(result).toBe(expectedResults[index]);
            });
        });
    });
});