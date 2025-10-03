import type IEntity from './IEntity'

type Density = null | 'default' | 'comfortable' | 'compact'

export type DataTableHeader = {
  key: string
  title: string
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end' | 'center'
  width?: number
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
  density?: Density
  prevIcon?: string | undefined
}

/**
 *
 */
export interface IDataTableHeader<TEntity extends IEntity> {
  headers: DataTableHeader[]
}

export interface IFilter {
  field: string // Nombre del campo a filtrar
  value: any // Valor del filtro
  operator: string // Operador opcional, como '=', '>', '<', etc.
}

export interface IServerTable {
  page: number
  pageSize: number
  shortBy?: Array<string>
  groupBy?: Array<string>
  search?: string
  filters?: IFilter[]
}

export interface IError {
  data: {
    errors: Array<string>
    status: number
  }
}
