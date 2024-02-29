import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function DataTableColumnHeader({
  column,  // The column object containing sorting and visibility properties
  title, // The title of the column
  className, // Additional CSS classes for styling
}) {
  // If sorting is not enabled for the column, simply render the title
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  // If sorting is enabled, render a button with dropdown menu for sorting and visibility options
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        {/* Button to trigger dropdown menu */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            {/* Column title */}
            <span>{title}</span>
            {/* Icon indicating sorting direction */}
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        {/* Dropdown menu content */}
        <DropdownMenuContent align="start">
          {/* Menu item to toggle ascending sorting */}
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          {/* Menu item to toggle descending sorting */}
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {/* Separator */}
          <DropdownMenuSeparator />
          {/* Menu item to toggle column visibility */}
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
