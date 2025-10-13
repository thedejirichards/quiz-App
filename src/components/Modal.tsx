import { LuPartyPopper } from "react-icons/lu";
import type { ModalType } from "../types/types";

const modalUtils = {
  icon: {
    party: <LuPartyPopper className="text-white h-1/2 w-1/2" />,
  },
};

function Modal({
  headerText,
  subtext,
  displayIcon,
  actionMainContent = "",
  actionOtherContent = "",
  mainAction,
  otherAction
}: ModalType) {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-black/80 absolute top-0 start-0 z-10">
      <div
        className={`modal flex flex-col ${
          actionMainContent && actionOtherContent ? "" : "justify-between"
        } bg-backgroundColor opacity-100 z-20 w-[528px] h-[320px] rounded-2xl`}
      >
        <div className="main-content flex-[5] rounded-t-2xl p-8">
          <div className="card flex items-center justify-center w-16 h-16 bg-deepGreen rounded-xl">
            {modalUtils.icon[displayIcon as keyof typeof modalUtils.icon]}
          </div>
          <div className="text-content mt-6">
            <div className="header-content font-montserrat font-bold text-3xl">
              {headerText}
            </div>
            <div className="p font-montserrat text-mytext">{subtext}</div>
          </div>
          <div
            className={`action-div w-full flex gap-2 items-center ${
              actionMainContent && actionOtherContent ? "mt-4" : "mt-16"
            }`}
          >
            {actionOtherContent && (
              <button onClick={otherAction} className="action-other flex-1 h-12 rounded-md text-deepGreen font-montserrat text-md font-semibold border-2 border-deepGreen flex items-center justify-center">
                {actionOtherContent}
              </button>
            )}
            {actionMainContent && (
              <button onClick={mainAction} className="action-main flex-1 h-12 rounded-md text-white font-montserrat text-md bg-deepGreen border-2 border-deepGreen flex items-center justify-center">
                {actionMainContent}
              </button>
            )}
          </div>
        </div>
        {actionMainContent && actionOtherContent ? (
          <div className="buttom-color flex-[0.5] bg-deepGreen rounded-b-2xl"></div>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;
