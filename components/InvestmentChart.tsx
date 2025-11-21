import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { ChartDataPoint } from '../types';

interface InvestmentChartProps {
  data: ChartDataPoint[];
}

const formatCurrency = (value: number) => {
    if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(1)}Cr`;
    }
    if (value >= 100000) {
        return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-xl">
        <p className="font-bold text-white mb-2">{`Month: ${label}`}</p>
        <p className="text-sky-400">{`Returns: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(payload[0].value)}`}</p>
        <p className="text-amber-400">{`Invested: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(payload[1].value)}`}</p>
      </div>
    );
  }
  return null;
};

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  return (
    <div className="p-4 bg-slate-800 rounded-xl shadow-lg border border-slate-700 h-96">
        <h3 className="text-lg font-semibold text-white mb-4">Investment vs. Returns (YTD)</h3>
        <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}/>
                <Legend wrapperStyle={{fontSize: "12px"}} />
                <Line 
                    type="monotone" 
                    name="Total Returns"
                    dataKey="returns" 
                    stroke="#38bdf8"
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#0ea5e9' }}
                    activeDot={{ r: 8, fill: '#0284c7' }}
                />
                <Line 
                    type="monotone" 
                    name="Total Investment"
                    dataKey="invested" 
                    stroke="#facc15" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: '#eab308' }}
                    activeDot={{ r: 8, fill: '#d97706' }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;