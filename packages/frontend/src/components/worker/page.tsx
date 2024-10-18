import { Log } from "../../utils/types";
import { logColumns } from "../ui/columns";
import { DataTable } from "../ui/data-table";

interface IWorkersPage {
  data?: Array<Log>;
  loading?: boolean;
}

export const WorkersPage = ({ data, loading }: IWorkersPage) => {
  return (
    <div className="flex justify-center items-center py-6 w-full">
      <DataTable columns={logColumns} data={data as Log[]} loading={loading} />
    </div>
  );
};
