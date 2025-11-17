import { useState } from "react";
import { useProfile } from "../../contexts/ProfileContextProvider";
import { useUserMgtAuth } from "../../contexts/UserMgtContextProvider";
import ProfileTableTab from "./ProfileTableTab";
import { Button } from "../Button";
import NumberList from "./NumberList";

function TabAndTable() {
  const [currPage, setCurrPage] = useState<number>(1);
  const { currentLoggedInUser, registeredUsers } = useUserMgtAuth();
  const { getDateFromTimestamp, activeDifficultyType } = useProfile();
  const userQuizHistory = currentLoggedInUser?.quizHistory;
  const filteredUserQuizHistory =
    activeDifficultyType === "All"
      ? userQuizHistory
      : userQuizHistory?.filter(
          (history) => history.difficultyType === activeDifficultyType
        );
  const dataPerTable = 5;
  const startIndex = (currPage - 1) * dataPerTable;
  const userQuizHistoryLength = filteredUserQuizHistory
    ? filteredUserQuizHistory.length
    : 0;
  const totalPages = Math.ceil(userQuizHistoryLength / dataPerTable);
  const endIndex = startIndex + dataPerTable;
  const finalPage = currPage === totalPages;

  const userQuizHistoryToDisplay = filteredUserQuizHistory
    ? filteredUserQuizHistory.slice(startIndex, endIndex)
    : [];
  if (!userQuizHistory) return <div>Empty table</div>;

  const getRank = (currquizId: string) => {
    if (!Array.isArray(registeredUsers)) return [];
    const usersAndQuizScores = registeredUsers
      .flatMap((user) =>
        user.quizHistory.map((quiz) => ({
          rankScore: quiz.rankScore,
          quizId: quiz.quizId,
          userId: user.id,
          userName: user.name,
          difficultyType: quiz.difficultyType,
        }))
      )
      .sort((a, b) => b.rankScore - a.rankScore);

    const quizScoresForLoggedInUser = usersAndQuizScores.filter(
      (user) => user.userId === currentLoggedInUser.id
    );

    const rank =
      quizScoresForLoggedInUser.findIndex(
        (quiz) => quiz.quizId === currquizId
      ) + 1;
    return rank;
  };

  const handlePrev = () => {
    setCurrPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    if (finalPage) return;
    setCurrPage((prev) => (prev < endIndex ? prev + 1 : prev));
  };

  return (
    <div className="tab-n-table w-full flex-7 mt-4">
      <ProfileTableTab setCurrPage={setCurrPage}/>
      <div className="table w-full my-4 rounded-xl">
        <table className="table-auto w-full bg-white rounded-xl">
          <thead className="w-full bg-[#F9FAFB] ">
            <tr className=" w-full">
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[5%] rounded-xl">
                S/N
              </th>
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[30%]">
                Quiz ID
              </th>
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[10%]">
                Score
              </th>
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[10%]">
                Date
              </th>
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[10%]">
                Rank
              </th>
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[10%]">
                Status
              </th>
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[15%] rounded-xl">
                Dificulty Type
              </th>
            </tr>
          </thead>
          <tbody>
            {userQuizHistoryToDisplay.map((quizHistory, index) => {
              const quizId = quizHistory.quizId;
              const serialNumber = startIndex + index + 1;
              const quizScore = Math.floor(quizHistory.percentScore);
              const quizDate = getDateFromTimestamp(quizHistory.dateStamp);
              const status = quizHistory.remark;
              const difficultyType = quizHistory.difficultyType;
              const rank = getRank(quizId);
              return (
                <tr key={quizId}>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {serialNumber}
                  </td>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {quizId}
                  </td>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {quizScore}
                  </td>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {quizDate}
                  </td>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {rank}
                  </td>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {status}
                  </td>
                  <td className="px-8 py-5 border-b-2 border-borderGrey">
                    {difficultyType}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="py-5 w-full">
                <div className="flex justify-between items-center w-full px-8">
                  <Button name="prev" action={handlePrev} />
                  <NumberList
                    totalNumbersToDisplay={totalPages}
                    currActive={currPage}
                  />
                  <Button name="next" action={handleNext} />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default TabAndTable;
