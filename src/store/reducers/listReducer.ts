import {ListState, ListActionTypes, ListAction} from '../../types/list'

const defaults: ListState = {
    page: 1,
    order: 'companyName asc',
    perpage: 50,
    pages: 0,
    sortable: ['companyName', 'marketCap'],
    data: [],
    loading: false,
    error: null,
}

const sortBy = (prop: string, desc: boolean = false) => {
    return (a: Record<string, any>, b: Record<string, any>): number => {
        return ((a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0) * (desc ? -1 : 1)
    }
}

const updateState = (newState: ListState, state: ListState, forceDataUpdate: boolean = false): ListState => {
    if (forceDataUpdate || newState.perpage !== state.perpage) {
        newState.pages = Math.ceil(newState.data.length / newState.perpage)
        if (newState.page > newState.pages) {
            newState.page = 1
        }
    }

    if (newState.order !== state.order) {
        forceDataUpdate = true
    }

    if (forceDataUpdate) {
        const [prop, d] = newState.order.split(' ', 2)
        newState.data.sort(sortBy(prop, d === 'desc'))
    }

    return newState
}

const listReducer = (state: ListState = defaults, action: ListAction): ListState => {
    switch (action.type) {
        case ListActionTypes.LOAD:
            return updateState({...state, data: action.payload, loading: false, error: null}, state, true)
        case ListActionTypes.SET_ORDER:
            const [prop, d] = action.payload.split(' ', 2)
            if (state.sortable.indexOf(prop) > -1) {
                return updateState({...state, order: `${prop} ${d.toLowerCase() === 'desc' ? 'desc' : 'asc'}`}, state)
            }
            return state
        case ListActionTypes.SET_PAGE:
            const page = action.payload
            if (!isNaN(page) && state.pages && page <= state.pages) {
                return updateState({...state, page}, state)
            }
            return state
        case ListActionTypes.SET_PP:
            const perpage = action.payload
            if (!isNaN(perpage) && perpage > 0) {
                return updateState({...state, perpage}, state)
            }
            return state
        case ListActionTypes.FETCH:
            return {...state, loading: true, error: null}
        case ListActionTypes.SET_ERROR:
            return {...state, error: action.payload, loading: false}
        default:
            return state
    }
}

export default listReducer
