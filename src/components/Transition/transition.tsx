import React from "react";
import {CSSTransition} from "react-transition-group";
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

type  AnimationName='zoom-in-left' |'zoom-in-right' |'zoom-in-top' |'zoom-in-bottom' ;


type TransitionProps = CSSTransitionProps & {
    animation?:AnimationName
}

const Transition:React.FC<TransitionProps>=(props)=>{
    const {
        children,
        classNames,
        animation,
        ...restProps
    }=props

    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
        {...restProps}
        >
            {children}
        </CSSTransition>
    )

}

Transition.defaultProps={
    animation:'zoom-in-left',
    unmountOnExit:true,
    appear:true
}

export default Transition
