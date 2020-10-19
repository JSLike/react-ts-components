import React from 'react';
import {render, RenderResult, cleanup, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Menu, {MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";


//定义测试需要的属性，node函数
const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>

            <SubMenu title={'子标题'}>
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const createStyleFile = () => {
    const cssFile: string = `
    .viking-submenu {
        display:none;
    }
    .viking-submenu.menu-opened {
        display:block
    }
    `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
    //每个case开始之前执行
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        // wrapper.container.getElementsByTagName()//也可以获取元素
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('viking-menu test');
        expect(menuElement.querySelectorAll(' :scope > li ').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz');
        userEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        userEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    });
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const wrapper = render(generateMenu(testVerProps));
        const menuElement = wrapper.queryByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    });

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropdownElement = wrapper.getByText('子标题');
        userEvent.hover(dropdownElement)
        await waitFor(() => expect(wrapper.queryByText('drop1')).toBeVisible())
        userEvent.click(wrapper.getByText('drop1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        userEvent.unhover(dropdownElement)
        await waitFor(() => expect(wrapper.queryByText('drop1')).not.toBeVisible())
    })


})
