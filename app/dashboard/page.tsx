export default function Dashboard() {
  return (
    <>
      <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          ></a>
          <a
            className="text-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Overview
          </a>
          <a
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Analytics
          </a>
          <a
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Advisor
          </a>
          <a
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Integrations
          </a>
          <a
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Settings
          </a>
        </nav>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r5:"
          data-state="closed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Available Balance
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold">€2,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last connection
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Avg. Monthly Expense
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold">€1850</div>
              <p className="text-xs text-muted-foreground">
                +18.1% from month previous
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Number of Transactions (Monthly)
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold">+234</div>
              <p className="text-xs text-muted-foreground">
                +11% from last month
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Active Subscriptions
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +4 since last connection
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm xl:col-span-2">
            <div className="space-y-1.5 p-6 flex flex-row items-center">
              <div className="grid gap-2">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Transactions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recent transactions from your store.
                </p>
              </div>
              <a
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 ml-auto gap-1"
                href="#"
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody className="[&amp;_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        <div className="font-medium">Dunnes Green Grocers</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          2023-06-23
                        </div>
                      </td>
                      <td className="p-4 align-middle">Expense</td>
                      <td className="p-4 align-middle text-right">€25.00</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        <div className="font-medium">JD Sports</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          2023-06-24
                        </div>
                      </td>
                      <td className="p-4 align-middle">Refund</td>
                      <td className="p-4 align-middle text-right">€150.00</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        <div className="font-medium">FlyeFit</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          2023-06-25
                        </div>
                      </td>
                      <td className="p-4 align-middle">Subscription</td>
                      <td className="p-4 align-middle text-right">€35.00</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        <div className="font-medium">Momma</div>
                        <div className="text-sm text-muted-foreground md:inline">
                          2023-06-26
                        </div>
                      </td>
                      <td className="p-4 align-middle">Transfer</td>
                      <td className="p-4 align-middle text-right">€50.00</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        <div className="font-medium">
                          National College of Ireland
                        </div>
                        <div className="text-sm text-muted-foreground md:inline">
                          2023-06-27
                        </div>
                      </td>
                      <td className="p-4 align-middle">Expense</td>
                      <td className="p-4 align-middle text-right">€2000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Places You Spend the Most
              </h3>
            </div>
            <div className="p-6 grid gap-8">
              <div className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    NCI
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    National College of Ireland
                  </p>
                </div>
                <div className="ml-auto font-medium">-€4000.00</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    MO
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Momma</p>
                </div>
                <div className="ml-auto font-medium">-€439.00</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    PO
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Poppa</p>
                </div>
                <div className="ml-auto font-medium">-€299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    DS
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Dunnes Store
                  </p>
                </div>
                <div className="ml-auto font-medium">-€215.32</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    TE
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Tesco</p>
                </div>
                <div className="ml-auto font-medium">-€142.93</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="relative shrink-0 overflow-hidden rounded-full hidden h-9 w-9 sm:flex">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    IN
                  </span>
                </span>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Circle K</p>
                </div>
                <div className="ml-auto font-medium">-€129.00</div>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full max-w-7xl mx-auto mt-12 mb-24 px-6 py-8 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">AI Recommendations</h2>
            <div className="grid gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-semibold">Diversify Spending</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  It seems you&apos;re spending a significant amount at National
                  College of Ireland. While education is essential, consider
                  diversifying your spending to balance your budget effectively.
                  Look for ways to reduce expenses in other areas or explore
                  alternative education options to manage your finances better.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-semibold">
                  Review Subscription Services
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  With several transactions at Momma, Poppa, Dunnes Store,
                  Tesco, and Circle K, it&apos;s wise to review your
                  subscription services and regular expenses. Consider canceling
                  unnecessary subscriptions or finding more cost-effective
                  alternatives to save money in the long run.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-semibold">
                  Track and Analyze Expenditure
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Given your frequent spending patterns at various stores,
                  it&apos;s essential to track and analyze your expenditure
                  regularly. Utilize budgeting tools or apps to gain insights
                  into your spending habits and identify areas where you can cut
                  back or optimize your spending.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
