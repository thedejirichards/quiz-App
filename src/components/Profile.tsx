import { BiSolidUserCircle } from "react-icons/bi";
import OtherInfoChild from "./profileComponent/OtherInfoChild";
import TabAndTable from "./profileComponent/TabAndTable";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";
import { useUserGlobalRank } from "../hooks/useUserGlobalRank";

function Profile() {
  const { currentLoggedInUser } = useUserMgtAuth();
  const { ur, userRank } = useUserGlobalRank();
  console.log(ur);
  if (!currentLoggedInUser) return;
  const userFullName = currentLoggedInUser.name;
  const userID = currentLoggedInUser.id;
  const userEmail = currentLoggedInUser.Email;
  return (
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
                  <div className="h1 font-bold text-xl ">{userFullName}</div>
                  <div className="font-light">
                    <span>User ID: </span>
                    <span>{userID}</span>
                  </div>
                </div>
              </div>
              <div className="other-info flex gap-8">
                <OtherInfoChild
                  icon="star"
                  iconTitle="GR"
                  info="Global Rank"
                  infoValue={userRank?.toString()}
                />
                <OtherInfoChild icon="mail" iconTitle="Mail" info={userEmail} />
                <div className="child"></div>
              </div>
            </div>
            <TabAndTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
