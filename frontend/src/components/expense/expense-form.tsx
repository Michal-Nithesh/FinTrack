"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent } from "../ui/card"
import { Upload, X } from "lucide-react"

export function ExpenseForm() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the backend
    router.push("/expenses")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Brief description of expense" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input id="amount" type="number" step="0.01" min="0" className="pl-7" placeholder="0.00" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem data-value="travel">Travel</SelectItem>
              <SelectItem data-value="food">Food & Dining</SelectItem>
              <SelectItem data-value="office">Office Supplies</SelectItem>
              <SelectItem data-value="software">Software</SelectItem>
              <SelectItem data-value="events">Events</SelectItem>
              <SelectItem data-value="utilities">Utilities</SelectItem>
              <SelectItem data-value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" placeholder="Any additional information about this expense" rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachments">Attachments</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Input id="attachments" type="file" multiple className="hidden" onChange={handleFileChange} />
          <Label htmlFor="attachments" className="cursor-pointer flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Drag & drop files here or click to browse</span>
            <span className="text-xs text-muted-foreground mt-1">Supported formats: PDF, JPG, PNG (Max 10MB)</span>
          </Label>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Uploaded Files</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <Card key={index}>
                  <CardContent className="p-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/expenses")}>
          Cancel
        </Button>
        <Button type="submit">Submit Expense</Button>
      </div>
    </form>
  )
}

