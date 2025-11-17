// useUserGlobalRank.ts

import { useEffect, useState } from "react";
import { useProfile } from "../contexts/ProfileContextProvider";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";
import type { RegisteredUserType } from "../types/types";

export function useUserGlobalRank() {
  const { registeredUsers, currentLoggedInUser } = useUserMgtAuth();
  const { dispatch, userRank } = useProfile();
  const [ur, SetUr] = useState<RegisteredUserType[] | null>(null);
  useEffect(() => {
    if (!registeredUsers || !currentLoggedInUser) return;
    const usersWithSortedHistory = registeredUsers.map((user) => {
      const quizHistory = user.quizHistory ?? [];
      const sortedQuestionHistory = [...quizHistory].sort(
        (a, b) => b.rankScore - a.rankScore
      );
      return { ...user, quizHistory: sortedQuestionHistory };
    });

    const sortedUsersByGlobalRank = [...usersWithSortedHistory].filter(user => user.quizHistory.length> 0).sort((a, b) => {
      const aTopScore =
        a.quizHistory && a.quizHistory[0] ? a.quizHistory[0].rankScore ?? 0 : 0;
      const bTopScore =
        b.quizHistory && b.quizHistory[0] ? b.quizHistory[0].rankScore ?? 0 : 0;

      return bTopScore - aTopScore;
    });

    SetUr(sortedUsersByGlobalRank);

    const index = sortedUsersByGlobalRank.findIndex(
          (user) => user.id === currentLoggedInUser.id
        );
    
    const rank = index !== -1 ? index + 1 : "N/A";
    dispatch({ type: "updateUserRank", payload: rank  });
  }, [registeredUsers, currentLoggedInUser, dispatch]);

  return { userRank, ur };
}
