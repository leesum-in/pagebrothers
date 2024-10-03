interface ElementLabelProps {
  text: string;
}

const ElementLabel = ({ text }: ElementLabelProps) => {
  return <label>{text}</label>;
};

export default ElementLabel;
