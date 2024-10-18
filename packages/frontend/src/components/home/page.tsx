import { Bot } from "../../utils/types";
import { botColumns } from "../ui/columns";
import { DataTable } from "../ui/data-table";

interface IHomePage {
  bots: Array<Bot>;
  loading?: boolean;
}

export const HomePage = ({ bots, loading }: IHomePage) => {
  return (
    <div className="flex justify-center items-center py-6 w-full">
      <DataTable columns={botColumns} data={bots} loading={loading} />
    </div>
  );
};
