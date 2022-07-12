import React from 'react';

export default function Layers({ children }:{ children:React.ReactNode }) {
  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  );
}
