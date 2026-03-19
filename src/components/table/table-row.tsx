import type { TableColumn } from './types';
import { cn } from '@/utils/classes';
import { getNestedValue } from '@/utils/objects';

export interface TableRowProps<T extends Record<string, any>> {
  row: T;
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
}

export function TableRow<T extends Record<string, any>>({
  row,
  columns,
  onRowClick,
}: TableRowProps<T>) {
  return (
    <tr
      className={cn(
        'border-b border-cantabria-border/50 transition-colors hover:bg-cantabria-dark-muted/30',
        onRowClick && 'cursor-pointer',
      )}
      onClick={onRowClick ? () => onRowClick(row) : undefined}
      role={onRowClick ? 'button' : undefined}
    >
      {columns.map((col) => {
        const raw = getNestedValue(row as Record<string, unknown>, String(col.key));
        const content = col.render ? col.render(raw, row) : (raw as React.ReactNode);
        return (
          <td
            key={String(col.key)}
            className={cn('px-4 py-3 text-cantabria-text', col.className)}
            style={{
              ...(col.maxWidth && { maxWidth: col.maxWidth }),
              ...(col.minWidth && { minWidth: col.minWidth }),
            }}
          >
            {content ?? '—'}
          </td>
        );
      })}
    </tr>
  );
}
