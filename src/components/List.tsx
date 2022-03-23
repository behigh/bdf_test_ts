import * as React from 'react'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {useListActions} from '../hooks/useListActions'
import Loading from './Loading'
import {Alert, Pagination, Dropdown, Stack, DropdownButton} from 'react-bootstrap'
import Center from './Center'
import ListTable from './ListTable'

const List: React.FC = () => {
    const {data, order, page, pages, perpage, loading, error} = useTypedSelector(state => state.list)
    const {loadData, setOrder, setPerPage, setPage} = useListActions()

    React.useEffect(() => {
        loadData()
    }, [])

    const pagesNav = React.useMemo(() => {
        const pagination = []

        if (pages > 1) {
            for (let p = 1; p <= pages; p++) {
                pagination.push(<Pagination.Item key={p} active={p === page} onClick={(p => () => setPage(p))(p)}>{p}</Pagination.Item>)
            }
        }

        const pp = [10, 25, 50, 100]
        const dropDownItems: any[] = []

        pp.forEach(i => {
            if (i !== perpage) {
                // @ts-ignore
                dropDownItems.push(<Dropdown.Item key={i} onClick={(e) => e.preventDefault() || setPerPage(i)}>{i} / Page</Dropdown.Item>)
            }
        })

        return (
            <Stack direction="horizontal" gap={3}>
                {pagination.length ? <Pagination className="mb-0">{pagination}</Pagination> : null}
                <DropdownButton id="dropdown-basic-button" variant="outline-primary" title={`${perpage} / Page`}>
                    {dropDownItems}
                </DropdownButton>
            </Stack>
        )

    }, [page, perpage, pages])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <Center>
                <Alert variant="danger">
                    <Alert.Heading>An error has occurred!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Center>
        )
    }

    const itemsFrom = (page - 1) * perpage
    const itemsTo = Math.min(data.length, ((page - 1) * perpage) + perpage)


    return (
        <Stack direction="vertical" className="flex-fill" gap={2}>
            <div className="d-flex flex-column flex-fill">
                <ListTable items={data.slice(itemsFrom, itemsTo)} order={order} setOrder={setOrder} />
            </div>
            {pagesNav}
        </Stack>

    )
}

export default List
