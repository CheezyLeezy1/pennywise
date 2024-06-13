import { UserSetupForm } from '@/components/setup/user-setup-form'
import { getOAuthToken } from '@/lib/utils'

export default function userSetup() {
  return (
    <>
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              How to Obtain Client ID and Secret Key
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 1: Create an Account
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Go to our website and sign up for a new account. This will
                  give you access to our developer tools and API.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 2: Navigate to the Developer Portal
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Once logged in, find the &quot;Developer&quot; section of the
                  website. This is where you can manage your API credentials.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 3: Generate Client ID and Secret Key
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  In the Developer Portal, click the &quot;Generate API
                  Credentials&quot; button. This will provide you with a unique
                  Client ID and Secret Key that you can use to authenticate your
                  application.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 4: Copy the Credentials
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Carefully copy the Client ID and Secret Key, as you will need
                  them to complete the authentication process.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Authenticate Your Application
            </h2>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4"
              data-v0-t="card"
            >
              <UserSetupForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
