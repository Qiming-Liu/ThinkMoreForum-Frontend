import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { putComponent } from '../../services/Component';
import { getComponentByName } from '../../services/Public';
import CodeEditor from './CodeEditor';
import hotToast from '../../utils/hotToast';
import { setFooterAction } from '../../store/actions/signAction';

interface Footer {
  id: string;
  name: string;
  code: string;
}

const SetFooter = () => {
  const dispatch = useDispatch();
  const [footer, setFooter] = useState<Footer>({ id: '', name: '', code: '' });
  const [footerCode, setFooterCode] = useState<string>('');
  useEffect(() => {
    const getFooter = async () => {
      const { data } = await getComponentByName('footer');
      setFooter(data);
      setFooterCode(data.code);
    };
    getFooter();
  }, []);
  return (
    <>
      <CodeEditor code={footerCode} setCode={setFooterCode} />
      <Button
        sx={{ mt: 2, mb: 2 }}
        variant="outlined"
        onClick={async () => {
          await putComponent({
            id: footer.id,
            name: footer.name,
            code: footerCode,
          });
          hotToast('success', 'Footer is changed');
          dispatch(
            setFooterAction({
              id: footer.id,
              name: footer.name,
              code: footerCode,
            }),
          );
        }}
      >
        Submit Changes
      </Button>
    </>
  );
};

export default SetFooter;
