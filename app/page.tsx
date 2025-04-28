import { Suspense } from "react"
import { getDashboardData } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardCharts from "@/components/dashboard-charts"
import RecentTransactions from "@/components/recent-transactions"
import DashboardCards from "@/components/dashboard-cards"

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<DashboardCardsSkeleton />}>
            <DashboardCardsWrapper />
          </Suspense>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>Your spending pattern for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="h-[300px] flex items-center justify-center">
                      <Skeleton className="h-[250px] w-full" />
                    </div>
                  }
                >
                  <DashboardChartsWrapper chartType="bar" />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your most recent financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<RecentTransactionsSkeleton />}>
                  <RecentTransactionsWrapper />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Your spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="h-[300px] flex items-center justify-center">
                      <Skeleton className="h-[250px] w-full" />
                    </div>
                  }
                >
                  <DashboardChartsWrapper chartType="pie" />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
                <CardDescription>How your spending compares to your budget</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="h-[300px] flex items-center justify-center">
                      <Skeleton className="h-[250px] w-full" />
                    </div>
                  }
                >
                  <DashboardChartsWrapper chartType="budget" />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

async function DashboardCardsWrapper() {
  const data = await getDashboardData()
  return <DashboardCards data={data} />
}

async function DashboardChartsWrapper({ chartType }: { chartType: "bar" | "pie" | "budget" }) {
  const data = await getDashboardData()
  return <DashboardCharts data={data} chartType={chartType} />
}

async function RecentTransactionsWrapper() {
  const data = await getDashboardData()
  return <RecentTransactions data={data} />
}

function DashboardCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-[120px]" />
              </CardTitle>
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-[100px] mb-1" />
              <Skeleton className="h-4 w-[80px]" />
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

function RecentTransactionsSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
    </div>
  )
}
