import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Role from '../../components/Role';

describe('<Role />', () => {
  it('should show role dialog', () => {
    render(<Role />);
    fireEvent.click(screen.getByRole('button', { name: /Add Role/i }));
    expect(screen.getByText('New role')).toBeInTheDocument();
  });
});
