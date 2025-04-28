import { getBudgetById, getCategories } from "@/lib/db"
import BudgetForm from "@/components/budget-form"

export default async function EditBudgetPage({
  params,
}: {
  params: { id: string }
}) {
  const budget = await getBudgetById(params.id)
  const categories = await getCategories()

  if (!budget) {
    return <div>Budget not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Budget</h1>
      <BudgetForm budget={budget} categories={categories} />
    </div>
  )
}
