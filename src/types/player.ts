export interface Player {
  position: number;
  name: string;
  surname: string;
  totalPoints: number;
  side?: 'left' | 'right' | 'both';
  status?: 'present' | 'absent' | `tanda-${number}`;
}

export interface TeamResponse {
  players: Player[];
}
