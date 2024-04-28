"use client"
import React, { useRef, useEffect, useState } from "react";
import './index.css'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnResizeMode,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  const firstColumnRef = useRef<HTMLTableCellElement | null>(null);

  useEffect(() => {
    if (firstColumnRef.current) {
      const firstColumnWidth = firstColumnRef.current.clientWidth;
      const secondColumns = document.querySelectorAll(".second-column");
      secondColumns.forEach((column) => {
        if (column instanceof HTMLElement) {
          column.style.left = `${firstColumnWidth}px`;
        }
      });
    }
  }, [table.getState()]);

  const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')
  const [hover, setHover] = useState("");


  return (
    
    <div className="space-y-4 " style={{ direction: table.options.columnResizeDirection }}>
      <div className="rounded-md overflow-x-auto overflow-y-hidden">
      <Table style={{ width: "100%" }}>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                  <TableCell 
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                          width: header.getSize() === Number.MAX_SAFE_INTEGER ? "auto" : header.getSize(),
                      }}
                      ref={index === 0 ? firstColumnRef : null}
                      className={
                          index === 0
                          ? "sticky left-0 z-20 font-bold bg-white "
                          : index === 1
                          ? "second-column sticky z-20 whitespace-nowrap overflow-hidden font-bold text-center bg-white "
                          : "relative th bg-white whitespace-nowrap overflow-hidden"
                      }
                  >
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
          
                      <div
                          onDoubleClick={() => header.column.resetSize()}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                              table.options.columnResizeDirection
                          } ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                          }`}
                          style={{
                              transform:
                              columnResizeMode === 'onEnd' &&
                              header.column.getIsResizing()
                                  ? `translateX(${
                                      (table.options.columnResizeDirection ===
                                      'rtl'
                                          ? -1
                                          : 1) *
                                      (table.getState().columnSizingInfo
                                          .deltaOffset ?? 0)
                                  }px)`
                                  : '',
                          }}
                      />
                  </TableCell>
              ))}
          </TableRow>
          
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className={row.getIsSelected() ? "tr bg-muted" : "tr"}
                  key={row.id}
                  onMouseEnter={() => setHover(row.id)}
                  onMouseLeave={() => setHover("")}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell:any, index:any) => (
                    <TableCell
                    key={cell.id} style={{ width: cell.column.getSize() }}
                    className={
                          index === 0
                          ? (row.getIsSelected() || hover==row.id ? "sticky left-0 z-20 bg-muted" : " bg-white first-column sticky left-0 z-20" )
                          : index === 1
                          ? (row.getIsSelected() || hover==row.id  ? "bg-muted second-column sticky z-20 data-[state=selected]:bg-muted td whitespace-nowrap overflow-hidden" : "bg-white tr second-column sticky z-20 data-[state=selected]:bg-muted td whitespace-nowrap overflow-hidden")
                          : " td whitespace-nowrap data-[state=selected]:bg-muted overflow-hidden"
                      }
                      
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}