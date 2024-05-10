import {institutionItem} from "@/lib/definitions";
export default function InstitutionItem({ institution }: { institution: institutionItem }) {
  return (
     <div className="grid p-2">
       <div
          className="p-2 flex group items-center hover:bg-gray-100/50 rounded-xl gap-4 dark:hover:bg-gray-800/50 cursor-pointer">
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