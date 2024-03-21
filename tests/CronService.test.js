const CronParser = require('../utils/CronParser');
const CronService = require('../services/cronService');

// Mocking CronParser methods for testing purposes
jest.mock('../utils/CronParser', () => ({
    parseField: jest.fn(),
}));

const {
    STARTING_MINUTES_IN_HOUR,
    ENDING_MINUTES_IN_HOUR,
    STARTING_HOURS_IN_DAY,
    ENDING_HOURS_IN_DAY,
    STARTING_DAYS_IN_MONTH,
    ENDING_DAYS_IN_MONTH,
    STARTING_MONTHS_IN_YEAR,
    ENDING_MONTHS_IN_YEAR,
    STARTING_DAYS_IN_WEEK,
    ENDING_DAYS_IN_WEEK
} = require('../utils/Constants');

describe('CronService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('parseCronExpression', () => {
        it('should return parsed cron expression', () => {
            // Mocking CronParser.parseField to return specific values for simplicity
            CronParser.parseField.mockImplementation((field, low, high) => {
                if (field === '*') return Array.from({ length: high - low + 1 }, (_, index) => low + index);
                if (field === '0') return [0];
                if (field === '1,15') return [1, 15];
                if (field === '*/15') return [0, 15, 30, 45];
                if (field === '1-5') return [1, 2, 3, 4, 5];
                return [];
            });

            const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
            const expectedCronExpression = {
                'minute': [0, 15, 30, 45],
                'hour': [0],
                'day of month': [1, 15],
                'month': Array.from({ length: ENDING_MONTHS_IN_YEAR }, (_, index) => index + 1),
                'day of week': [1, 2, 3, 4, 5],
                'command': '/usr/bin/find'
            };

            const parsedCronExpression = CronService.parseCronExpression(cronString);
            expect(parsedCronExpression).toEqual(expectedCronExpression);
        });

        it('should return parsed cron expression when need to run at each minute', () => {
            // Mocking CronParser.parseField to return specific values for simplicity
            CronParser.parseField.mockImplementation((field, low, high) => {
                if (field === '*') return Array.from({ length: high - low + 1 }, (_, index) => low + index);
                if (field === '0') return [0];
                if (field === '1,15') return [1, 15];
                if (field === '*/15') return [0, 15, 30, 45];
                if (field === '1-5') return [1, 2, 3, 4, 5];
                return [];
            });

            const cronString = '* * * * * /usr/bin/find';
            const expectedCronExpression = {
                'minute': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
                'hour': [0, 1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                'day of month': [1, 2, 3, 4 ,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                'month': [1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12],
                'day of week': [0,1, 2, 3, 4, 5,6],
                'command': '/usr/bin/find'
            };

            const parsedCronExpression = CronService.parseCronExpression(cronString);
            expect(parsedCronExpression).toEqual(expectedCronExpression);
        });

        it('should not handle months greater than 12', () => {
            const cronString = '*/15 0 1,15 * 13-15 /usr/bin/find';
        
            // Mocking CronParser.parseField to return specific values for simplicity
            CronParser.parseField.mockImplementation((field, low, high) => {
                if (field === '*') return Array.from({ length: high - low + 1 }, (_, index) => low + index);
                if (field === '0') return [0];
                if (field === '1,15') return [1, 15];
                if (field === '*/15') return [0, 15, 30, 45];
                if (field === '13-15') return [13, 14, 15];
                return [];
            });
        
            const parsedCronExpression = CronService.parseCronExpression(cronString);
        
            expect(parsedCronExpression.month).not.toEqual([13, 14, 15]);
        });
    });
});
