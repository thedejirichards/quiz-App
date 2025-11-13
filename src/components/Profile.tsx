import { BiSolidUserCircle } from "react-icons/bi";
import OtherInfoChild from "./profileComponent/OtherInfoChild";
import TabAndTable from "./profileComponent/TabAndTable";
import { ProfileContextProvider } from "../contexts/ProfileContextProvider";

function Profile() {
  return (
    <ProfileContextProvider>
      <div className="customize h-full flex flex-col items-center justify-between">
        <div className="welcome-content flex flex-col justify-center h-full w-10/12 mx-auto py-5">
          <div className="customization-boxes-parent flex flex-col h-full">
            <div className="title h1 text-3xl font-bold mb-5 w-full text-center">
              Profile
            </div>
            <div className="content h-full flex flex-col gap-5">
              <div className="top-large-card p-6 w-full bg-white border-2 border-borderGrey rounded-xl flex-1 flex items-center justify-between">
                <div className="main-info flex items-center gap-2">
                  <BiSolidUserCircle className="text-7xl text-[#4A5568]" />
                  <div className="name-and-id flex flex-col">
                    <div className="h1 font-bold text-xl ">
                      Richard Oladeji
                    </div>
                    <div className="font-light">
                      <span>User ID: </span>
                      <span>12345678</span>
                    </div>
                  </div>
                </div>
                <div className="other-info flex gap-8">
                  <OtherInfoChild
                    icon="star"
                    iconTitle="GR"
                    info="Global Rank"
                    infoValue="3"
                  />
                  <OtherInfoChild
                    icon="mail"
                    iconTitle="Mail"
                    info="thedejirichards@gmail.com"
                  />
                  <div className="child"></div>
                </div>
              </div>
              <TabAndTable />
            </div>
          </div>
        </div>
      </div>
    </ProfileContextProvider>
  );
}

export default Profile;