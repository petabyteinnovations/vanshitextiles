"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const STATS = [
  {
    label: "Total Revenue",
    value: "₹8,42,300",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    label: "New Customers",
    value: "312",
    change: "-3.1%",
    trend: "down",
    icon: Users,
  },
  {
    label: "Products in Stock",
    value: "946",
    change: "+2.4%",
    trend: "up",
    icon: Package,
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 51000 },
  { month: "Mar", revenue: 47000 },
  { month: "Apr", revenue: 63000 },
  { month: "May", revenue: 58000 },
  { month: "Jun", revenue: 71000 },
  { month: "Jul", revenue: 84000 },
];

const RECENT_ORDERS = [
  {
    id: "#INV-1042",
    customer: "Priya Sharma",
    product: "Silk Banarasi Saree",
    amount: "₹12,500",
    status: "Completed",
  },
  {
    id: "#INV-1041",
    customer: "Rahul Mehta",
    product: "Cotton Kurta Set",
    amount: "₹3,200",
    status: "Pending",
  },
  {
    id: "#INV-1040",
    customer: "Anjali Verma",
    product: "Embroidered Lehenga",
    amount: "₹24,800",
    status: "Completed",
  },
  {
    id: "#INV-1039",
    customer: "Karan Singh",
    product: "Linen Shirt",
    amount: "₹1,850",
    status: "Cancelled",
  },
  {
    id: "#INV-1038",
    customer: "Neha Gupta",
    product: "Handloom Dupatta",
    amount: "₹2,400",
    status: "Completed",
  },
];

function statusStyle(status) {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function page() {
  return (
    <div className="space-y-6">
      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A2342]/10">
                  <Icon size={22} className="text-[#0A2342]" />
                </div>

                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <TrendIcon size={14} />
                  {stat.change}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-[#0A2342]">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* ================= REVENUE CHART ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#0A2342]">
              Revenue Overview
            </h3>
            <p className="text-sm text-gray-500">
              Monthly revenue for the current year
            </p>
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
            <MoreVertical size={18} className="text-gray-500" />
          </button>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(v) => `₹${v / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0A2342"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#0A2342]">Recent Orders</h3>
          <a
            href="/pages/admin/orders"
            className="text-sm font-medium text-[#0A2342] hover:text-[#D4AF37]"
          >
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 font-medium text-[#0A2342]">
                    {order.id}
                  </td>
                  <td className="py-3 text-gray-700">{order.customer}</td>
                  <td className="py-3 text-gray-500">{order.product}</td>
                  <td className="py-3 font-medium text-gray-700">
                    {order.amount}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
