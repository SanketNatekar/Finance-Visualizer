import { getTransactionById, getCategories } from "@/lib/db"
import TransactionForm from "@/components/transaction-form"

export default async function EditTransactionPage({
  params,
}: {
  params: { id: string }
}) {
  const transaction = await getTransactionById(params.id)
  const categories = await getCategories()

  if (!transaction) {
    return <div>Transaction not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Transaction</h1>
      <TransactionForm transaction={transaction} categories={categories} />
    </div>
  )
}
