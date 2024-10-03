interface ElementDescriptionProps {
  text: string;
}

const ElementDescription = ({ text }: ElementDescriptionProps) => {
  return <p>{text}</p>;
};

export default ElementDescription;
