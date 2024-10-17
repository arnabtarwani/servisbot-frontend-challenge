import { useEffect } from "react";
import { HomePage } from "../components/home/page";
import { DefaultLayout } from "../components/layout/default";
import { api } from "../utils";
import { useBotStore } from "../store/globalStore";

const Home = () => {
  const { bots, setBots } = useBotStore();

  const fetchBots = async () => {
    const res = await api("bots", "GET");
    setBots(res);
    return res;
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return (
    <DefaultLayout heading="All Bots">
      <HomePage bots={bots} />
    </DefaultLayout>
  );
};

export default Home;
