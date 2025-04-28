import { NextResponse } from "next/server"
import { getBudgetById, updateBudget, deleteBudget } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const budget = await getBudgetById(params.id)

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json(budget)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budget" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const budget = await request.json()
    const result = await updateBudget(params.id, budget)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteBudget(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 })
  }
}
