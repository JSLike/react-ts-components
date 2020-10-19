import React, {useContext} from "react";
import classNames from "classnames";
import  {MenuContext} from './menu';

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children, ...restProps} = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', classNames, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index)
        }
    };
    return (
        <li className={classes} style={style} onClick={handleClick} {...restProps}>
            {children}
        </li>
    )
}

//MenuItem实例上注册一个displayName属性(声明文件已记录displayName)
MenuItem.displayName = 'MenuItem';

export default MenuItem
