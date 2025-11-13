import { FaRegStar } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import type { OtherInfoChildType, PossibleIconsOtherInfoChild } from "../../types/types";




const possibleIcons: PossibleIconsOtherInfoChild = {
  star: <FaRegStar />,
  mail: <LuMail />,
};

function OtherInfoChild({ icon, iconTitle, info, infoValue }: OtherInfoChildType) {
  return (
    <div className="other-info-child">
      <div className="top flex items-center gap-1">
        <div className="icon text-xl">
          {possibleIcons[icon]}
        </div>
        <div className="div font-bold"> {iconTitle}</div>
      </div>
      <div className="bottom">
        <div className="text">
          <span>{info}</span>
          {infoValue && <span> : {infoValue}</span>}
        </div>
      </div>
    </div>
  );
}

export default OtherInfoChild;
