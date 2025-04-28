import { getCategoryById } from "@/lib/db"
import CategoryForm from "@/components/category-form"

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const category = await getCategoryById(params.id)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  )
}
