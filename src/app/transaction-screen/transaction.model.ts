export interface ApiItem {
  date: string;
  itemName: string;
  dr: number;
  cr: number;
  remark?: string | null;
}

export interface GroupedData {
  date: string;
  dr: number;
  cr: number;
  items: { itemName: string; dr: number; cr: number; remark: string | null }[];
}
