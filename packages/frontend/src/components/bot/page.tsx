import { Log, Worker } from "../../utils/types";
import { logColumns, workerColumns } from "../ui/columns";
import { DataTable } from "../ui/data-table";

interface IBotsPage {
  dataType: "log" | "worker";
  data?: Data[];
}

type Data = Worker | Log;

export const BotsPage = ({ data, dataType = "log" }: IBotsPage) => {
  return (
    <div className="flex justify-center items-center py-6 w-full">
      <DataTable
        columns={dataType === "log" ? logColumns : (workerColumns as any)}
        data={data as Data[]}
      />
    </div>
  );
};
