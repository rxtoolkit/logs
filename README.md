# @rxtk/logs

## Getting started

```bash
npm i @rxtk/logs
```

```bash
yarn add @rxtk/logs
```

## API

### logger
```javascript
import logger from '@rxtk/logs';

// Log info
const data = {foo: 'bar'};
logger.info('an info message', data);
logger.debug('a debug message', data);

// Log an error
const err = new Error('ruh roh');
logger.error(err.message, {stack: err.stack, ...data});
```

### toLog
```javascript
import {of} from 'rxjs';
import logger from '@rxtk/logs';

const input$ = of(...[{data: 'foo'}, {data:'bar'}]);
input$.pipe(logger.toLog('somelabel'));
input$.subscribe(); // will log the values of each item emitted with the provided label
```

### trace
```javascript
import {throwError} from 'rxjs';
import logger from '@rxtk/logs';

const err = new Error('zoinks!');
const input$ = throwError(err);
input$.pipe(logger.trace());
input$.subscribe(); // will log any errors emitted including their stack trace
```
