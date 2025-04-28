import { Suspense } from "react"
import Link from "next/link"
import { getTransactions, getCategories } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import TransactionList from "@/components/transaction-list"

export default async function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button asChild>
          <Link href="/transactions/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Link>
        </Button>
      </div>

      <Suspense fallback={<TransactionListSkeleton />}>
        <TransactionListWrapper />
      </Suspense>
    </div>
  )
}

async function TransactionListWrapper() {
  const transactions = await getTransactions()
  const categories = await getCategories()

  // const plainTransactions = transactions.map((t) => ({
  //   _id: t._id.toString(),
  //   categoryId: t.categoryId?.toString(),
  //   amount: t.amount,
  //   description: t.description,
  //   date: t.date?.toISOString(),
  //   createdAt: t.createdAt?.toISOString(),
  //   updatedAt: t.updatedAt ? t.updatedAt.toISOString() : null,
  // }))

  // const plainCategories = categories.map((c) => ({
  //   _id: c._id.toString(),
  //   name: c.name,
  //   color: c.color,
  //   description: c.description,
  //   createdAt: c.createdAt?.toISOString(),
  // }))
  
  return <TransactionList transactions={transactions} categories={categories} />
  
}

function TransactionListSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="p-4 flex items-center gap-4 border-b">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4 border-b">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
    </div>
  )
}
