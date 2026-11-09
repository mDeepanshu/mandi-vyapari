export interface ApiItem {
  date: string;
  itemName: string;
  dr: number;
  cr: number;
  remark?: string | null;
  // Only HMB's API sends this (a decimal string, "0.00" on vasuli lines)
  quantity?: string | number | null;
}

export interface GroupedData {
  date: string;
  dr: number;
  cr: number;
  quantity: number;
  items: { itemName: string; dr: number | string; cr: number | string; remark: string | null; quantity: string }[];
}
