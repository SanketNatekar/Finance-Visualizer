import { Suspense } from "react"
import Link from "next/link"
import { getBudgets, getCategories } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import BudgetList from "@/components/budget-list"
import { ObjectId } from "mongodb"

export default async function BudgetsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <Button asChild>
          <Link href="/budgets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Budget
          </Link>
        </Button>
      </div>

      <Suspense fallback={<BudgetListSkeleton />}>
        <BudgetListWrapper />
      </Suspense>
    </div>
  )
}

export function sanitizeBudgets(budgets: any[]) {
  return budgets.map((budget) => ({
    ...budget,
    _id: new ObjectId(budget._id),
    amount: Number.parseFloat(budget.amount),
    createdAt: new Date(budget.createdAt),
    updatedAt: budget.updatedAt ? new Date(budget.updatedAt) : undefined,
  }))
}

async function BudgetListWrapper() {
  const budgets = await getBudgets()
  const categories = await getCategories()

  // const sanitizedBudgets = sanitizeBudgets(budgets)
  
  // const plainCategories = categories.map((c) => ({
  //   _id: c._id.toString(),
  //   name: c.name,
  //   color: c.color,
  //   description: c.description,
  //   createdAt: c.createdAt?.toISOString(),
  // }))

  return <BudgetList budgets={budgets} categories={categories} />
}

function BudgetListSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-6 w-[150px] mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex justify-end">
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
    </div>
  )
}
