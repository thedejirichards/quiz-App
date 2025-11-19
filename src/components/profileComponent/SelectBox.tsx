import { IoMdArrowDropdown } from "react-icons/io";
import type { SelectBoxTypes } from "../../types/types";

function SelectBox({ optionList, onChangeFunc, value }: SelectBoxTypes) {
  return (
    <div className="relative inline-block">
      <select
        name=""
        id=""
        onChange={(e) => onChangeFunc(e.target.value)}
        value={value}
        className="w-48 border-2 border-gray-500 rounded-md h-11 focus:outline-0 px-2 pr-8
                   appearance-none"
      >
        {optionList.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Custom arrow */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">
        <IoMdArrowDropdown className="text-2xl"/>
      </span>
    </div>
  );
}

export default SelectBox;
