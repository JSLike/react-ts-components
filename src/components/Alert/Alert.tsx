import React from 'react';
import classNames from "classnames";
export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}

interface BaseAlertPros {
    alertType?:AlertType,
    title?: String,
    showClose?: Boolean,
    isShow?: Boolean
    children: React.ReactNode;
    hasClose?:Boolean,
    click?:any
}

type AlertProps = BaseAlertPros & React.ButtonHTMLAttributes<HTMLElement>
const Alert: React.FC<AlertProps> = (props): any => {
    let {title, isShow, children,hasClose,alertType,click} = props

    const classes=classNames('alert',{
        [`alert-${alertType}`]:alertType,
    })


    return (
        <div
            className={classes+(isShow?'':' onHide')}
        >
            <span className={'closeBtn'} style={{display:hasClose?'block':'none'}} onClick={click}>&times;</span>
            {
                title && (<div className={'titleBox'}>
                    {title}
                </div>)
            }
            <div className={'messageBox'}>
                {children}
            </div>


        </div>
    )

}

export default Alert
