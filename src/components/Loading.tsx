import * as React from 'react'
import {Spinner} from 'react-bootstrap'
import Center from './Center'

export enum LoadingAnimationTypes {
    border = 'border',
    grow = 'grow',
}

export enum LoadingSizeTypes {
    sm = 'sm',
}

export enum LoadingVariantTypes {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    light = 'light',
    dark = 'dark',
}

interface LoadingProps {
    animation?: LoadingAnimationTypes
    size?: LoadingSizeTypes
    variant?: LoadingVariantTypes
}

const Loading: React.FC<LoadingProps> = (props) => {
    return  (
        <Center>
            <Spinner
                animation={props.animation || LoadingAnimationTypes.border}
                variant={props.variant || LoadingVariantTypes.secondary}
                size={props.size}
            />
        </Center>
    )
}

export default Loading
