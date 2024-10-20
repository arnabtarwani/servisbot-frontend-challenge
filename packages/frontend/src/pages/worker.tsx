import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultLayout } from "../components/layout/default";
import { WorkersPage } from "../components/worker/page";
import { useBotStore, useLogStore } from "../store/globalStore";
import { api } from "../utils";

const Worker = () => {
  const { botId, workerId } = useParams();
  const { workers } = useBotStore();
  const { workerLogs, setWorkerLogs } = useLogStore();
  const [loading, setLoading] = useState(false);

  const worker = workers.find((worker) => worker.id === workerId);

  /**
   * This function fetches worker logs
   * @returns {Array} worker logs
   */
  const fetchWorkerLogs = async (): Promise<Array<Worker>> => {
    const res = await api(`logs/${botId}/${workerId}`, "GET");
    setWorkerLogs(res);
    setLoading(false);
    return res;
  };

  useEffect(() => {
    setLoading(true);
    fetchWorkerLogs();
  }, []);

  return (
    <DefaultLayout heading={`${worker?.name} Logs`}>
      <WorkersPage data={workerLogs} loading={loading} />
    </DefaultLayout>
  );
};

export default Worker;
