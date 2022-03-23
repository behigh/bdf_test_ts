import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as listActions from '../store/actions/list'

export const useListActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(listActions, dispatch)
}
