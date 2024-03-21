# Cron Expression Parser

This project is a command-line application for parsing cron expressions.

## Assumptions

1.  Assuming that following will be the range:
    MINUTES(0, 59),
    HOURS(0, 23),
    DAY_OF_MONTH(1, 31),
    MONTH(1, 12),
    DAY_OF_WEEK(0, 6)

2. there should be atleast 6 spaces in string otherwise we will throw an Error

3. Discrading the invalid dates EX: In April we only have 30 Days so discarding 31st

## Installation

1. Clone the repository to your local machine:

`git clone`


2. Navigate to the project directory:

`cd cron-expression-parser`


3. Install dependencies using npm:

`npm install`


## Usage

To parse a cron expression, run the following command:

`npm start "<cron-expression>"`

Replace `<cron-expression>` with the cron expression you want to parse. For example:

`npm start "*/15 0 1,15 * 1-5 /usr/bin/find"`


## Running Tests

To run the unit tests for this project, use the following command:

`npm test`


## Dependencies

This project relies on the following dependencies:

- Jest: A JavaScript testing framework used for writing and running unit tests.



