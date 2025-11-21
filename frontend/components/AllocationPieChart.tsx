import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AllocationData } from '../types';

interface AllocationPieChartProps {
  data: AllocationData[];
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    const formattedValue = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
    return (
      <div className="p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-xl">
        <p className="font-bold text-white">{name}</p>
        <p className="text-indigo-400">{`Value: ${formattedValue}`}</p>
      </div>
    );
  }
  return null;
};

const AllocationPieChart: React.FC<AllocationPieChartProps> = ({ data }) => {
  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  const legendFormatter = (value: string, entry: any) => {
      const { payload } = entry;
      const percent = totalValue > 0 ? (payload.value / totalValue * 100).toFixed(1) : 0;
      return <span style={{ color: '#94a3b8' }}>{`${value} (${percent}%)`}</span>;
  };

  return (
    <div className="p-4 bg-slate-800 rounded-xl shadow-lg border border-slate-700 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
      <div className="flex-grow w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
              formatter={legendFormatter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AllocationPieChart;