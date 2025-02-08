# Octopus

Octopus can run a series of promises with a limitation.

## Installation

```Shell
npm install --save octopus-promise
```

## Examples with Typescript

**run all promises or async functions in an array**

```typescript
import { OctoPus, getItem } from "octopus-promise";

let num = 0;

await new OctoPus(getItem(10), {
  workers: 3,
  executor: async (i: number) => {
    num += i;
  },
}).execute();
```
