import React from 'react';

interface ElementLabelProps {
  text: string;
}

const ElementLabel: React.FC<ElementLabelProps> = ({ text }) => {
  return <label>{text}</label>;
};

export default ElementLabel;
