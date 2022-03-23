import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {RootType} from '../store/reducers'


export const useTypedSelector: TypedUseSelectorHook<RootType> = useSelector
