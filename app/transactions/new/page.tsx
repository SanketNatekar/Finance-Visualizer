import { getCategories } from "@/lib/db"
import TransactionForm from "@/components/transaction-form"

export default async function NewTransactionPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add Transaction</h1>
      <TransactionForm categories={categories} />
    </div>
  )
}
