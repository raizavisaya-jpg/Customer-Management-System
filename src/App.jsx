import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import AppShell from './layouts/AppShell';
import CustomerListPage from './pages/CustomerListPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import ProductCataloguePage from './pages/ProductCataloguePage';
import DeletedCustomersPage from './pages/DeletedCustomersPage';

function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center h-64">
      <h1 className="text-2xl font-semibold text-gray-400">{title} — Coming Soon</h1>
    </div>
  );
}

// Mock data using correct DB format: custno VARCHAR(5), payterm CHECK('COD','30D','45D')
const mockCustomers = [
  { custno: 'C0001', custname: 'Juan dela Cruz', address: 'Quezon City', payterm: 'COD', record_status: 'ACTIVE', stamp: 'jdelacruz|2025-01-10' },
  { custno: 'C0002', custname: 'Maria Santos', address: 'Makati City', payterm: '30D', record_status: 'ACTIVE', stamp: 'msantos|2025-01-11' },
  { custno: 'C0003', custname: 'Pedro Reyes', address: 'Pasig City', payterm: '45D', record_status: 'ACTIVE', stamp: 'preyes|2025-01-12' },
];

const mockSales = [
  {
    transNo: 'TR000001', salesDate: '2025-01-10', empNo: 'E0001',
    items: [
      { description: 'Ballpen Black', quantity: 2, unitPrice: 12.00 },
      { description: 'Notebook A4', quantity: 1, unitPrice: 55.00 },
    ],
  },
  {
    transNo: 'TR000002', salesDate: '2025-02-14', empNo: 'E0002',
    items: [
      { description: 'Folder Long', quantity: 5, unitPrice: 18.50 },
    ],
  },
];

const mockProducts = [
  { prodCode: 'AK0001', description: 'Ballpen Black', unit: 'pc', unitPrice: 12.00 },
  { prodCode: 'AK0002', description: 'Notebook A4', unit: 'pc', unitPrice: 55.00 },
  { prodCode: 'AK0003', description: 'Folder Long', unit: 'pc', unitPrice: 18.50 },
];

const mockDeletedCustomers = [
  { custno: 'C0004', custname: 'Ana Gomez', stamp: 'agomez|2025-03-01|DELETED' },
  { custno: 'C0005', custname: 'Luis Torres', stamp: 'ltorres|2025-03-05|DELETED' },
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={
            <CustomerListPage
              customers={mockCustomers}
              rights={{ CUST_ADD: true, CUST_EDIT: true, CUST_DEL: true }}
              userType="SUPERADMIN"
            />
          } />
          <Route path="customers/:custno" element={
            <CustomerDetailPage customers={mockCustomers} sales={mockSales} />
          } />
          <Route path="products" element={
            <ProductCataloguePage products={mockProducts} />
          } />
          <Route path="deleted-customers" element={
            <DeletedCustomersPage deletedCustomers={mockDeletedCustomers} />
          } />
          <Route path="sales" element={<PlaceholderPage title="Sales" />} />
          <Route path="admin" element={<PlaceholderPage title="Admin" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
