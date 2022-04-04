import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Role from '../../components/Role';

describe('<Role />', () => {
  it('should show role dialog', () => {
    render(<Role />);
    fireEvent.click(screen.getByRole('button', { name: /new role/i }));
    expect(screen.getByText('Create a new role')).toBeInTheDocument();
  });
});
