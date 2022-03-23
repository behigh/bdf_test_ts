import * as React from 'react'

const Center: React.FC = ({children}) => {
    return (
        <div className="flex-fill d-flex align-items-center justify-content-center">{children}</div>
    )
}

export default Center
