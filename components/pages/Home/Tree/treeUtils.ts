import genId from "utils/genId";

import { LeavesType, TreeChildrenItem } from "./types";

export const initialTree = new Map<string, TreeChildrenItem>([
  [
    genId(),
    {
      label: "First Level",
      leaves: new Map<string, TreeChildrenItem>([
        [
          genId(),
          {
            label: "Second Level",
            leaves: new Map<string, TreeChildrenItem>(),
          },
        ],
      ]),
    },
  ],
]);

export const findNode = (
  leave: typeof LeavesType,
  id: string,
  index: number,
  callback: (leave: typeof LeavesType, index: number, splitId: string) => void
) => {
  const splitId = id.split("_");

  if (leave.has(splitId[index])) {
    const tempLeave = leave.get(splitId[index]);

    if (index === splitId.length - 1) {
      callback(leave, index, splitId[index]);

      return;
    } else {
      findNode(tempLeave!.leaves, id, index + 1, callback);
    }
  }
};
