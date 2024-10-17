import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../components/layout/default";
import { WorkersPage } from "../components/worker/page";
import { useBotStore, useLogStore } from "../store/globalStore";
import { api } from "../utils";

const Worker = () => {
  const { botId, workerId } = useParams();
  const { workers } = useBotStore();
  const { workerLogs, setWorkerLogs, botLogsLimit, botLogsOffset } =
    useLogStore();

  const worker = workers.find((worker) => worker.id === workerId);

  const fetchWorkerLogs = async () => {
    const res = await api(
      `logs/${botId}/${workerId}?limit=${botLogsLimit}&offset=${botLogsOffset}`,
      "GET"
    );
    setWorkerLogs(res);
    return res;
  };

  useEffect(() => {
    fetchWorkerLogs();
  }, []);

  return (
    <DefaultLayout heading={`${worker?.name} Logs`}>
      <WorkersPage data={workerLogs} />
    </DefaultLayout>
  );
};

export default Worker;
