import type { TableColumn } from './types';
import { cn } from '@/utils/classes';
import { Skeleton } from '../skeleton';
import { TableEmptyRow } from './table-empty-row';
import { TableHeader } from './table-header';
import { TableRow } from './table-row';

export interface TableProps<T extends Record<string, any>> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  getRowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  error?: Error | null;
  onRetry?: () => void;
  fillHeight?: boolean;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  className,
  getRowKey = (row, i) => {
    const id = (row as Record<string, unknown>).id;
    return id != null ? String(id) : i;
  },
  emptyMessage = 'No data',
  error = null,
  onRetry,
  fillHeight = false,
  onRowClick,
  loading,
  ...props
}: TableProps<T>) {
  return (
    <div
      className={cn(
        'min-w-0 overflow-hidden rounded-lg border border-cantabria-border bg-cantabria-surface',
        fillHeight && 'flex min-h-0 flex-1 flex-col',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'min-w-0 overflow-x-auto overflow-y-auto',
          fillHeight && 'min-h-0 flex-1',
        )}
      >
        <table className="w-full border-collapse text-left text-sm text-cantabria-text">
          <TableHeader columns={columns} />
          <tbody className="w-full">
            {
              loading
                ? Array.from({ length: 10 }, (_, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      row={{ id: rowIndex } as unknown as T}
                      onRowClick={() => {}}
                      columns={columns.map(col =>
                        ({
                          ...col,
                          render: (_value: any, _row: any) =>
                            <Skeleton className="h-5 w-full max-w-32" />,
                        }))}
                    />
                  ))
                : error
                  ? (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-4 py-8 text-center text-cantabria-muted"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span>{error.message}</span>
                            {onRetry && (
                              <button
                                type="button"
                                onClick={onRetry}
                                className="w-fit text-sm text-cantabria-red hover:text-red-400"
                              >
                                Reintentar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  : data.length === 0
                    ? (
                        <TableEmptyRow
                          colSpan={columns.length}
                          message={emptyMessage}
                        />
                      )
                    : (
                        data.map((row, index) => (
                          <TableRow
                            key={getRowKey(row, index)}
                            row={row}
                            columns={columns}
                            onRowClick={onRowClick}
                          />
                        ))
                      )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
