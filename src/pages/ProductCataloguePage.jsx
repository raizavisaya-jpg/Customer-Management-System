export default function ProductCataloguePage({ products = [], loading = false }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Product Catalogue</h1>
        {/* This page is read-only — no add/edit/delete buttons allowed */}
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          Read-only
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Prod Code</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Unit</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Current Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.prodCode} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-mono">{p.prodCode}</td>
                    <td className="px-4 py-3 text-gray-800">{p.description}</td>
                    <td className="px-4 py-3 text-gray-600">{p.unit}</td>
                    {/* Current price comes from the product_current_price view in Supabase */}
                    <td className="px-4 py-3 text-gray-800 font-medium text-right">
                      ₱{Number(p.unitPrice).toFixed(2)}
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