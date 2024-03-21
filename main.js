const CronService = require('./services/cronService');

const cronString = process.argv[2];

if (!cronString || cronString.split(/\s+/).length !== 6) {
  console.error('Invalid cron string. Please provide a valid cron string with 6 fields separated by spaces.');
  process.exit(1);
}

try {
  const cronExpression = CronService.parseCronExpression(cronString);
  const formattedOutput = CronService.formatOutput(cronExpression);
  console.log(formattedOutput);
} catch (error) {
  console.error('Error parsing cron expression:', error.message);
  process.exit(1);
}
