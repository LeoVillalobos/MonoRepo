import type IEntity from './IEntity'

export default interface IPagedResponse<T extends IEntity> {
  current_page: number
  page_size: number
  page_count: number
  row_count: number
  results: T[]
}
