import React, { useCallback } from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import MyButton from './MyButton';


describe('Button component tests', () => {
  it('render correct', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<MyButton type='primary' block={true} className='' disabled={false} onChange={() => {mockOnClick}}>Test button</MyButton>);
    expect(getByText('Test button')).toBeInTheDocument();
    });

  it('enabled click correct', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <MyButton type='primary' block={true} disabled={false} className='sendButton' onChange={mockOnClick}> Test button </MyButton>
    );

    act(() => {
      fireEvent.click(getByText('Test button'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    expect(getByText('Test button')).toBeInTheDocument();
    
  });

  it('disabled click correct', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <MyButton type='primary' block={true} className='sendButton' onChange={mockOnClick} disabled={true}> Test button </MyButton>
    );

    act(() => {
      fireEvent.click(getByText('Test button'));
      expect(mockOnClick).toHaveBeenCalledTimes(0);
    });

    expect(getByText('Test button')).toBeInTheDocument();
  });

  it('disabled style correct', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <MyButton type='primary' block={true} className='sendButton' onChange={mockOnClick} disabled={true}> Test button </MyButton>
    );

    expect(document.getElementsByClassName('button')[0]).toHaveClass('button_disabled');
    expect(getByText('Test button')).toBeInTheDocument();
    
  });

  it('add className', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <MyButton type='primary' block={true} className='testClass' onChange={mockOnClick} disabled={false}>Test button</MyButton>
    );
    expect(document.getElementsByClassName('button')[0]).toHaveClass('testClass');
    expect(getByText('Test button')).toBeInTheDocument();
  })
});
