import { UserSetupForm } from '@/components/setup/user-setup-form'

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
                  Go to the website below and sign up for a new account.
                  <br />{' '}
                  <a
                    href="https://bankaccountdata.gocardless.com/overview/"
                    className="text-blue-600 hover:underline"
                  >
                    GoCardless
                  </a>
                  . This give&apos;s PennyWise the access to your Bank Account
                  Data.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 2: Navigate to the Developer Portal
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Once logged in, find the{' '}
                  <a
                    href="https://bankaccountdata.gocardless.com/user-secrets/"
                    className="text-blue-600 hover:underline"
                  >
                    &quot;Developer&quot; section
                  </a>{' '}
                  of the website. This is where you can manage your API
                  credentials.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 3: Generate Client ID and Secret Key
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  In the Developer Portal, click the &quot;Create New&quot;
                  button. Enter your secret name and leave the CIDR Subnets
                  option as is. You will then receive a pop-up confirming the
                  creation of a new secret.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 4: Copy the Credentials
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Carefully copy the Client ID and Secret Key from the pop-up.
                  PennyWise will encrypt your secret key and does not have
                  access to the unencrypted key. We store it securely and only
                  decrypt it when needed, broadcasting it over HTTPS.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Step 5: Authenticate
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click the &quot;Authenticate&quot; button, and you&apos;re
                  ready to go!
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
