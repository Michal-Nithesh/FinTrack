import * as React from "react"

// Select Trigger
const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`flex items-center justify-between w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

// Select Content
const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 ${className}`}
    {...props}
  >
    {children}
  </div>
))
SelectContent.displayName = "SelectContent"

// Select Item
const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
))
SelectItem.displayName = "SelectItem"

// Select Value
const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={`truncate ${className}`}
    {...props}
  >
    {children}
  </span>
))
SelectValue.displayName = "SelectValue"

// Main Select Component
export const Select = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState("")

  const handleSelect = (value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  return (
    <div className="relative" {...props}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>{selectedValue || "Select an option"}</SelectValue>
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, {
              onClick: () => handleSelect((child as React.ReactElement).props.children),
            })
          )}
        </SelectContent>
      )}
    </div>
  )
}

export { SelectTrigger, SelectContent, SelectItem, SelectValue }