import { useEffect, useState } from "react";
import { HomePage } from "../components/home/page";
import { DefaultLayout } from "../components/layout/default";
import { api } from "../utils";
import { useBotStore } from "../store/globalStore";

const Home = () => {
  const { bots, setBots } = useBotStore();
  const [loading, setLoading] = useState(false);

  const fetchBots = async () => {
    const res = await api("bots", "GET");
    setBots(res);
    setLoading(false);
    return res;
  };

  useEffect(() => {
    setLoading(true);
    fetchBots();
  }, []);

  return (
    <DefaultLayout heading="All Bots">
      <HomePage bots={bots} loading={loading} />
    </DefaultLayout>
  );
};

export default Home;
