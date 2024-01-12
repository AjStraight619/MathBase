"use client";
import { DataPoint } from "@/lib/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import HistoryHeader from "./history-header";
import MyLineChart from "./user-linechart-chats";

type UserHistory = {
  lineChartData: DataPoint[];
};

export default function History({ lineChartData }: UserHistory) {
  const { data: session } = useSession();
  const user = session?.user as User;
  const userName = user?.name;

  console.log(lineChartData);

  return (
    <>
      <HistoryHeader />
      <div className="flex flex-row justify-start items-start pl-4 w-full pt-4">
        <MyLineChart data={lineChartData} />
      </div>
    </>
  );
}
