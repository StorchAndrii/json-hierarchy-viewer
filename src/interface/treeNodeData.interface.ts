export interface ITreeNodeData {
  id: number;
  parentId: number | null;
  name: string;
  active: boolean;
  children?: ITreeNodeData[];
}
