import { useState, useEffect } from 'react';
import parser from 'html-react-parser';
import { getComponentByName } from '../../services/Public';

const CustomFooter = () => {
  const [customFooter, setCustomFooter] = useState('');
  useEffect(() => {
    try {
    const getFooter = async () => {
      const { data: response } = await getComponentByName('footer');
      setCustomFooter(response.code);
    };
    getFooter();
    } catch (err) {
      console.log(err);
    };
  }, []);
  return (parser(customFooter));
};

export default CustomFooter;
