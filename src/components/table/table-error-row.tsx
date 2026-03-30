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
              className="w-fit text-sm text-cantabria-red hover:text-red-400"
            >
              Reintentar
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
