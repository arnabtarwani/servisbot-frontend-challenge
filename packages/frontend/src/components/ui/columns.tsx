import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bot, Log } from "../../utils/types";
import { useBotStore } from "../../store/globalStore";

export const botColumns: ColumnDef<Bot>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "description",
    header: "description",
  },

  {
    accessorKey: "status",
    header: "status",
  },

  {
    accessorKey: "created",
    header: "created",
    cell: ({ row }) => {
      const createdAt = dayjs
        .unix(row.getValue("created"))
        .format("DD-MM-YYYY HH:mm:ss");
      return createdAt;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const rowId = row.getValue("id");
      return (
        <div className="flex justify-center items-center w-auto">
          <div
            onClick={() => {
              navigate(`/bots/${rowId}?type=log`);
            }}
            className="border border-gray-900 p-1 hover:bg-gray-800 hover:text-gray-50"
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];

export const logColumns: ColumnDef<Log>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "message",
    header: "message",
  },
  {
    accessorKey: "bot",
    header: "bot",
  },

  {
    accessorKey: "worker",
    header: "worker",
  },

  {
    accessorKey: "created",
    header: "created",
    cell: ({ row }) => {
      const createdAt = dayjs
        .unix(row.getValue("created"))
        .format("DD-MM-YYYY HH:mm:ss");

      return createdAt;
    },
  },
];

export const workerColumns: ColumnDef<Worker>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "description",
    header: "description",
  },

  {
    accessorKey: "bot",
    header: "bot",
  },
  {
    accessorKey: "created",
    header: "created",
    cell: ({ row }) => {
      console.log("Created", row.getValue("created"));
      const createdAt = dayjs
        .unix(row.getValue("created"))
        .format("DD-MM-YYYY HH:mm:ss");
      console.log("Created at", createdAt);
      return createdAt;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const rowId = row.getValue("id");
      const botId = useBotStore().bots.find(
        (bot) => bot.name === row.getValue("bot")
      )?.id;
      return (
        <div className="flex justify-center items-center w-auto">
          <div
            onClick={() => {
              navigate(`/bots/${botId}/${rowId}`);
            }}
            className="border border-gray-900 p-1 hover:bg-gray-800 hover:text-gray-50"
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      );
    },
  },
];
