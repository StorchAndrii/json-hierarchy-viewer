import React, { memo } from "react";
import "./tree-node.scss";
import { ITreeNodeData } from "../interface/treeNodeData.interface";

interface TreeNodeProps {
  node: ITreeNodeData;
  level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = memo(({ node, level = 0 }) => (
  <div
    className={`tree-node ${node.active ? "active" : "inactive"}`}
    style={{ paddingLeft: `${level * 20}px` }}
  >
    {node.name}
    {node.children &&
      node.children.map((child) => (
        <TreeNode key={child.id} node={child} level={level + 1} />
      ))}
  </div>
));

export default TreeNode;
