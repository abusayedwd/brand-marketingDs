import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminEarningChartQuery } from "../../redux/features/earningStatus/adminEarningChart";
import { useAdminPaymentToInfluencerQuery } from "../../redux/features/earningStatus/adminPaymentToInfluencer";

const years = ["2024", "2025", "2026", "2027", "2028"];

const ChartPanel = ({ title, year, onYearChange, data, color }) => (
  <div className="panel">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-display text-lg font-semibold text-ink-900">{title}</h2>
      <select
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        className="rounded-lg border border-slate-200 bg-surface-muted px-3 py-1.5 text-sm outline-none focus:border-accent"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>

    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15,28,46,0.08)",
          }}
        />
        <Area
          type="monotone"
          dataKey="earning"
          stroke={color}
          fill={`url(#grad-${title})`}
          strokeWidth={2.5}
          name="Amount"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const Barchart = () => {
  const [selectedPaymentYear, setSelectedPaymentYear] = useState("2026");
  const [selectedIncomeYear, setSelectedIncomeYear] = useState("2026");

  const { data: adminEarningchartData } = useAdminEarningChartQuery(selectedIncomeYear);
  const { data: adminPaymentchartData } = useAdminPaymentToInfluencerQuery(selectedPaymentYear);

  const formattedAreaChartData =
    adminEarningchartData?.data?.attributes?.map((item) => ({
      month: item.month,
      earning: parseFloat(item.totalEarnings),
    })) || [];

  const formattedPaymentChartData =
    adminPaymentchartData?.data?.attributes?.map((item) => ({
      month: item.month,
      earning: parseFloat(item.totalEarnings),
    })) || [];

  return (
    <div className="page-shell grid grid-cols-1 gap-5 lg:grid-cols-2">
      <ChartPanel
        title="Payouts to influencers"
        year={selectedPaymentYear}
        onYearChange={setSelectedPaymentYear}
        data={formattedPaymentChartData}
        color="#0F766E"
      />
      <ChartPanel
        title="Subscription income"
        year={selectedIncomeYear}
        onYearChange={setSelectedIncomeYear}
        data={formattedAreaChartData}
        color="#1C2B3A"
      />
    </div>
  );
};

export default Barchart;
