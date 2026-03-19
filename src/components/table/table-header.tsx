import type { TableColumn } from './types';

export interface TableHeaderProps<T extends Record<string, any>> {
  columns: TableColumn<T>[];
}

export function TableHeader<T extends Record<string, any>>({
  columns,
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className="sticky top-0 z-10 border-b border-cantabria-border bg-cantabria-dark-muted shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
        {columns.map((col) => {
          return (
            <th
              key={String(col.key)}
              className="px-4 py-3 font-semibold text-cantabria-text"
              style={{
                ...(col.maxWidth && { maxWidth: col.maxWidth }),
                ...(col.minWidth && { minWidth: col.minWidth }),
              }}
            >
              <span className="inline-flex items-center gap-1">
                {col.label}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
