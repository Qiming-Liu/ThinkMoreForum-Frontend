import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RoleDialog from '../../components/Role/components/RoleDialog';

describe('<Roledialog />', () => {
  it('should pass value to input', () => {
    const { getByRole } = render(
      <RoleDialog
        role={{}}
        setRole={() => {}}
        onClose={() => {}}
        headerList={[]}
      />,
    );
    const input = getByRole('textbox', {
      name: /role name/i,
    });
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should render nothing when click save button', () => {
    const { getByRole } = render(
      <RoleDialog
        role={{}}
        setRole={() => {}}
        onClose={() => {}}
        headerList={[]}
      />,
    );
    const button = getByRole('button', {
      name: /save/i,
    });
    fireEvent.click(button);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
