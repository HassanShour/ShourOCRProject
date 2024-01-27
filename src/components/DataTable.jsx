import React from 'react'

function DataTable({data}) {
  return (
    <div className="border-neutral-300 border p-2 rounded-md flex flex-col gap-3 min-w-full">
          <div className="flex items-center justify-start">
            <p class="w-32 text-start font-medium text-lg">Name:</p>{" "}
            {data?.name || (
              <p className="text-red-500">Name was not found</p>
            )}
          </div>
          <div className="bg-neutral-300 min-w-full h-[1px]" />
          <div className="flex items-center justify-start">
            <p class="w-32 text-start font-medium text-lg">Nationality:</p>{" "}
            {data.nationality || (
              <p className="text-red-500">Nationality was not found</p>
            )}
          </div>
          <div className="bg-neutral-300 min-w-full h-[1px]" />
          <div className="flex items-center justify-start">
            <p class="w-32 text-start font-medium text-lg">Date of Birth:</p>{" "}
            {data.dateOfBirth || (
              <p className="text-red-500">Date of birth was not found</p>
            )}
          </div>
          <div className="bg-neutral-300 min-w-full h-[1px]" />
          <div className="flex items-center justify-start">
            <p class="w-32 text-start font-medium text-lg">Sex:</p>{" "}
            {data.sex || (
              <p className="text-red-500">Sex is not found</p>
            )}
          </div>
        </div>
  )
}

export default DataTable