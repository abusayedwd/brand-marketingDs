import React from "react";
import { Users, UserCheck, DollarSign, TrendingUp, Wallet, Landmark } from "lucide-react";
import { useAdminEarningQuery } from "../../redux/features/earningStatus/adminEarning";

const formatValue = (value, isMoney = false) => {
  if (value === undefined || value === null || value === "") return "—";
  if (isMoney) {
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    return `$${num.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
  return value;
};

const Card = () => {
  const { data: status, isLoading } = useAdminEarningQuery();
  const value = status?.data?.attributes;

  const statusData = [
    {
      title: "Subscription earnings",
      value: formatValue(value?.totalEarnAdmin, true),
      icon: Landmark,
      tone: "bg-teal-50 text-accent",
    },
    {
      title: "Content creators",
      value: formatValue(value?.influencers),
      icon: Users,
      tone: "bg-sky-50 text-sky-700",
    },
    {
      title: "Brands",
      value: formatValue(value?.brands),
      icon: UserCheck,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      title: "Campaigns",
      value: formatValue(value?.campaigns),
      icon: TrendingUp,
      tone: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Campaign payments in",
      value: formatValue(value?.campaignPaymentTotal, true),
      icon: DollarSign,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Paid to influencers",
      value: formatValue(value?.withdrawPayment, true),
      icon: Wallet,
      tone: "bg-rose-50 text-rose-700",
    },
    {
      title: "Campaign balance",
      value: formatValue(value?.currentBalance, true),
      icon: DollarSign,
      tone: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="page-shell mb-6">
      <div className="mb-5">
        <h2 className="page-title">Overview</h2>
        <p className="page-subtitle">Live platform metrics from subscriptions, campaigns, and payouts.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statusData.map((item) => (
          <div key={item.title} className="stat-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink-900">
                  {isLoading ? "…" : item.value}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${item.tone}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
