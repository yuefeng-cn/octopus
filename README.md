# Octopus
> To get a trial of npm packaging process, it's published here.

Octopus can run a series of promises with a limitation.

## Installation

Install it on your project.
```Shell
npm install --save octopus-promise
```

## Examples with Typescript
**run all promises or async functions in an array**

```typescript
import OctoPus from 'octopus-promise';

let num = 0;
function* getItem(cnt: number) {
  for (let i = 0; i < cnt; i++) {
    yield i;
  }
}

await new OctoPus(getItem(10), {
  workers: 3,
  executor: async (i: number) => {
    num += i;
  },
}).execute();

```