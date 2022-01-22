# Utilities
  A series of useful functions, heavily tested and strongly typed via Typescript declarations. Inspired by functional
  philosophies, but not claiming to be a functional library (yet, anyhow).

  Each function in this library adheres to the rule that it will never change the data provided to it as input. It will
  always return a new value.

  These functions are intended to simplify code in consuming applications by abstracting common code tasks and control
  structures into composable, mockable, "unit testable", declarative functions.

  Some of these merely wrap common tasks with a declarative word or two to better describe what they do, others
  abstract more complex functionality. A few - like `branch` - wrap code structures in functions, which allows
  for some fun functional funny-business, like partial application and currying.

  ## Categories
    - [Arrays](docs/arrays.md)
    - [Async Helpers](docs/async-helpers.md)
    - [Dates](docs/dates.md)
    - [Structure and Flow Functions](docs/functional.md)
    - [Logical Operating Functions](docs/logical.md)
    - [Memoization](docs/memoize.md)
    - [Miscellaneous](docs/misc.md)
    - [Objects](docs/objects.md)
    - [Pipes](docs/pipe.md)
    - [String Functions](docs/string.md)
  