export default function AdminPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">124</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Active Coaches</h2>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">New Bookings</h2>
          <p className="text-3xl font-bold text-purple-600">23</p>
        </div>

      </div>

      <div className="mt-10 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          <li className="border-b pb-2">• New coach profile created</li>
          <li className="border-b pb-2">• 3 user accounts updated</li>
          <li className="border-b pb-2">• New booking approved</li>
          <li>• System configuration updated</li>
        </ul>
      </div>
    </div>
  );
}
