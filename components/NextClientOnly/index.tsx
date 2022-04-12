import React, { useState, useEffect } from 'react';

const NextClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <>{children}</>;
  }
  return null;
};

export default NextClientOnly;
