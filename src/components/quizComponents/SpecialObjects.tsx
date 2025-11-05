import type {  possibleDifficultyType, possibleNumberType } from "../../types/types";

export const possibleDifficultyObject: possibleDifficultyType[] = [
  {
    name: "Easy",
    id: "1",
    rankScore: 1
  },
  {
    name: "Intermediate",
    id: "2",
    rankScore: 1.2
  },
  {
    name: "Difficult",
    id: "3",
    rankScore: 1.4
  },
];

export const possibleNumberChoice:possibleNumberType[] = [
  {
    choiceNumber: 25,
    id: "choice1",
  },
  {
    choiceNumber: 30,
    id: "choice2",
  },
  {
    choiceNumber: 35,
    id: "choice3",
  },
  {
    choiceNumber: 40,
    id: "choice4",
  },
];


export const timeAllocation: Record<string, number> = {
  "Easy": 5,
  "Intermediate": 3,
  "Difficult": 2
}