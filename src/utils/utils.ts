import { ITreeNodeData } from "../interface/treeNodeData.interface";

export const buildHierarchy = (data: ITreeNodeData[]): ITreeNodeData[] => {
  const map = new Map<number, ITreeNodeData>();
  const roots: ITreeNodeData[] = [];

  data.reduce((roots, item) => {
    const node = { ...item, children: [] };
    map.set(item.id, node);

    if (item.parentId === null) {
      roots.push(node);
    } else {
      const parentNode = map.get(item.parentId);

      parentNode?.children?.push(node);
    }
    return roots;
  }, roots);

  return roots;
};

export const filterHierarchy = (nodes: ITreeNodeData[]): ITreeNodeData[] => {
  const isNodeActiveOrHasActiveChild = (node: ITreeNodeData): boolean =>
    (node.active || node.children?.some(isNodeActiveOrHasActiveChild)) ?? false;

  const recursiveFilter = (node: ITreeNodeData): ITreeNodeData | null => {
    const filteredChildren = node.children
      ?.map(recursiveFilter)
      .filter(Boolean) as ITreeNodeData[];

    if (node.active || filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }
    return null;
  };

  return nodes
    .map(recursiveFilter)
    .filter((node) => node !== null) as ITreeNodeData[];
};
