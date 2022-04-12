import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PasswordRecovery from '../../components/PasswordRecovery';

describe('<PasswordRecovery />', () => {
  it('should pass value to input', () => {
    render(<PasswordRecovery />);
    const input = screen.getByRole('textbox', {
      name: /email address/i,
    });
    act(() => {
      fireEvent.change(input, { target: { value: 'alfred.minjiang@gmail' } });
    });
    const { value } = input;
    expect(value).toBe('alfred.minjiang@gmail');
  });
});
