import React,{useState,createContext} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from "./menuItem";

type MenuMode ='horizontal' | 'vertical';
type SelectCallback=(selectedIndex:string) => void;
export interface MenuProps{
    defaultIndex?:string;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallback,
    defaultOpenSubMenus?:string[]   //默认展开菜单index
}
interface IMenuContext {
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode,
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0'});

const Menu:React.FC<MenuProps> = (props) =>{

    const {className,mode,style,children,defaultIndex,onSelect,defaultOpenSubMenus} = props;
    const [currentActive,setActive]=useState(defaultIndex)
    const classes =classNames('viking-menu',className,{
        'menu-vertical': mode==='vertical',
        'menu-horizontal':mode!=='vertical'
    })
    //装饰者;
    const handleClick = (index:string) =>{
        setActive(index);
        if (onSelect){
            onSelect(index)
        }
    }

    const passedContext:IMenuContext ={
        index:currentActive ? currentActive : '0',
        onSelect:handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = () =>{
        //React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;//可能为null或undefined，所以需要类型断言
            const {displayName} =childElement.type;//获取到children type 上的自定义属性
            if (displayName === 'MenuItem' || displayName === 'SubMenu'){
                //循环的index和context中的index对比即可
                return React.cloneElement(childElement,{index:index.toString()}); //以 element 元素为样板克隆并返回新的 React 元素
            }else {
                console.error('Warning : Menu has a child which is not a MenuItem component');
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps={
    defaultIndex:'0',
    mode:'horizontal',
    defaultOpenSubMenus:[]

}
export default Menu
