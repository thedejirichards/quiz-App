import { useState } from "react";
import { useUserMgtAuth } from "../../contexts/UserMgtContextProvider";
import { Button } from "../Button";
import NumberList from "./NumberList";
import LeaderboardTableTab from "./LeaderBoardTableTab";

function TabAndTableLeaderboard() {
  const [currPage, setCurrPage] = useState<number>(1);
  const [activeDifficultyType, setActiveDifficultyType] =
    useState<string>("All");
  const { registeredUsers } = useUserMgtAuth();

  const getDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // e.g., "11/13/2025"
  };

  const toCheck = registeredUsers
    ?.filter((user) => user.quizHistory.length > 0)
    .map((user) => user.quizHistory.sort((a, b) => b.rankScore - a.rankScore));
  console.log(toCheck);
  const usersAndScore =
    registeredUsers
      ?.filter((user) => user.quizHistory.length > 0)
      ?.flatMap((user) => {
        const highestQuiz = user.quizHistory.sort(
          (a, b) => b.rankScore - a.rankScore
        )[0];

        const updatedUserData = {
          userName: user.name,
          userId: user.id,
          userHigestRankQuizId: highestQuiz?.quizId || "N/A",
          userHigestRankQuizDate: highestQuiz?.dateStamp || 0,
          userHighestRankScore: highestQuiz?.rankScore || 0,
          userHigestPercentScoreAll: highestQuiz?.percentScore || 0,
          userHigestPercentStatusAll: highestQuiz?.remark || "N/A",
          userHiggestRankDifficultyType: highestQuiz?.difficultyType || "N/A",
          userEasyQuizData: (() => {
            const easyQuiz = user.quizHistory
              .filter((q) => q.difficultyType === "Easy")
              .sort((a, b) => b.rankScore - a.rankScore)[0];
            if (!easyQuiz) return;
            return {
              highestPercentScore: easyQuiz.percentScore,
              highestRankScore: easyQuiz.rankScore,
              status: easyQuiz.remark,
              date: easyQuiz.dateStamp,
              quizId: easyQuiz.quizId,
              difficultyType: easyQuiz.difficultyType,
            };
          })(),
          userIntermediateQuizData: (() => {
            const intermediateQuiz = user.quizHistory
              .filter((q) => q.difficultyType === "Intermediate")
              .sort((a, b) => b.rankScore - a.rankScore)[0];
            if (!intermediateQuiz) return;
            return {
              highestPercentScore: intermediateQuiz.percentScore,
              highestRankScore: intermediateQuiz.rankScore,
              status: intermediateQuiz.remark,
              date: intermediateQuiz.dateStamp,
              quizId: intermediateQuiz.quizId,
              difficultyType: intermediateQuiz.difficultyType,
            };
          })(),
          userDifficultQuizData: (() => {
            const difficultQuiz = user.quizHistory
              .filter((q) => q.difficultyType === "Difficult")
              .sort((a, b) => b.rankScore - a.rankScore)[0];
            if (!difficultQuiz) return;
            return {
              highestPercentScore: difficultQuiz.percentScore,
              highestRankScore: difficultQuiz.rankScore,
              status: difficultQuiz.remark,
              date: difficultQuiz.dateStamp,
              quizId: difficultQuiz.quizId,
              difficultyType: difficultQuiz.difficultyType,
            };
          })(),
        };

        return [updatedUserData];
      })
      .sort(
        (a, b) => b.userHigestPercentScoreAll - a.userHigestPercentScoreAll
      ) || [];

  const filteredUsersAndScore =
    activeDifficultyType === "All"
      ? usersAndScore
      : usersAndScore.filter((userData) => {
          if (activeDifficultyType === "Easy") {
            return !!userData.userEasyQuizData;
          }
          if (activeDifficultyType === "Intermediate") {
            return !!userData.userIntermediateQuizData;
          }
          if (activeDifficultyType === "Difficult") {
            return !!userData.userDifficultQuizData;
          }
          return true;
        });

  const dataPerTable = 5;
  const startIndex = (currPage - 1) * dataPerTable;
  const allUsers = filteredUsersAndScore ? filteredUsersAndScore.length : 0;
  const totalPages = Math.ceil(allUsers / dataPerTable);
  const endIndex = startIndex + dataPerTable;
  const finalPage = currPage === totalPages;

  const usersToBeDisplayed = filteredUsersAndScore
    ? filteredUsersAndScore.slice(startIndex, endIndex)
    : [];

  if (!filteredUsersAndScore) return <div>Empty table</div>;

  // const getRank = (currquizId: string) => {
  //   if (!Array.isArray(registeredUsers)) return [];
  //   const rankedUserData = filteredUsersAndScore.sort(
  //     (a, b) => b.userHighestRankScore - a.userHighestRankScore
  //   );

  //   const rank = rankedUserData.findIndex(user => user.userHigestRankQuizId === currquizId)
  //   return rank + 1

  // };

  const handlePrev = () => {
    setCurrPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    if (finalPage) return;
    setCurrPage((prev) => (prev < endIndex ? prev + 1 : prev));
  };

  return (
    <div className="tab-n-table w-full flex-7 mt-4">
      <LeaderboardTableTab
        setCurrPage={setCurrPage}
        activeDifficultyType={activeDifficultyType}
        setActiveDifficultyType={setActiveDifficultyType}
      />
      <div className="table w-full my-4 rounded-xl">
        <table className="table-auto w-full bg-white rounded-xl">
          <thead className="w-full bg-[#F9FAFB] ">
            <tr className=" w-full">
              <th className="text-left px-8 py-5 border-b-2 border-borderGrey w-[5%] rounded-xl">
                S/N
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[15%] rounded-xl">
                Name
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[25%]">
                Quiz ID
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[10%]">
                Rank Score
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[10%]">
                Score
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[10%]">
                Date
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[7%]">
                Rank
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[10%]">
                Status
              </th>
              <th className="text-left px-4 py-5 border-b-2 border-borderGrey w-[15%] rounded-xl">
                Dificulty Type
              </th>
            </tr>
          </thead>
          <tbody>
            {usersToBeDisplayed &&
              usersToBeDisplayed.map((userData, index) => {
                const serialNumber = startIndex + index + 1;
                const quizId =
                  activeDifficultyType === "All"
                    ? userData.userHigestRankQuizId
                    : activeDifficultyType === "Easy"
                    ? userData.userEasyQuizData?.quizId ?? "N/A"
                    : activeDifficultyType === "Intermediate"
                    ? userData.userIntermediateQuizData?.quizId ?? "N/A"
                    : activeDifficultyType === "Difficult"
                    ? userData.userDifficultQuizData?.quizId ?? "N/A"
                    : "N/A";

                const quizScore =
                  activeDifficultyType === "All"
                    ? Math.floor(userData.userHigestPercentScoreAll)
                    : activeDifficultyType === "Easy"
                    ? userData.userEasyQuizData
                      ? Math.floor(
                          userData.userEasyQuizData.highestPercentScore
                        )
                      : "N/A"
                    : activeDifficultyType === "Intermediate"
                    ? userData.userIntermediateQuizData
                      ? Math.floor(
                          userData.userIntermediateQuizData.highestPercentScore
                        )
                      : "N/A"
                    : activeDifficultyType === "Difficult"
                    ? userData.userDifficultQuizData
                      ? Math.floor(
                          userData.userDifficultQuizData.highestPercentScore
                        )
                      : "N/A"
                    : "N/A";
                const quizRankScore =
                  activeDifficultyType === "All"
                    ? Math.floor(userData.userHighestRankScore)
                    : activeDifficultyType === "Easy"
                    ? userData.userEasyQuizData
                      ? Math.floor(userData.userEasyQuizData.highestRankScore)
                      : "N/A"
                    : activeDifficultyType === "Intermediate"
                    ? userData.userIntermediateQuizData
                      ? Math.floor(
                          userData.userIntermediateQuizData.highestRankScore
                        )
                      : "N/A"
                    : activeDifficultyType === "Difficult"
                    ? userData.userDifficultQuizData
                      ? Math.floor(
                          userData.userDifficultQuizData.highestRankScore
                        )
                      : "N/A"
                    : "N/A";

                const quizDate =
                  activeDifficultyType === "All"
                    ? getDateFromTimestamp(userData.userHigestRankQuizDate)
                    : activeDifficultyType === "Easy"
                    ? userData.userEasyQuizData
                      ? getDateFromTimestamp(userData.userEasyQuizData.date)
                      : "N/A"
                    : activeDifficultyType === "Intermediate"
                    ? userData.userIntermediateQuizData
                      ? getDateFromTimestamp(
                          userData.userIntermediateQuizData.date
                        )
                      : "N/A"
                    : activeDifficultyType === "Difficult"
                    ? userData.userDifficultQuizData
                      ? getDateFromTimestamp(
                          userData.userDifficultQuizData.date
                        )
                      : "N/A"
                    : "N/A";

                const status =
                  activeDifficultyType === "All"
                    ? userData.userHigestPercentStatusAll
                    : activeDifficultyType === "Easy"
                    ? userData.userEasyQuizData!.status
                    : activeDifficultyType === "Intermediate"
                    ? userData.userIntermediateQuizData!.status
                    : activeDifficultyType === "Difficult"
                    ? userData.userDifficultQuizData!.status
                    : "N/A";

                const difficultyType =
                  activeDifficultyType === "All"
                    ? userData.userHiggestRankDifficultyType
                    : activeDifficultyType === "Easy"
                    ? userData.userEasyQuizData!.difficultyType
                    : activeDifficultyType === "Intermediate"
                    ? userData.userIntermediateQuizData!.difficultyType
                    : activeDifficultyType === "Difficult"
                    ? userData.userDifficultQuizData!.difficultyType
                    : "N/A";
                const userName =
                  activeDifficultyType === "All"
                    ? userData.userName
                    : activeDifficultyType === "Easy"
                    ? userData.userName
                    : activeDifficultyType === "Intermediate"
                    ? userData.userName
                    : activeDifficultyType === "Difficult"
                    ? userData.userName
                    : "N/A";
                const rank = "-";
                // const rank = getRank(quizId);
                return (
                  <tr key={quizId}>
                    <td className="px-8 py-5 border-b-2 border-borderGrey">
                      {serialNumber}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {userName}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {quizId}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {quizRankScore}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {quizScore}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {quizDate}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {rank}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {status}
                    </td>
                    <td className="px-4 py-5 border-b-2 border-borderGrey">
                      {difficultyType}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={9} className="py-5 w-full">
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

export default TabAndTableLeaderboard;
