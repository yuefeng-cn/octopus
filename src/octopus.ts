import TaskSource from "./task_source";
import Worker, { Executor } from "./worker";

export class OctoPus<T> {
  source: Iterator<T>;
  options: {
    workers: number;
    executor: Executor<T>;
  };

  constructor(
    source: Iterable<T>,
    options: { workers: number; executor: Executor<T> }
  ) {
    if (Symbol.iterator in source) {
      this.source = source[Symbol.iterator]();
    } else {
      throw new Error("invalid source of executors");
    }

    this.options = options;
  }

  async execute(): Promise<boolean> {
    const taskSource = new TaskSource(this.source);
    const workers: Promise<void>[] = [];

    for (let i = 0; i < this.options.workers; i++) {
      const worker = new Worker(taskSource, this.options.executor);
      workers.push(worker.start());
    }

    return await new Promise((resolve, reject) => {
      Promise.all(workers)
        .then(() => {
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  }
}

export function* getIndex(num: number) {
  for (let i = 0; i < num; i++) {
    yield i;
  }
}

export function* getItem<T>(items: T[]) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
