export interface TableErrorRowProps {
  colSpan: number;
  message: string;
  onRetry?: () => void;
}

export function TableErrorRow({ colSpan, message, onRetry }: TableErrorRowProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-8 text-center text-cantabria-muted"
      >
        <div className="flex flex-col items-center gap-2">
          <span>{message}</span>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-fit rounded-lg border border-cantabria-border bg-cantabria-surface px-3 py-1.5 text-sm font-medium text-cantabria-red transition-colors duration-150 hover:border-cantabria-red hover:bg-cantabria-surface-secondary hover:text-red-300 active:bg-cantabria-dark-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cantabria-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cantabria-surface"
            >
              Reintentar
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
