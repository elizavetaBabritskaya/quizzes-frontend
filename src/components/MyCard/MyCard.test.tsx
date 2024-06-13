import React, { useCallback } from 'react';
import { act} from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import MyCard from './MyCard';


describe('Card component tests', () => {
  it('render correct', () => {
    render(<MyCard/>);
    const primaryHeader = document.getElementsByClassName('layout_card')[0];
    expect(primaryHeader).toBeInTheDocument();
    });

});
