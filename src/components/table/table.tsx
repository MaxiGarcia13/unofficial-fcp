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
  fillHeight = false,
  onRowClick,
  loading,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        'min-w-0 overflow-hidden rounded-lg border border-cantabria-border bg-cantabria-surface',
        fillHeight && 'flex min-h-0 flex-1 flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'min-w-0 overflow-x-auto overflow-y-auto',
          fillHeight && 'min-h-0 flex-1',
        )}
      >
        <table className="w-full min-w-[480px] border-collapse text-left text-sm text-cantabria-text">
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
                      <TableEmptyRow
                        colSpan={columns.length}
                        message={error.message}
                      />
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
