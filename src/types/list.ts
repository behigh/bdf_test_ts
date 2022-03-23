export enum ListActionTypes {
    LOAD = 'list/load',
    SET_PAGE = 'list/set/page',
    SET_PP = 'list/set/perpage',
    SET_ORDER = 'list/set/order',
    FETCH = 'list/fetch',
    SET_ERROR = 'list/set/error',
}

interface IObjectKeys {
    [key: string]: string | number | boolean | undefined
}

export interface ICompany extends IObjectKeys {
    avgTotalVolume: number
    calculationPrice: string
    change: number
    changePercent: number
    close: number
    closeSource: string
    closeTime: number
    companyName: string
    currency: string
    delayedPrice: number
    delayedPriceTime: number
    extendedChange: number
    extendedChangePercent: number
    extendedPrice: number
    extendedPriceTime: number
    high: number
    highSource: string
    highTime: number
    iexAskPrice: number
    iexAskSize: number
    iexBidPrice: number
    iexBidSize: number
    iexClose: number
    iexCloseTime: number
    iexLastUpdated: number
    iexMarketPercent: number
    iexOpen: number
    iexOpenTime: number
    iexRealtimePrice: number
    iexRealtimeSize: number
    iexVolume: number
    lastTradeTime: number
    latestPrice: number
    latestSource: string
    latestTime: string
    latestUpdate: number
    latestVolume: number
    low: number
    lowSource: number
    lowTime: number
    marketCap:number
    oddLotDelayedPrice: number
    oddLotDelayedPriceTime: number
    open: number
    openTime: number
    openSource: string
    peRatio: number
    previousClose: number
    previousVolume: number
    primaryExchange: string
    symbol: string
    volume: number
    week52High: number
    week52Low: number
    ytdChange: number
    isUSMarketOpen: boolean
}

export interface ListState {
    page: number
    order: string
    perpage: number
    pages: number
    sortable: string[]
    loading: boolean
    error: string | null
    data: ICompany[]
}

interface ListLoadAction {
    type: ListActionTypes.LOAD
    payload: ICompany[]
}

interface ListSetOrderAction {
    type: ListActionTypes.SET_ORDER
    payload: string
}

interface ListSetPageAction {
    type: ListActionTypes.SET_PAGE
    payload: number
}

interface ListSetPerPageAction {
    type: ListActionTypes.SET_PP
    payload: number
}

interface ListFetch {
    type: ListActionTypes.FETCH
}

interface ListSetError {
    type: ListActionTypes.SET_ERROR
    payload: string | null
}

export type ListAction = ListLoadAction | ListSetOrderAction | ListSetPageAction | ListSetPerPageAction | ListFetch | ListSetError
