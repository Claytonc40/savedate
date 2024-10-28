'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
  '#3C50E0', // primary
  '#80CAEE', // secondary
  '#10B981', // success
  '#FFA70B', // warning
  '#FB5454', // danger
  '#5E8594', // meta-7
  '#73A145', // meta-5
  '#518545', // meta-8
  '#6F96A1', // meta-6
  '#0FADCF', // meta-10
];

interface CategoryData {
  name: string;
  value: number;
}

export default function ProductsByCategoryChart() {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryData() {
      setLoading(true);
      try {
        const response = await fetch('/api/categories/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setError('Failed to load category data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#FFFFFF"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-boxdark p-4 text-bodydark shadow-lg ring-1 ring-black ring-opacity-5">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-bodydark1">{`${payload[0].value} produtos`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[500px] w-full bg-white dark:bg-boxdark">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black dark:text-bodydark">
          Produtos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[420px]">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-danger">{error}</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                className="transition-all duration-300 ease-in-out"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 ease-in-out"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={12}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-body dark:text-bodydark1">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
