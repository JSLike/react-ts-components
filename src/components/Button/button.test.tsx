import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Button, {ButtonProps, ButtonSize, ButtonType} from './Button';


const defaultProps = {
    onClick:jest.fn()
}

const testProps:ButtonProps={
    btnType:ButtonType.Primary,
    size:ButtonSize.Large,
    className:'testClass'
}

describe('test Button component',()=>{

    it('should render the correct default button ',()=>{
        const wrapper =render(<Button {...defaultProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        userEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled()
    })


    it('should render the correct component based on different props',()=>{
        const wrapper =render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice');
        expect(element).toBeInTheDocument();

        expect(element).toHaveClass('btn-primary btn-lg testClass');


    })
    it('should render a link when btnType equals link and href is provided',()=>{

    })
    it('should render disabled button when disabled set to true',()=>{

    })

})
