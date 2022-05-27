export const LeavesType = new Map<string, TreeChildrenItem>();

export interface TreeChildrenItem {
  label: string;
  leaves: typeof LeavesType;
}
