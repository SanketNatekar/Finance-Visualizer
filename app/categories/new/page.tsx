import CategoryForm from "@/components/category-form"

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Add Category</h1>
      <CategoryForm />
    </div>
  )
}
