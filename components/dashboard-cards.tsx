"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, CreditCard, DollarSign, Wallet } from "lucide-react"

export default function DashboardCards({ data }: { data: any }) {
  // Calculate total expenses for the current month
  const totalExpenses = data.transactions.reduce((sum: number, transaction: any) => sum + transaction.amount, 0)

  // Get the most spent category
  const categoryExpenses = data.transactions.reduce((acc: any, transaction: any) => {
    const categoryId = transaction.categoryId
    if (!acc[categoryId]) {
      acc[categoryId] = 0
    }
    acc[categoryId] += transaction.amount
    return acc
  }, {})

  let topCategoryId: string | null = null
  let topCategoryAmount = 0

  Object.entries(categoryExpenses).forEach(([categoryId, amount]: [string, any]) => {
    if (amount > topCategoryAmount) {
      topCategoryId = categoryId
      topCategoryAmount = amount
    }
  })

  // Update the topCategory find to handle string IDs
  const topCategory = data.categories.find((c: any) => c._id === topCategoryId)

  // Calculate total budget
  const totalBudget = data.budgets.reduce((sum: number, budget: any) => sum + budget.amount, 0)

  // Calculate budget remaining
  const budgetRemaining = totalBudget - totalExpenses

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-vista-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">For current month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
          <Wallet className="h-4 w-4 text-powder-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${budgetRemaining.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {budgetRemaining > 0 ? "Still available to spend" : "Over budget"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <CreditCard className="h-4 w-4 text-tiffany-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topCategory ? topCategory.name : "N/A"}</div>
          <p className="text-xs text-muted-foreground">
            {topCategoryAmount > 0 ? `$${topCategoryAmount.toFixed(2)}` : "No expenses yet"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          <ArrowUpDown className="h-4 w-4 text-fairy-tale" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.transactions.length}</div>
          <p className="text-xs text-muted-foreground">Total transactions this month</p>
        </CardContent>
      </Card>
    </div>
  )
}
