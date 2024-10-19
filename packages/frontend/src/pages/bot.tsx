import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultLayout } from "../components/layout/default";
import { useBotStore, useLogStore } from "../store/globalStore";
import { api, cn } from "../utils";
import { useMemo, useState } from "react";
import { BotsPage } from "../components/bot/page";
import { Button } from "../components/ui/button";
import { Log } from "../utils/types";

const Bot = () => {
  const { id } = useParams();
  const [tableType, setTableType] = useState<"log" | "worker">("log");
  const { bots, workers, setWorkers } = useBotStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { botLogs, setBotLogs } = useLogStore();
  const bot = bots.find((bot) => bot.id === id);

  /**
   * @returns {Array} bot logs
   */
  const fetchBotLogs = async (): Promise<Array<Log>> => {
    const res = await api(`logs/${id}`, "GET");
    if (res.length > 100) {
      setBotLogs({ ...botLogs, ...res });
    }
    setBotLogs(res);
    return res;
  };

  /**
   * @returns {Array} bot workers
   */
  const fetchBotWorkers = async (): Promise<Array<Worker>> => {
    const res = await api(`workers/${bot?.name}`, "GET");
    setWorkers(res);
    setLoading(false);
    return res;
  };

  useMemo(() => {
    if (location.search.includes("type=worker")) {
      setTableType("worker");
    } else {
      setTableType("log");
    }

    setLoading(true);
    fetchBotLogs();
    fetchBotWorkers();
  }, [location.search]);

  return (
    <DefaultLayout
      heading={`${bot?.name} ${tableType === "log" ? `Logs` : `Workers`}`}
      pageHeaderChildrenRight={
        <div className="flex items-center h-full space-x-2">
          <Button
            className={cn(tableType === "log" && "bg-gray-800 text-gray-50")}
            onClick={() => {
              setTableType("log");
              navigate(`${location.pathname}?type=log`);
            }}
          >
            Bot Logs
          </Button>
          <Button
            className={cn(tableType === "worker" && "bg-gray-800 text-gray-50")}
            onClick={() => {
              setTableType("worker");
              navigate(`${location.pathname}?type=worker`);
            }}
          >
            Workers
          </Button>
        </div>
      }
    >
      <BotsPage
        dataType={tableType}
        data={tableType === "log" ? botLogs : workers}
        loading={loading}
      />
    </DefaultLayout>
  );
};

export default Bot;
