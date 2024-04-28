"use client";

import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { labels, priorities, statuses } from "../_constants/metadata";
import { type Task } from "../_constants/schema";
import { Checkbox } from "@/components/ui/checkbox";



let selectedRowId: any = null;

export const columns: Array<ColumnDef<Task>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(false)}
      />
    ),
    cell: ({ row}) => {
        

        const handleCheckboxChange = (value:any,row:any) => {
            if (value) {
                //console.log(row)
                if (selectedRowId !== null) { 
                  const prevSelectedRow = selectedRowId;
                  prevSelectedRow.toggleSelected(false);
                }
                selectedRowId=row;
              }
              else{
                selectedRowId=null;
              }
             
              row.toggleSelected(!!value);
        };

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => handleCheckboxChange(value,row)}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    size:50,
  },

    {
        accessorKey: "id",
        header: ({ column }) => <span>Task</span>,
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
        size:100,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <span>Title</span>,
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.label);

            return (
                <div className="flex w-auto space-x-2 ">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className=" truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            );
        },
        size:300,
        
    },
    {
        accessorKey: "status",
        header: ({ column }) => <span>Status</span>,
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("status"));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{status.label}</span>
                </div>
            );
        },
        size:200,
    },
    {
        accessorKey: "priority",
        header: ({ column }) => <span>Priority</span>,
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority"),
            );

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span>
                </div>
            );
        },
    },
];
