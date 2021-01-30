# @buccaneerai/logger-utils

## What you need to know
* A super simple logging package for our internal services.  
* This ensures that our repositories log in a consistent way.
* Be careful about making any breaking changes here!
* Use `yarn test` to run tests
* For local development, you can use `yarn link` and then `yarn link @buccaneerai/logger` in the repository that you want to test it out in. Don't forget to run `yarn unlink` when you are done.
* To release changes, update the `package.json` version and merge your changes to master. Then create a release. This will automatically update publish the changes to our private registry.