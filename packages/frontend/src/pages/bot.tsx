import { useParams } from "react-router-dom";
import { DefaultLayout } from "../components/layout/default";
import { useBotStore, useLogStore } from "../store/globalStore";
import { api, cn } from "../utils";
import { useEffect, useState } from "react";
import { BotsPage } from "../components/bot/page";
import { Button } from "../components/ui/button";

const Bot = () => {
  const { id } = useParams();
  const [tableType, setTableType] = useState<"log" | "worker">("log");
  const { bots, workers, setWorkers } = useBotStore();
  const { botLogs, setBotLogs, botLogsLimit, botLogsOffset } = useLogStore();
  const bot = bots.find((bot) => bot.id === id);

  const fetchBotLogs = async () => {
    const res = await api(
      `logs/${id}?limit=${botLogsLimit}&offset=${botLogsOffset}`,
      "GET"
    );
    setBotLogs(res);
    return res;
  };

  const fetchBotWorkers = async () => {
    const res = await api(`workers/${bot?.name}`, "GET");
    setWorkers(res);
    return res;
  };

  useEffect(() => {
    fetchBotLogs();
    fetchBotWorkers();
  }, []);

  return (
    <DefaultLayout
      heading={`${bot?.name} ${tableType === "log" ? `Logs` : `Workers`}`}
      pageHeaderChildrenRight={
        <div className="flex items-center space-x-2">
          <Button
            className={cn(tableType === "log" && "bg-white text-gray-900")}
            onClick={() => setTableType("log")}
          >
            Bot Logs
          </Button>
          <Button
            className={cn(tableType === "worker" && "bg-white text-gray-900")}
            onClick={() => setTableType("worker")}
          >
            Workers
          </Button>
        </div>
      }
    >
      <BotsPage
        dataType={tableType}
        data={tableType === "log" ? botLogs : workers}
      />
    </DefaultLayout>
  );
};

export default Bot;
