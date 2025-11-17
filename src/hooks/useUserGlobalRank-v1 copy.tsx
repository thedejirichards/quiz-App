// useUserGlobalRank.ts

import { useEffect } from "react";
import { useProfile } from "../contexts/ProfileContextProvider";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";


export function useUserGlobalRank() {
  const { registeredUsers, currentLoggedInUser } = useUserMgtAuth();
  const { dispatch, userRank } = useProfile();

  useEffect(() => {
    if (!registeredUsers || !currentLoggedInUser) return;

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

    const userRankScores = usersAndQuizScores
      .filter((user) => user.userId === currentLoggedInUser.id)
      .map((item) => item.rankScore);

    const userHighestRankScore = Math.max(...userRankScores);

    const userHighestRank =
      1 +
      usersAndQuizScores.findIndex(
        (user) => user.rankScore === userHighestRankScore
      );

    dispatch({ type: "updateUserRank", payload: userHighestRank });
  }, [registeredUsers, currentLoggedInUser, dispatch]);

  return userRank;
}