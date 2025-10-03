export interface IAuditableAttributes {
  au_fecha_hora_mod: Date;
  au_terminal: string;
  au_usuario: string;
  GCRecord: number | null;
  OptimisticLockField: number;
  created_at: Date;
}
