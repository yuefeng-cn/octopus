import * as assert from 'assert';
import OctoPus from '../src/octopus';

describe('octopus测试', () => {
  it('无参递增', async () => {
    let num = 0;
    function* getItem() {
      for (let i = 0; i < 10; i++) {
        yield i;
      }
    }

    await new OctoPus(getItem(), {
      workers: 3,
      executor: async () => {
        num++;
      },
    }).execute();

    assert(num == 10, 'num should be 10.');
  }),
  it('有参计算加法0~5', async () => {
    let num = 0;
    function* getItem(times: number) {
      for (let i = 0; i < times; i++) {
        yield i;
      }
    }

    await new OctoPus(getItem(5), {
      workers: 3,
      executor: async (i) => {
        num += i;
      },
    }).execute();

    assert(num == 10, 'num should be 10.');
  })
});