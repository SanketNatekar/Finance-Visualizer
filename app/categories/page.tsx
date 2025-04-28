import { Suspense } from "react"
import Link from "next/link"
import { getCategories } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryList from "@/components/category-list"

export default async function CategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Button asChild>
          <Link href="/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryListWrapper />
      </Suspense>
    </div>
  )
}

async function CategoryListWrapper() {
  const categories = await getCategories()
  // const plainCategories = categories.map((c) => ({
  //   _id: c._id.toString(),
  //   name: c.name,
  //   color: c.color,
  //   description: c.description,
  //   createdAt: c.createdAt?.toISOString(),
  // }))
  return <CategoryList categories={categories} />
}

function CategoryListSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-[150px]" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <div className="flex justify-end">
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
    </div>
  )
}
