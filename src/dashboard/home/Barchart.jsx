 


import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAdminEarningChartQuery } from '../../redux/features/earningStatus/adminEarningChart';
import { useAdminPaymentToInfluencerQuery } from '../../redux/features/earningStatus/adminPaymentToInfluencer';

const Barchart = () => {
  const [selectedPaymentYear, setSelectedPaymentYear] = useState('2025');
  const [selectedIncomeYear, setSelectedIncomeYear] = useState('2025');

 const {data : adminEarningchartData} = useAdminEarningChartQuery(selectedIncomeYear)
 const {data : adminPaymentchartData} = useAdminPaymentToInfluencerQuery(selectedPaymentYear)

  
 console.log(adminPaymentchartData)

 const formattedAreaChartData = adminEarningchartData?.data?.attributes?.map((item) => ({
    month: item.month,
    earning: parseFloat(item.totalEarnings),  // Assuming totalEarnings is a string, converting it to number
  })) || [];

 const formattedPaymentChartData = adminPaymentchartData?.data?.attributes?.map((item) => ({
    month: item.month,
    earning: parseFloat(item.totalEarnings),  // Assuming totalEarnings is a string, converting it to number
  })) || [];

  // Sample data for different years
  const yearlyData = {
    '2023': [
      { month: 'Jan', payment: 25, income: 30 },
      { month: 'Feb', payment: 30, income: 35 },
      { month: 'Mar', payment: 35, income: 40 },
      { month: 'Apr', payment: 40, income: 45 },
      { month: 'May', payment: 45, income: 50 },
      { month: 'Jun', payment: 50, income: 55 },
      { month: 'Jul', payment: 55, income: 60 },
      { month: 'Aug', payment: 45, income: 50 },
      { month: 'Sep', payment: 40, income: 45 },
      { month: 'Oct', payment: 35, income: 40 },
      { month: 'Nov', payment: 30, income: 35 },
      { month: 'Dec', payment: 25, income: 30 }
    ],
    '2024': [
      { month: 'Jan', payment: 30, income: 35 },
      { month: 'Feb', payment: 35, income: 40 },
      { month: 'Mar', payment: 40, income: 45 },
      { month: 'Apr', payment: 45, income: 50 },
      { month: 'May', payment: 50, income: 55 },
      { month: 'Jun', payment: 55, income: 60 },
      { month: 'Jul', payment: 60, income: 65 },
      { month: 'Aug', payment: 50, income: 55 },
      { month: 'Sep', payment: 45, income: 50 },
      { month: 'Oct', payment: 40, income: 45 },
      { month: 'Nov', payment: 35, income: 40 },
      { month: 'Dec', payment: 30, income: 35 }
    ],
    '2025': [
      { month: 'Jan', payment: 35, income: 40 },
      { month: 'Feb', payment: 40, income: 45 },
      { month: 'Mar', payment: 45, income: 50 },
      { month: 'Apr', payment: 50, income: 55 },
      { month: 'May', payment: 55, income: 60 },
      { month: 'Jun', payment: 60, income: 65 },
      { month: 'Jul', payment: 65, income: 70 },
      { month: 'Aug', payment: 55, income: 60 },
      { month: 'Sep', payment: 50, income: 55 },
      { month: 'Oct', payment: 45, income: 50 },
      { month: 'Nov', payment: 40, income: 45 },
      { month: 'Dec', payment: 35, income: 40 }
    ]
  };



  const currentPaymentData = yearlyData[selectedPaymentYear];
  const currentIncomeData = yearlyData[selectedIncomeYear];

  const CustomTooltip = ({ active, payload, label, year }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{`${label} ${year}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}k`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Total Payment Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Payment</h2>
            <select 
              value={selectedPaymentYear}
              onChange={(e) => setSelectedPaymentYear(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={formattedPaymentChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} year={selectedPaymentYear} />} />
              <Area 
                type="monotone" 
                dataKey="earning" 
                stroke="#8B5CF6" 
                fill="#8B5CF6"
                fillOpacity={0.6}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Total Income Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Income</h2>
            <select 
              value={selectedIncomeYear}
              onChange={(e) => setSelectedIncomeYear(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={formattedAreaChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} year={selectedIncomeYear} />} />
              <Area 
                type="monotone" 
                dataKey="earning" 
                stroke="#10B981" 
                fill="#10B981"
                fillOpacity={0.6}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Barchart;