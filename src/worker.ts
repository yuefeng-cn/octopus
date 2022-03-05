import TaskSource from './task_source';

export type Executor<T = any> = (item: T) => Promise<boolean | void>;

export default class Worker<T> {
  source: TaskSource<T>;
  executor: Executor<T>;

  constructor(source: TaskSource<T>, executor: Executor) {
    this.source = source;
    this.executor = executor;
  }

  async start() {
    return await this.exec();
  }

  async exec() {
    while (true) {
      const item = await this.source.next();
      if (item.done) {
        return;
      }

      try {
        await this.executor(item.value);
      } catch (err) {
        this.source.stop();
        throw err;
      }
    }
  }
}