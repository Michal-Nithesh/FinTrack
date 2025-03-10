import * as React from "react"

// Table
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <table
    ref={ref}
    className={`w-full border-collapse ${className}`}
    {...props}
  >
    {children}
  </table>
))
Table.displayName = "Table"

// Table Header
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead
    ref={ref}
    className={`bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </thead>
))
TableHeader.displayName = "TableHeader"

// Table Head
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={`px-4 py-2 text-left font-medium text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </th>
))
TableHead.displayName = "TableHead"

// Table Body
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`divide-y divide-gray-200 ${className}`}
    {...props}
  >
    {children}
  </tbody>
))
TableBody.displayName = "TableBody"

// Table Row
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={`hover:bg-gray-50 ${className}`}
    {...props}
  >
    {children}
  </tr>
))
TableRow.displayName = "TableRow"

// Table Cell
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
  <td
    ref={ref}
    className={`px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </td>
))
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableHead, TableBody, TableRow, TableCell }