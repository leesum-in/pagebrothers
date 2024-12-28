interface RsvpDoubleButtonProps {
  options: string[];
}

function RsvpButtons({ options }: RsvpDoubleButtonProps) {
  return (
    <div className="relative z-0 flex h-12 items-stretch -space-x-[1px] bg-white ">
      {options.map((option) => (
        <RsvpButton option={option} key={option} />
      ))}
    </div>
  );
}

export default RsvpButtons;

interface RsvpButtonProps {
  option: string;
}

function RsvpButton({ option }: RsvpButtonProps) {
  return (
    <label className="group relative h-full w-full cursor-pointer text-sm leading-relaxed">
      <input
        required
        name="formValues.db0cd3a3-50af-46a0-b0fb-7c67e6b78272"
        type="radio"
        className="peer absolute inset-0 opacity-0"
        value={option}
      />
      <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
        {option}
      </span>
    </label>
  );
}
