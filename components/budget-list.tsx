"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

type Budget = {
  _id: string
  categoryId: string
  amount: number
  month: number
  year: number
}

type Category = {
  _id: string
  name: string
  color: string
}

export default function BudgetList({
  budgets,
  categories,
}: {
  budgets: Budget[]
  categories: Category[]
}) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Get current month and year
  const now = new Date()
  const currentMonth = now.getMonth() + 1 // JavaScript months are 0-indexed
  const currentYear = now.getFullYear()

  // Filter budgets for current month/year
  const currentBudgets = budgets.filter((budget) => budget.month === currentMonth && budget.year === currentYear)

  async function deleteBudget() {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/budgets/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete budget")
      }

      toast({
        title: "Budget deleted",
        description: "The budget has been deleted successfully.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the budget. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
    }
  }

  if (currentBudgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No budgets found</h3>
        <p className="text-muted-foreground mb-4">Create budgets to track your spending</p>
        <Button asChild>
          <Link href="/budgets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Budget
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {currentBudgets.map((budget) => {
        const category = categories.find((c) => c._id === budget.categoryId)

        // Mock data for progress - in a real app, you'd calculate this from actual transactions
        const spent = Math.random() * budget.amount
        const percentSpent = (spent / budget.amount) * 100

        return (
          <Card key={budget._id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category ? (
                  <>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                    {category.name}
                  </>
                ) : (
                  "Unknown Category"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    ${spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium">{percentSpent.toFixed(0)}%</span>
                </div>
                <Progress
                  value={percentSpent}
                  className="h-2"
                  indicatorClassName={
                    percentSpent > 90 ? "bg-destructive" : percentSpent > 75 ? "bg-fairy-tale" : "bg-tiffany-blue"
                  }
                />
              </div>

              <div className="text-sm text-muted-foreground">
                {percentSpent > 90 ? (
                  <p className="text-destructive">You've almost spent your entire budget!</p>
                ) : percentSpent > 75 ? (
                  <p className="text-fairy-tale">You've spent 75% of your budget.</p>
                ) : (
                  <p className="text-tiffany-blue">
                    You still have ${(budget.amount - spent).toFixed(2)} left to spend.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/budgets/${budget._id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setDeleteId(budget._id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        )
      })}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the budget from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteBudget} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function PlusCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}
