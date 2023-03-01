import {
  flexRender,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataInput } from "../../pages/tools/body-energy-consumption";
import { THead, TRow, THeader, TBody, TCell, Table } from "..";

type LogTableProps = {
  data: DataInput[];
};

export default function LogTable({ data }: LogTableProps) {
  const columnHelper = createColumnHelper<DataInput>();

  const columns = [
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: () => <span>Date</span>,
    }),
    columnHelper.accessor("activity", {
      cell: (info) => info.getValue(),
      header: () => <span>Activity</span>,
    }),
    columnHelper.accessor("temperature", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Temperature</span>,
    }),
    columnHelper.accessor("airPressure", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Air pressure</span>,
    }),
    columnHelper.accessor("altitude", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Altitude</span>,
    }),
    columnHelper.accessor("humidity", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Humidity</span>,
    }),
    columnHelper.accessor("massBefore", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Mass before</span>,
    }),
    columnHelper.accessor("massAfter", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Mass after</span>,
    }),
    columnHelper.accessor("liquidIntake", {
      cell: (info) => info.getValue(),
      header: () => <span>Liquid intake</span>,
    }),
    columnHelper.accessor("sodiumLossPerLiter", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Sodium loss rate / l</span>,
    }),
    columnHelper.accessor("kCalories", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Kilo calories</span>,
    }),
    columnHelper.accessor("avgHR", {
      cell: (info) => info.getValue(),
      header: () => <span>Avg. HR</span>,
    }),
    columnHelper.accessor("maxHR", {
      cell: (info) => info.getValue(),
      header: () => <span>Max. HR</span>,
    }),
    columnHelper.accessor("avgPower", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Avg. Power</span>,
    }),
    columnHelper.accessor("bikeFTP", {
      cell: (info) => info.getValue().toString(),
      header: () => <span>Bike FTP</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <THeader key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </THeader>
            ))}
          </TRow>
        ))}
      </THead>

      <TBody>
        {table.getRowModel().rows.map((row) => (
          <TRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TCell>
            ))}
          </TRow>
        ))}
      </TBody>
    </Table>
  );
}
