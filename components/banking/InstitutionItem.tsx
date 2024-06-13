import { institutionItem } from '@/lib/definitions'
export default function InstitutionItem({
  institution,
}: {
  institution: institutionItem
}) {
  const handleClick = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' // Assuming your API is on the same domain

      const response = await fetch(`${baseUrl}/api/banking/acquisitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ institutionId: institution.id }),
      })

      const data = await response.json()
      console.error(data)

      if (response.ok) {
        if (data.link) {
          window.location.href = data.link // Redirect to the acquisition link
        } else {
          console.error('nope.')
        }
      } else {
        console.error('Failed to create acquisition link:', data.error)
      }
    } catch (error) {
      console.error('Error creating acquisition link:', error)
    }
  }
  return (
    <div className="grid p-2">
      <div
        className="p-2 flex group items-center hover:bg-gray-100/50 rounded-xl gap-4 dark:hover:bg-gray-800/50 cursor-pointer"
        onClick={handleClick}
      >
        <img
          className="object-contain aspect-video rounded-lg w-12 h-12"
          src={institution.logo}
          width="48"
          height="48"
          alt="Bank Logo"
        />
        <div>
          <div className="font-medium">{institution.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            BIC: {institution.bic}
          </div>
        </div>
        {/*<div*/}
        {/*   className="ml-auto bg-gray-900 text-gray-50 px-2 py-1 rounded-md text-xs font-medium dark:bg-gray-50 dark:text-gray-900">*/}
        {/*  Selected*/}
        {/*</div>*/}
      </div>
    </div>
  )
}
