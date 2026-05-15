export default function DeletedCustomersPage({
  deletedCustomers = [],
  onRecover,
  loading = false,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Deleted Customers</h1>
        {/* This page is only accessible to ADMIN and SUPERADMIN */}
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          ADMIN / SUPERADMIN only
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Loading deleted customers…
          </div>
        ) : deletedCustomers.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            No deleted customers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Cust No</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Address</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Pay Term</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deletedCustomers.map((c) => (
                  <tr key={c.custno} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-mono">{c.custno}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{c.custname}</td>
                    <td className="px-4 py-3 text-gray-600">{c.address}</td>
                    <td className="px-4 py-3 text-gray-600">{c.payterm}</td>
                    <td className="px-4 py-3">
                      {/* Shows INACTIVE badge since these are soft-deleted records */}
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
                        INACTIVE
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {/* Recover sets the customer back to ACTIVE status */}
                      <button
                        onClick={() => onRecover?.(c.custno)}
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                      >
                        Recover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}