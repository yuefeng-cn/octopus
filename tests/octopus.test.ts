import * as assert from "assert";
import { OctoPus, getIndex, getItem } from "../src";

describe("octopus测试", () => {
  it("无参递增", async () => {
    let num = 0;

    await new OctoPus(getIndex(10), {
      workers: 3,
      executor: async () => {
        num++;
      },
    }).execute();

    assert(num == 10, "num should be 10.");
  });
  it("有参计算加法0~5", async () => {
    let num = 0;

    await new OctoPus(getIndex(5), {
      workers: 3,
      executor: async (i) => {
        num += i;
      },
    }).execute();

    assert(num == 10, "num should be 10.");
  });

  it("getItem", async () => {
    let num = 0;

    await new OctoPus<number>(getItem([1, 2, 3]), {
      workers: 3,
      executor: async (i) => {
        num += i;
      },
    }).execute();

    assert(num == 6, "num should be 6.");
  });
});
