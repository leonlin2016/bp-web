export interface Reading {
  id: string;
  user_id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  note?: string;
  created_at: string;
}
