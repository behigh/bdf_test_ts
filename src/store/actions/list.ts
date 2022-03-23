import {Dispatch} from 'redux'
import {ICompany, ListAction, ListActionTypes} from '../../types/list'
import config from '../../config'

async function request<TResponse>(
    url: string,
    config?: RequestInit
): Promise<TResponse> {
    const response = await fetch(url)
    if (response.ok) {
        return await response.json()
    } else {
        throw response.statusText || (response.status === 403 ? 'Forbidden' : `Unknown error. Code ${response.status}`)
    }
}

let loaded = 0

export const loadData = () => async (dispatch: Dispatch<ListAction>) => {
    if (loaded > 5) {
        return
    }
    try {
        loaded++
        const endpoint = new URL(config.apiUrl + 'stock/market/list/mostactive')
        endpoint.searchParams.append('token', config.apiToken)
        endpoint.searchParams.append('listLimit', '100')

        dispatch({type: ListActionTypes.FETCH})

        const result = await request<ICompany[]>(endpoint.toString())
        dispatch({type: ListActionTypes.LOAD, payload: result})
    } catch (error) {
        dispatch({type: ListActionTypes.SET_ERROR, payload: error + ''})
    }
}

export const setPage = (page: number) => (dispatch: Dispatch<ListAction>) => {
    dispatch({type: ListActionTypes.SET_PAGE, payload: page})
}

export const setPerPage = (perpage: number) => (dispatch: Dispatch<ListAction>) => {
    dispatch({type: ListActionTypes.SET_PP, payload: perpage})
}

export const setOrder = (order: string) => (dispatch: Dispatch<ListAction>) => {
    dispatch({type: ListActionTypes.SET_ORDER, payload: order})
}
