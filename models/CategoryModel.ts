export interface CategoryModel {
  id: number;
  name: string;
  slug: string;
  enabled: boolean;
  priority: number;
  mapped: false;
  parent: number | null;
  open?: boolean;
}
