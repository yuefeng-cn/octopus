export default class TaskSource<T> {
  source: Iterator<T>;
  stopping: boolean = false;

  constructor(source: Iterator<T>) {
    this.source = source;
  }

  async next(): Promise<IteratorResult<T>> {
    if(this.stopping) {
      return { done: true, value: undefined };
    }

    let result = this.source.next();
    if (result instanceof Promise) {
      result = await result;
    }

    this.stopping = result.done ? true : this.stopping;
    return result;
  }

  stop() {
    this.stopping = true;
  }
}