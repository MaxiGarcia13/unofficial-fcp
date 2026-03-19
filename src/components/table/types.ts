export interface TableColumn<T extends Record<string, any> = Record<string, any>> {
  key: keyof T | string;
  label: string;
  className?: string;
  minWidth?: string;
  maxWidth?: string;
  render?: (value: any, row: T) => React.ReactNode;
}
