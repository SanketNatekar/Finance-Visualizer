import { getCategories } from "@/lib/db"
import BudgetForm from "@/components/budget-form"

export default async function NewBudgetPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add Budget</h1>
      <BudgetForm categories={categories} />
    </div>
  )
}
