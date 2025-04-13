import * as React from "react"

// SelectTrigger
const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => (
  <button
    ref={ref}
    className={`flex items-center justify-between w-full px-3 py-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

// SelectContent
const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 ${className}`}
    {...props}
  >
    {children}
  </div>
))
SelectContent.displayName = "SelectContent"

// SelectItem (adds value + onSelect support)
interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onSelect?: (value: string) => void
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className = "", children, value, onSelect, ...props }, ref) => (
    <div
      ref={ref}
      role="option"
      onClick={() => onSelect?.(value)}
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)
SelectItem.displayName = "SelectItem"

// SelectValue
const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className = "", children, ...props }, ref) => (
  <span ref={ref} className={`truncate ${className}`} {...props}>
    {children}
  </span>
))
SelectValue.displayName = "SelectValue"

// Main Select
interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export const Select = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : uncontrolledValue

  const handleSelect = (value: string) => {
    if (!isControlled) {
      setUncontrolledValue(value)
    }
    onValueChange?.(value)
    setIsOpen(false)
  }

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectItem) {
      return React.cloneElement(child, {
        onSelect: handleSelect,
      })
    }
    return child
  })

  return (
    <div className="relative" {...props}>
      <SelectTrigger onClick={() => setIsOpen((prev) => !prev)}>
        <SelectValue>{selectedValue || "Select an option"}</SelectValue>
      </SelectTrigger>
      {isOpen && <SelectContent>{enhancedChildren}</SelectContent>}
    </div>
  )
}

export { SelectTrigger, SelectContent, SelectItem, SelectValue }
