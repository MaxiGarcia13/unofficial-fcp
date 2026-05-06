export interface TableEmptyRowProps {
  colSpan: number;
  message: string;
}

export function TableEmptyRow({ colSpan, message }: TableEmptyRowProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-cantabria-muted px-4 py-8 text-center"
      >
        {message}
      </td>
    </tr>
  );
}
