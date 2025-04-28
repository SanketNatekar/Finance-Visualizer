"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const COLORS = [
  "#809bce", // vista-blue
  "#95b8d1", // powder-blue
  "#b8e0d2", // tiffany-blue
  "#d6eadf", // honeydew
  "#eac4d5", // fairy-tale
  "#809bce", // repeat vista-blue
  "#95b8d1", // repeat powder-blue
  "#b8e0d2", // repeat tiffany-blue
  "#d6eadf", // repeat honeydew
  "#eac4d5", // repeat fairy-tale
]

export default function DashboardCharts({
  data,
  chartType,
}: {
  data: any
  chartType: "bar" | "pie" | "budget"
}) {
  const { transactions, categories, budgets } = data

  // Prepare data for monthly expenses bar chart
  const monthlyData = useMemo(() => {
    // Group transactions by day
    const groupedByDay = transactions.reduce((acc: any, transaction: any) => {
      const date = new Date(transaction.date)
      const day = date.getDate()

      if (!acc[day]) {
        acc[day] = 0
      }

      acc[day] += transaction.amount
      return acc
    }, {})

    // Convert to array format for Recharts
    return Object.entries(groupedByDay).map(([day, amount]) => ({
      day: `Day ${day}`,
      amount,
    }))
  }, [transactions])

  // Prepare data for category pie chart
  const categoryData = useMemo(() => {
    // Group transactions by category
    const groupedByCategory = transactions.reduce((acc: any, transaction: any) => {
      const categoryId = transaction.categoryId

      if (!acc[categoryId]) {
        acc[categoryId] = 0
      }

      acc[categoryId] += transaction.amount
      return acc
    }, {})

    // Convert to array format for Recharts with category names
    return Object.entries(groupedByCategory).map(([categoryId, amount]) => {
      const category = categories.find((c: any) => c._id === categoryId)
      return {
        name: category ? category.name : "Uncategorized",
        value: amount,
      }
    })
  }, [transactions, categories])

  // Prepare data for budget vs actual chart
  const budgetData = useMemo(() => {
    return categories.map((category: any) => {
      // Find budget for this category
      const budget = budgets.find((b: any) => b.categoryId === category._id)
      const budgetAmount = budget ? budget.amount : 0

      // Calculate actual spending for this category
      const actualAmount = transactions
        .filter((t: any) => t.categoryId === category._id)
        .reduce((sum: number, t: any) => sum + t.amount, 0)

      // Calculate percentage of budget used
      const percentUsed = budgetAmount > 0 ? (actualAmount / budgetAmount) * 100 : 0

      return {
        name: category.name,
        budget: budgetAmount,
        actual: actualAmount,
        percentUsed: Math.min(percentUsed, 100), // Cap at 100% for visualization
      }
    })
  }, [categories, budgets, transactions])

  if (chartType === "bar") {
    if (monthlyData.length === 0) {
      return <EmptyState message="No transaction data available for this month" />
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Bar dataKey="amount" fill="#809bce" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (chartType === "pie") {
    if (categoryData.length === 0) {
      return <EmptyState message="No category data available" />
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  if (chartType === "budget") {
    if (budgetData.length === 0) {
      return <EmptyState message="No budget data available" />
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={budgetData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Budget Used (%)" dataKey="percentUsed" stroke="#809bce" fill="#809bce" fillOpacity={0.6} />
          <Tooltip formatter={(value) => [`${Number(value).toFixed(0)}%`, "Budget Used"]} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    )
  }

  return null
}

function EmptyState({ message }: { message: string }) {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No Data</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
