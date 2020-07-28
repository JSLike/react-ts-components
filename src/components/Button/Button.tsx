import React from "react";
import classNames from "classnames";
export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary='primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
interface BaseButtonProps {
    className?:string;
    disabled?:boolean;
    size?:ButtonSize;
    btnType?:ButtonType;
    children:React.ReactNode;
    href?:string
}

type NativeButtonPros = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonPros = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonPros & AnchorButtonPros>


const Button:React.FC<ButtonProps>=(props):any=>{
    const {
        btnType,
        disabled,
        size,
        children,
        href,
        className,  //用户自定义的的className
        ...restProps    //取出剩余属性
    }=props;
//btn, btn-lg ,btn-primary
    const classes = classNames('btn',{
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType===ButtonType.Link)&&disabled
    })
    if (btnType===ButtonType.Link && href){
        return (
            <a
                {...restProps }
                href={href}
                className={classes}
            >
                {children}
            </a>
        )
    }else{
        return (
            <button
                {...restProps }

                className={classes}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps={
    disabled:false,
    btnType:ButtonType.Default
}

export default Button
