export interface IAuditable {
  au_terminal: string;
  au_usuario: string;
  au_fecha_hora_mod: Date;
  GCRecord?: number;
  OptimisticLockField?: number;
  created_at?: Date;
}
