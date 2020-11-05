import React, {useContext, useState, FunctionComponentElement} from "react";
import classNames from 'classnames';
import {MenuContext} from './menu'
import {MenuItemProps} from "./menuItem";
import Icon from "../Icon/Icon";
import Transition from '../Transition/transition'
// import {CSSTransition} from "react-transition-group";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {index, title, className, children} = props;
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus;
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpened);
    const classes = classNames('menu-item submenu-item', className, {
        //context.index为两种形式 "0" | "0-1" ,结构使得菜单子元素点击后，父级元素对应添加active
        'is-active': context.index.split('-')[0] === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    //分别根据mode挂载点击和鼠标移入方法
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
        },
    } : {}
    const renderChildren = () => {
        const classes = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning :SubMenu has a child which is not a MenuItem')
            }
        })
        return (
            <Transition in={menuOpen} timeout={300}
                           classNames='zoom-in-top'
                           appear
                           unmountOnExit={true}
            >
                <ul className={classes}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    //移入事件挂载到父级，点击事件挂载到title标题
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-item" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'

export default SubMenu
