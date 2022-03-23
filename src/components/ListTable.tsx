import * as React from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ICompany} from '../types/list'

const columns = [
    {
        key: 'companyName',
        title: 'Company Name',
        value: (item: ICompany) => (
            <Link to={`/${item.symbol}`}>{item.companyName}</Link>
        ),
        sortable: true,
        width: '55%',
    },
    {
        key: 'symbol',
        title: 'Symbol',
        width: '15%',
    },
    {
        key: 'marketCap',
        title: 'Market Cap.',
        value: (item: ICompany) => (item.marketCap / Math.pow(10, 9)).toFixed(3) + ' B',
        sortable: true,
        width: '15%',
    },
    {
        key: 'changePercent',
        title: 'Change',
        value: (item: ICompany) => <span className={item.changePercent > 0 ? 'text-success' : item.changePercent < 0 ? 'text-danger' : ''}>{`${Number(item.changePercent).toFixed(2)}%`}</span>,
        width: '15%',
    },
]

interface ListTableProps {
    items: ICompany[]
    order?: string,
    setOrder?: (order: string) => void
}


const ListTable: React.FC<ListTableProps> = ({items, order, setOrder}) => {
    const divRef = React.useRef<HTMLDivElement>(null)
    const tableRef = React.useRef<HTMLTableElement>(null)
    const tableHeaderRef = React.useRef<HTMLTableElement>(null)
    order = order || ''
    if (!setOrder) {
        setOrder = () => {}
    }

    const rows = items.map((item) => (
        <tr key={item.symbol}>{columns.map((col, colIndex) => {
            let value
            if (col.value && typeof col.value === 'function') {
                value = col.value(item)
            } else {
                value = item[col.key]
            }

            return <td key={`${item.symbol}${colIndex}`}>{value}</td>
        })}</tr>
    ))

    const calculateHeight = () => {
        if (divRef.current !== null && tableRef.current !== null) {
            tableRef.current.style.display = 'none'
            divRef.current.style.height = 'auto'
            const height = divRef.current.offsetHeight
            divRef.current.style.height = height + 'px'
            tableRef.current.style.display = 'table'
        }
    }

    let resizeTimeout: ReturnType<typeof setTimeout> | null
    const resizeThrottler = () => {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null
                calculateHeight()
            }, 66)
        }
    }

    React.useEffect(() => {
        calculateHeight()
        window.addEventListener('resize', resizeThrottler, false)

        return () => {
            window.removeEventListener('resize', resizeThrottler)
        }
    })

    const header = React.useMemo(() => {
        let [orderCol, orderDir] = (order && order.split(' ', 2)) || ['', '']
        return (
            <thead className="table-light border-top-0">
                <tr>{columns.map((col, index) => {
                    let title: JSX.Element | string = col.title
                    if (col.sortable) {
                        title = <a
                            href={`#${col.key}`}
                            className={col.key === orderCol ? 'link-primary' : 'link-dark'}
                            onClick={(e) => {
                                e.preventDefault()
                                setOrder && setOrder(`${col.key} ${col.key === orderCol && (!orderDir || orderDir === 'asc') ? 'desc' : 'asc'}`)
                            }
                            }
                        >{title}{col.key === orderCol ? (orderDir === 'desc' ? ' ▼' : ' ▲') : ''}</a>
                    }

                    return <th key={`th${index}`}>{title}</th>
                })}</tr>
            </thead>
        )
    }, [order, setOrder])

    const colgroup = React.useMemo(() => (
        <colgroup>{columns.map((col, index) => <col key={`col${index}`} style={{width: col.width}} />)}</colgroup>
    ), [])

    const toggleStickiness = React.useCallback(
        ({ top, bottom }) => {
            const isSticky = top <= 0 && bottom > 2 * 41
            if (tableHeaderRef.current !== null)
            {
                tableHeaderRef.current.style.display = isSticky ? 'table' : 'none'
            }
        },
        []
    )

    return (
        <div className="flex-fill position-relative" ref={divRef} style={{overflow: 'auto'}} onScroll={() => tableRef.current !== null && toggleStickiness(tableRef.current.getBoundingClientRect())}>
            <Table ref={tableHeaderRef} className="mb-0 position-sticky" style={{left: 0, right:0, top: 0, display: 'none'}}>
                {colgroup}
                {header}
            </Table>
            <Table className="mb-0" ref={tableRef}>
                {colgroup}
                {header}
                <tbody className="border-top-0">
                    {rows}
                </tbody>
            </Table>
        </div>
    )

}

export default ListTable
