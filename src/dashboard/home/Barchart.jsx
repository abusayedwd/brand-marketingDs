// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Select } from 'antd';

// const data = [
//   { month: 'Jan', pv: 2400, amt: 2400 },
//   { month: 'Feb', pv: 1398, amt: 2210 },
//   { month: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
//   { month: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
//   { month: 'May', uv: 1890, pv: 4800, amt: 2181 },
//   { month: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
//   { month: 'Jul', uv: 3490, pv: 5300, amt: 2100 },
//   { month: 'Aug', uv: 3490, pv: 8300, amt: 2100 },
//   { month: 'Sep', uv: 3490, pv: 7300, amt: 2100 },
//   { month: 'Oct', uv: 3490, pv: 4300, amt: 2100 },
//   { month: 'Nov', uv: 3490, pv: 9300, amt: 2100 },  // Fixed "Nev" to "Nov"
//   { month: 'Dec', uv: 2490, pv: 7300, amt: 2100 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded">
//         <p className="label font-medium">{`${label} : ${payload[0].value}`}</p>
//         <p className="desc text-sm text-gray-600">Additional details can be shown here.</p>
//       </div>
//     );
//   }

//   return null;
// };

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const Barchart = () => {
//   return (
//     <div>
//       <div className="flex justify-between items-center pt-2 ">
//       <h1 className="font-medium text-header">Earning</h1>
//         <Select
//           defaultValue="2024"
//           className="border-none"
//           style={{
//             width: 120,
//             border: 'none',
//           }}
//           onChange={handleChange}
//           options={[
//             { value: '2024', label: '2024' },
//             { value: '2023', label: '2023' },
//             { value: '2022', label: '2022' },
//           ]}
//         />
//       </div>

//       <ResponsiveContainer width="100%" height={280}>
//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="" />
//           <XAxis dataKey="month" /> {/* Fixed dataKey to 'month' */}
//           <YAxis />
//           <Tooltip content={<CustomTooltip />} />
//           <Bar dataKey="pv" barSize={30} fill="#193664" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Barchart;


import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Barchart = () => {
  const [selectedPaymentYear, setSelectedPaymentYear] = useState('2025');
  const [selectedIncomeYear, setSelectedIncomeYear] = useState('2024');

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
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentPaymentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                dataKey="payment" 
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
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                dataKey="income" 
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