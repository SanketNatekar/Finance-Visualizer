import { NextResponse } from "next/server"
import { getTransactionById, updateTransaction, deleteTransaction } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const transaction = await getTransactionById(params.id)

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const transaction = await request.json()
    const result = await updateTransaction(params.id, transaction)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteTransaction(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 })
  }
}
