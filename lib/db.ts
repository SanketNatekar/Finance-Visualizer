import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Database and collection names
const DB_NAME = "finance_visualizer"
const TRANSACTIONS_COLLECTION = "transactions"
const CATEGORIES_COLLECTION = "categories"
const BUDGETS_COLLECTION = "budgets"

// Get database connection
export async function getDb() {
  const client = await clientPromise
  return client.db(DB_NAME)
}

// Transaction functions
export async function getTransactions() {
  const db = await getDb()
  const transactions = await db.collection(TRANSACTIONS_COLLECTION).find({}).sort({ date: -1 }).toArray()

  // Serialize ObjectId and Date objects
  return JSON.parse(JSON.stringify(transactions.map(serializeDocument)))
}

export async function getTransactionById(id: string) {
  const db = await getDb()
  const transaction = await db.collection(TRANSACTIONS_COLLECTION).findOne({ _id: new ObjectId(id) })

  // Serialize ObjectId and Date objects
  return transaction ? serializeDocument(transaction) : null
}

export async function createTransaction(transaction: any) {
  const db = await getDb()
  const result = await db.collection(TRANSACTIONS_COLLECTION).insertOne({
    ...transaction,
    amount: Number.parseFloat(transaction.amount),
    date: new Date(transaction.date),
    createdAt: new Date(),
  })
  return result
}

export async function updateTransaction(id: string, transaction: any) {
  const db = await getDb()
  const result = await db.collection(TRANSACTIONS_COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...transaction,
        amount: Number.parseFloat(transaction.amount),
        date: new Date(transaction.date),
        updatedAt: new Date(),
      },
    },
  )
  return result
}

export async function deleteTransaction(id: string) {
  const db = await getDb()
  const result = await db.collection(TRANSACTIONS_COLLECTION).deleteOne({
    _id: new ObjectId(id),
  })
  return result
}

// Category functions
export async function getCategories() {
  const db = await getDb()
  const categories = await db.collection(CATEGORIES_COLLECTION).find({}).toArray()

  // Serialize ObjectId objects
  return JSON.parse(JSON.stringify(categories.map(serializeDocument)))
}

export async function getCategoryById(id: string) {
  const db = await getDb()
  const category = await db.collection(CATEGORIES_COLLECTION).findOne({ _id: new ObjectId(id) })

  // Serialize ObjectId objects
  return category ? serializeDocument(category) : null
}

export async function createCategory(category: any) {
  const db = await getDb()
  const result = await db.collection(CATEGORIES_COLLECTION).insertOne({
    ...category,
    createdAt: new Date(),
  })
  return result
}

export async function updateCategory(id: string, category: any) {
  const db = await getDb()
  const result = await db.collection(CATEGORIES_COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...category,
        updatedAt: new Date(),
      },
    },
  )
  return result
}

export async function deleteCategory(id: string) {
  const db = await getDb()
  const result = await db.collection(CATEGORIES_COLLECTION).deleteOne({
    _id: new ObjectId(id),
  })
  return result
}

// Budget functions
export async function getBudgets() {
  const db = await getDb()
  const budgets = await db.collection(BUDGETS_COLLECTION).find({}).toArray()

  // Serialize ObjectId objects
  return JSON.parse(JSON.stringify(budgets.map(serializeDocument)))
}

export async function getBudgetById(id: string) {
  const db = await getDb()
  const budget = await db.collection(BUDGETS_COLLECTION).findOne({ _id: new ObjectId(id) })

  // Serialize ObjectId objects
  return budget ? serializeDocument(budget) : null
}

export async function createBudget(budget: any) {
  const db = await getDb()
  const result = await db.collection(BUDGETS_COLLECTION).insertOne({
    ...budget,
    amount: Number.parseFloat(budget.amount),
    createdAt: new Date(),
  })
  return result
}

export async function updateBudget(id: string, budget: any) {
  const db = await getDb()
  const result = await db.collection(BUDGETS_COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...budget,
        amount: Number.parseFloat(budget.amount),
        updatedAt: new Date(),
      },
    },
  )
  return result
}

export async function deleteBudget(id: string) {
  const db = await getDb()
  const result = await db.collection(BUDGETS_COLLECTION).deleteOne({
    _id: new ObjectId(id),
  })
  return result
}

// Dashboard data
export async function getDashboardData() {
  const db = await getDb()

  // Get current month's transactions
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const transactions = await db
    .collection(TRANSACTIONS_COLLECTION)
    .find({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })
    .sort({ date: -1 })
    .toArray()

  const categories = await db.collection(CATEGORIES_COLLECTION).find({}).toArray()
  const budgets = await db.collection(BUDGETS_COLLECTION).find({}).toArray()

  // Serialize ObjectId and Date objects
  return {
    transactions: JSON.parse(JSON.stringify(transactions.map(serializeDocument))),
    categories: JSON.parse(JSON.stringify(categories.map(serializeDocument))),
    budgets: JSON.parse(JSON.stringify(budgets.map(serializeDocument))),
  }
}

// Helper function to serialize MongoDB documents
function serializeDocument(doc: any) {
  const serialized = { ...doc }

  // Convert _id from ObjectId to string
  if (serialized._id && typeof serialized._id === "object" && serialized._id.toString) {
    serialized._id = serialized._id.toString()
  }

  // Convert Date objects to ISO strings
  Object.keys(serialized).forEach((key) => {
    if (serialized[key] instanceof Date) {
      serialized[key] = serialized[key].toISOString()
    }
  })

  return serialized
}
