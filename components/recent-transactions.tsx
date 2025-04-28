"use client"

import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function RecentTransactions({ data }: { data: any }) {
  const { transactions, categories } = data

  // Get the 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5)

  if (recentTransactions.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Transactions</AlertTitle>
        <AlertDescription>You haven't added any transactions yet.</AlertDescription>
      </Alert>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {recentTransactions.map((transaction: any) => {
          const category = categories.find((c: any) => c._id === transaction.categoryId)

          const date = new Date(transaction.date)
          const timeAgo = formatDistanceToNow(date, { addSuffix: true })

          return (
            <div key={transaction._id} className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary/10">
                  {category ? category.name.charAt(0).toUpperCase() : "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {category ? category.name : "Uncategorized"} • {timeAgo}
                </p>
              </div>
              <div className="font-medium">${transaction.amount.toFixed(2)}</div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
