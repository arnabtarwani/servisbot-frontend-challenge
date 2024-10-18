import { Log, Worker } from "../../utils/types";
import { logColumns, workerColumns } from "../ui/columns";
import { DataTable } from "../ui/data-table";

interface IBotsPage {
  dataType: "log" | "worker";
  data?: Data[];
  loading?: boolean;
}

type Data = Worker | Log;

export const BotsPage = ({ data, dataType = "log", loading }: IBotsPage) => {
  return (
    <div className="flex justify-center items-start py-4 w-full overflow-y-auto">
      <DataTable
        columns={dataType === "log" ? logColumns : (workerColumns as any)}
        data={data as Data[]}
        loading={loading}
      />
    </div>
  );
};
