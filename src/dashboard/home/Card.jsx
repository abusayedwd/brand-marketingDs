import React from 'react';
import { Users, UserCheck, DollarSign, TrendingUp } from 'lucide-react';
import { useAdminEarningQuery } from '../../redux/features/earningStatus/adminEarning';

const Card = () => {

 const {data: status} = useAdminEarningQuery();
//  console.log(status?.data?.attributes)
  const value = status?.data?.attributes;




  const statusData = [
    {
      title: "My Total Earning from Subscription",
      value: value?.totalEarnAdmin,
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
    {
      title: "Total Content Creator",
      value: value?.influencers,
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
    {
      title: "Total Brand",
      value: value?.brands,
      icon: UserCheck,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
     {
      title: "Total Campaign",
      value: value?.campaigns,
      icon: TrendingUp,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
    {
      title: "Total payment from campaign",
      value: value?.campaignPaymentTotal,
      icon: DollarSign,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
    {
      title: "Total Payment to Influencer",
      value:  value?.withdrawPayment,
      icon: DollarSign,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
    
    {
      title: "Current Balance Campaign Payment",
      value: value?.currentBalance,
      icon: DollarSign,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50"
    },
   
  ];

  return (
    <div className="w-full mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {item.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${item.iconBg}`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;