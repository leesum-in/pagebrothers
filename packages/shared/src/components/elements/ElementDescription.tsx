import React from 'react';

interface ElementDescriptionProps {
  text: string;
}

const ElementDescription: React.FC<ElementDescriptionProps> = ({ text }) => {
  return <p>{text}</p>;
};

export default ElementDescription;
