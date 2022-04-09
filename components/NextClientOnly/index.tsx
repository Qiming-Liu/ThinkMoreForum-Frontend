import React, { useState, useEffect } from 'react';

const NextClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return mounted && <>{children}</>;
};

export default NextClientOnly;
