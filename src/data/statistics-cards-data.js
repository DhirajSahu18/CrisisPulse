import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Monthly Predictions",
    value: "13",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "since last month",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Prediction Accuracy",
    value: "83%",
    footer: {
      color: "text-green-500",
      value: "+2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Rescue Operations",
    value: "15",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Today's Users",
    value: "23",
    footer: {
      color: "text-green-500",
      value: "+8%",
      label: "than last month",
    },
  },
];

export default statisticsCardsData;
