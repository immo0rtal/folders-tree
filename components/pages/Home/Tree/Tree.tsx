import React from "react";

import TreeItem from "./TreeItem";
import { initialTree, findNode } from "./treeUtils";

import genId from "utils/genId";

import { TreeChildrenItem } from "./types";

// I use Map, cause it has O(1) to find leave in tree branch, also Map is an iterable

// Tree's methods can be move to class

const Tree = () => {
  const [tree, setTree] = React.useState<typeof initialTree>(initialTree);

  const handleSelect = (e: React.MouseEvent<HTMLElement>, id: string) => {
    findNode(tree, id, 0, (leave, index) => {
      const isFolder = Math.random() < 0.5;

      const deepLeaves = isFolder
        ? new Map<string, TreeChildrenItem>([
            [
              genId(),
              {
                label: `${index + 1} Level`,
                leaves: new Map<string, TreeChildrenItem>(),
              },
            ],
          ])
        : new Map<string, TreeChildrenItem>();

      leave.set(genId(), {
        label: `${index} Level`,
        leaves: deepLeaves,
      });
    });

    setTree(new Map(tree));
  };

  const deleteNode = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();

    findNode(tree, id, 0, (leave, _, splitId) => {
      leave.delete(splitId);
    });

    setTree(new Map(tree));
  };

  const createTree = (value: TreeChildrenItem, key: string) => {
    const children: JSX.Element[] = [];

    value.leaves.forEach((leave: TreeChildrenItem, leaveKey: string) => {
      children.push(
        <React.Fragment key={leaveKey}>
          {createTree(leave, key + "_" + leaveKey)}
        </React.Fragment>
      );
    });

    return (
      <TreeItem
        id={key}
        key={key}
        handleSelect={handleSelect}
        deleteNode={deleteNode}
        label={value.label}
        leaves={children}
      />
    );
  };

  const renderTree = () => {
    const children: JSX.Element[] = [];

    tree.forEach((value: TreeChildrenItem, key: string) => {
      children.push(<div key={key}>{createTree(value, key)}</div>);
    });

    return children;
  };

  return <div>{renderTree()}</div>;
};

export default Tree;
