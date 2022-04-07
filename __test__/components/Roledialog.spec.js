import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RoleDialog from '../../components/Role/RoleDialog';

describe('<Roledialog />', () => {
  it('should pass value to input', () => {
    const { getByRole } = render(
      <RoleDialog
        role={{}}
        setRole={() => {}}
        headerList={[]}
        open
        DialogClose={() => {}}
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
        headerList={[]}
        open
        DialogClose={() => {}}
      />,
    );
    const button = getByRole('button', {
      name: /Add/i,
    });
    fireEvent.click(button);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
