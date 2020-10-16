import React from 'react';
import {render,RenderResult,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Menu ,{MenuProps} from "./menu";
import MenuItem from "./menuItem";

//定义测试需要的属性，node函数
const testProps:MenuProps = {
    defaultIndex:0,
    onSelect:jest.fn(),
    className:'test',
}
const testVerProps:MenuProps = {
    defaultIndex:0,
    mode:'vertical'
}
const generateMenu = (props:MenuProps) =>{
    return (
        <Menu {...props}>
            <MenuItem >
                active
            </MenuItem>
            <MenuItem  disabled>
                disabled
            </MenuItem>
            <MenuItem >
                xyz
            </MenuItem>
        </Menu>
    )
}
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement;
describe('test Menu and MenuItem component',()=>{
    //每个case开始之前执行
    beforeEach(()=>{
        wrapper =render(generateMenu(testProps))
        // wrapper.container.getElementsByTagName()//也可以获取元素
        menuElement=wrapper.getByTestId('test-menu');
        activeElement=wrapper.queryByText('active');
        disabledElement = wrapper.queryByText('disabled');
    })

    it('should render correct Menu and MenuItem based on default props',  ()=> {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('viking-menu test');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click items should change active and call the right callback',  ()=> {
        const thirdItem = wrapper.queryByText('xyz');
        userEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        userEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    });
    it('should render vertical mode when mode is set to vertical',  ()=> {
        cleanup();
        const wrapper = render(generateMenu(testVerProps));
        const menuElement =wrapper.queryByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    });
})
