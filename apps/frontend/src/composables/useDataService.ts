import type { IFilter } from '@/models/base/DataTable'
import type IEntity from '@/models/base/IEntity'
import type IPagedResponse from '@/models/base/IPagedResponse'
import axios from 'axios'
import { ref } from 'vue'
import { responseBody } from '@/helpers/axiosResponse'
import { defaulOptions } from '@/helpers/dataTableOptions'

export function useDataService<T extends IEntity> () {
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const getList = async (
    url: string,
    filters: IFilter[],
    options: any = defaulOptions,
  ): Promise<IPagedResponse<T>> => {
    isLoading.value = true
    error.value = null

    try {
      const params = {
        Page: options.page,
        PageSize: options.pageSize,
        Filters: filters.map(f => `${f.field}${f.operator}${f.value}`).join(','),
      }

      const response = await axios.get(url, { params })
      return responseBody(response)
    } catch (error_) {
      console.error('Error fetching list:', error_)
      error.value = error_ as Error
      throw error_
    } finally {
      isLoading.value = false
    }
  }

  const getById = async (url: string, id: number): Promise<T> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.get(`${url}/${id}`)
      return responseBody(response)
    } catch (error_) {
      console.error('Error fetching item:', error_)
      error.value = error_ as Error
      throw error_
    } finally {
      isLoading.value = false
    }
  }

  const create = async (url: string, entity: T): Promise<T> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.post(url, entity)
      return responseBody(response)
    } catch (error_) {
      console.error('Error creating item:', error_)
      error.value = error_ as Error
      throw error_
    } finally {
      isLoading.value = false
    }
  }

  const update = async (url: string, id: number, entity: T): Promise<T> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.put(`${url}/${id}`, entity)
      return responseBody(response)
    } catch (error_) {
      console.error('Error updating item:', error_)
      error.value = error_ as Error
      throw error_
    } finally {
      isLoading.value = false
    }
  }

  const remove = async (url: string, id: number): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      await axios.delete(`${url}/${id}`)
    } catch (error_) {
      console.error('Error deleting item:', error_)
      error.value = error_ as Error
      throw error_
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    getList,
    getById,
    create,
    update,
    remove,
  }
}
