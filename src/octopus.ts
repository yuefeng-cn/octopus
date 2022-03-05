import TaskSource from './task_source';
import Worker, { Executor } from './worker';
export default class OctoPus<T> {
  source: Iterator<T>;
  options: {
    workers: number;
    executor: Executor;
  }

  constructor(source: AsyncIterable<T> | Iterable<T>, options: { workers: number, executor: Executor }) {
    if (Symbol.asyncIterator in source) {
      // @ts-ignore
      this.source = source[ Symbol.asyncIterator ]();
    } else if (Symbol.iterator in source) {
      // @ts-ignore
      this.source = source[ Symbol.iterator ]();
    } else {
      throw new Error('invalid source of executors');
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
      Promise.all(workers).then(() => { resolve(true)}).catch((err) => reject(err));
    });
  }
}