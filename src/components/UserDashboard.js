import React from 'react'

function UserDashboard() {
  return (
    
    <section className="bg-white row-span-3 col-span-7">
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Your Property Stats
        </h2>
  
        <p className="mt-4 text-gray-500 sm:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores
          laborum labore provident impedit esse recusandae facere libero harum
          sequi.
        </p>
      </div>
  
      <div className="mt-8 sm:mt-12">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Views
            </dt>
  
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              0
            </dd>
          </div>
  
          <div
            className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Active Listings
            </dt>
  
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">0</dd>
          </div>
  
          <div
            className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium text-gray-500">
              Agents Assigned
            </dt>
  
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">0</dd>
          </div>
        </dl>
      </div>
    </div>


    <section className="bg-white row-span-4 col-span-7">
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          Your Recent Listings
        </h2>

        <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Product ID
          </div>
        </th>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Property Name
          </div>
        </th>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Property Views
          </div>
        </th>
        <th
          className="whitespace-nowrap px-5 py-2 text-left font-medium text-gray-900"
        >
          <div className="flex items-center gap-2">
            Assigned Agents
          </div>
        </th>
        <th
          className="whitespace-nowrap px-14 py-2 text-left font-medium text-gray-900"
        >
          Status
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      <tr>
        <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">#00001</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">John Frusciante</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">john@rhcp.com</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$783.23</td>
        <td className="whitespace-nowrap px-4 py-2">
          <strong
            className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
          >
            Cancelled
          </strong>
        </td>
      </tr>

      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          #00002
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          George Harrison
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          george@beatles.com
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$128.99</td>
        <td className="whitespace-nowrap px-4 py-2">
          <strong
            className="rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700"
          >
            Paid
          </strong>
        </td>
      </tr>

      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          #00003
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Dave Gilmour</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          dave@pinkfloyd.com
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$459.43</td>
        <td className="whitespace-nowrap px-4 py-2">
          <strong
            className="rounded bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700"
          >
            Partially Refunded
          </strong>
        </td>
      </tr>
    </tbody>
  </table>
</div>


    </div>
    </div>
  </section>


  </section>
  )
}

export default UserDashboard
