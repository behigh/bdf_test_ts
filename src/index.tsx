import * as React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import './index.scss'
import App from './App'
import store from './store'

/*
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
 */




ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
