import { IoSearchOutline } from "react-icons/io5";
import SelectBox from "./SelectBox";
import { useProfile } from "../../contexts/ProfileContextProvider";

function SortFunctionality() {
  const { searchBy, dispatch, sortby, sortOrder } = useProfile();
  return (
    <div className="flex items-center justify-between gap-1 w-fit">
      <div className="search px-3 flex gap-2 items-center border-2 border-gray-500 rounded-md h-11 focus:outline-0">
        <IoSearchOutline />
        <input
          type="text"
          value={searchBy}
          onChange={(e) =>
            dispatch({ type: "updateSearchBy", payload: e.target.value })
          }
          className="border-0 focus: outline-0"
          placeholder="Search Quiz Id"
        />
      </div>
      <SelectBox
        optionList={["sort by", "rank", "date"]}
        onChangeFunc={(value) =>
          dispatch({ type: "updateSortby", payload: value })
        }
        value={sortby}
      />
      <SelectBox
        optionList={["select", "ascending", "descending"]}
        onChangeFunc={(value) =>
          dispatch({ type: "updateSortOrder", payload: value })
        }
        value={sortOrder}
      />
    </div>
  );
}

export default SortFunctionality;
