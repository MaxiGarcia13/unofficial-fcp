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
        className="text-cantabria-muted px-4 py-8 text-center"
      >
        <div className="flex flex-col items-center gap-2">
          <span>{message}</span>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="border-cantabria-border bg-cantabria-surface text-cantabria-red hover:border-cantabria-red hover:bg-cantabria-surface-secondary active:bg-cantabria-dark-muted/50 focus-visible:ring-cantabria-red/50 focus-visible:ring-offset-cantabria-surface w-fit rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:text-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Reintentar
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
