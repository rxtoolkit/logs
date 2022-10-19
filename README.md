# @buccaneerai/logger-utils

## API
```javascript
import logger from '@buccaneerai/logging-utils';

// Log info
const data = {foo: 'bar};
logger.info('an info message', data);
logger.debug('a debug message', data);

// Log an error
const err = new Error('ruh roh');
logger.error(err.message, {stack: err.stack, ...data});
```
