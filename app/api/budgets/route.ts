import { NextResponse } from "next/server"
import { createBudget, getBudgets } from "@/lib/db"

export async function GET() {
  try {
    const budgets = await getBudgets()
    return NextResponse.json(budgets)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const budget = await request.json()
    const result = await createBudget(budget)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 })
  }
}
