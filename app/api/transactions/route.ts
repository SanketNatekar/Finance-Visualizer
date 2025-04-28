import { NextResponse } from "next/server"
import { createTransaction, getTransactions } from "@/lib/db"

export async function GET() {
  try {
    const transactions = await getTransactions()
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const transaction = await request.json()
    const result = await createTransaction(transaction)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
