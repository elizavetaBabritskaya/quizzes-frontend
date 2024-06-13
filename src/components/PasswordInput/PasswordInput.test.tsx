import React, { useCallback } from 'react';
import { act} from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import PasswordInput from './PasswordInput';


describe('PasswordInput component tests', () => {
  it('render correct', () => {
    render(<PasswordInput/>);
    const primaryHeader = document.getElementsByClassName('form__input_password ')[0];
    expect(primaryHeader).toBeInTheDocument();
    });
});
