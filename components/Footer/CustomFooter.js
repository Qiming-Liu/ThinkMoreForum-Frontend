import { useState, useEffect } from 'react';
import parser from 'html-react-parser';
import { getComponentByName } from '../../services/Public';

const CustomFooter = () => {
  const [customFooter, setCustomFooter] = useState('');
  useEffect(() => {
    const getFooter = async () => {
      const { data: response } = await getComponentByName('footer');
      setCustomFooter(response.code);
    };
    getFooter();
  }, []);
  return parser(customFooter);
};

export default CustomFooter;
