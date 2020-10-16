import React,{useState,createContext} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from "./menuItem";

type MenuMode ='horizontal' | 'vertical';
type SelectCallback=(selectedIndex:number) => void;
export interface MenuProps{
    defaultIndex?:number;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallback
}
interface IMenuContext {
    index:number;
    onSelect?:SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index:0});

const Menu:React.FC<MenuProps> = (props) =>{

    const {className,mode,style,children,defaultIndex,onSelect} = props;
    const [currentActive,setActive]=useState(defaultIndex)
    const classes =classNames('viking-menu',className,{
        'menu-vertical': mode==='vertical'
    })
    //装饰;
    const handleClick = (index:number) =>{
        setActive(index);
        if (onSelect){
            onSelect(index)
        }
    }

    const passedContext:IMenuContext ={
        index:currentActive ? currentActive : 0,
        onSelect:handleClick
    }

    const renderChildren = () =>{
        //React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。

        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            // childElement.type.displayName
            const {displayName} =childElement.type;
            if (displayName === 'MenuItem'){
                //循环的index和context中的index对比即可
                return React.cloneElement(childElement,{index})

            }else {
                console.error('Warning : Menu has a child which is not a MenuItem component')
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
    defaultIndex:0,
    mode:'horizontal',

}
export default Menu
