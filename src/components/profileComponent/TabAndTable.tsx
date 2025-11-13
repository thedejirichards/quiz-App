import { useProfile } from "../../contexts/ProfileContextProvider";
import { useUserMgtAuth } from "../../contexts/UserMgtContextProvider";
import ProfileTableTab from "./ProfileTableTab";

function TabAndTable() {
  const { currentLoggedInUser, registeredUsers } = useUserMgtAuth();

  const { getDateFromTimestamp } = useProfile();
  const userQuizHistory = currentLoggedInUser?.quizHistory;
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

    const rank = quizScoresForLoggedInUser.findIndex(quiz=> quiz.quizId === currquizId) + 1
    return rank;
  };

  return (
    <div className="tab-n-table w-full flex-7">
      <ProfileTableTab />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Quiz ID</th>
              <th>Score</th>
              <th>Date</th>
              <th>Rank</th>
              <th>Status</th>
              <th>Dificulty Type</th>
            </tr>
          </thead>
          <tbody>
            {userQuizHistory.map((quizHistory, index) => {
              const quizId = quizHistory.quizId;
              const serialNumber = index + 1;
              const quizScore = quizHistory.percentScore;
              const quizDate = getDateFromTimestamp(quizHistory.dateStamp);
              const status = quizHistory.remark;
              const difficultyType = quizHistory.difficultyType;
              const rank = getRank(quizId);
              return (
                <tr key={quizId}>
                  <td>{serialNumber}</td>
                  <td>{quizId}</td>
                  <td>{quizScore}</td>
                  <td>{quizDate}</td>
                  <td>{rank}</td>
                  <td>{status}</td>
                  <td>{difficultyType}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
}

export default TabAndTable;