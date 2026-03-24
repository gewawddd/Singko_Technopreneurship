import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, DownloadIcon, LightbulbIcon, TrendingDownIcon } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
const monthlyData = [
  {
    day: '1',
    usage: 120,
  },
  {
    day: '5',
    usage: 132,
  },
  {
    day: '10',
    usage: 145,
  },
  {
    day: '15',
    usage: 110,
  },
  {
    day: '20',
    usage: 155,
  },
  {
    day: '25',
    usage: 140,
  },
  {
    day: '30',
    usage: 125,
  },
];

const areaData = [
  {
    name: 'Air Con',
    value: 420,
  },
  {
    name: 'Power Tools',
    value: 380,
  },
  {
    name: 'Lighting',
    value: 210,
  },
  {
    name: 'Office',
    value: 150,
  },
  {
    name: 'Display',
    value: 120,
  },
];

export function ReportsPage() {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 pb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-400 mt-1">Historical trends and cost analysis.</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2 bg-white/[0.03] px-4 py-2 rounded-xl border border-white/[0.05] text-sm text-slate-300">
            <CalendarIcon className="w-4 h-4 text-[#00d4ff]" />
            <span>Oct 1 - Oct 31, 2023</span>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-[#00d4ff]/20 to-blue-600/20 hover:from-[#00d4ff]/30 hover:to-blue-600/30 text-white px-4 py-2 rounded-xl border border-[#00d4ff]/30 transition-all">
            <DownloadIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="!p-5">
          <p className="text-sm text-slate-400 mb-1">Total Usage</p>
          <p className="text-2xl font-bold text-white">
            3,450 <span className="text-sm font-normal text-slate-500">kWh</span>
          </p>
        </GlassCard>
        <GlassCard className="!p-5">
          <p className="text-sm text-slate-400 mb-1">Avg Daily</p>
          <p className="text-2xl font-bold text-white">
            115 <span className="text-sm font-normal text-slate-500">kWh</span>
          </p>
        </GlassCard>
        <GlassCard className="!p-5">
          <p className="text-sm text-slate-400 mb-1">Cost This Period</p>
          <p className="text-2xl font-bold text-white">₱48,250</p>
        </GlassCard>
        <GlassCard className="!p-5 border-emerald-500/20 bg-emerald-500/5">
          <p className="text-sm text-emerald-400 mb-1">Savings vs Last Period</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-emerald-400">₱3,400</p>
            <TrendingDownIcon className="w-5 h-5 text-emerald-400 ml-2" />
          </div>
        </GlassCard>
      </div>

      {/* Main Chart */}
      <motion.div variants={itemVariants}>
        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Energy Consumption Trend</h2>
            <div className="flex space-x-1 bg-white/[0.05] p-1 rounded-lg border border-white/[0.05]">
              {(['daily', 'weekly', 'monthly'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setView(t)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                    view === t ? 'bg-white/[0.1] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                  itemStyle={{
                    color: '#fff',
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#00d4ff"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <GlassCard className="h-full">
            <h2 className="text-lg font-semibold text-white mb-6">Highest Consuming Areas</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={areaData}
                  layout="vertical"
                  margin={{
                    top: 0,
                    right: 20,
                    left: 20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#cbd5e1"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />

                  <Tooltip
                    cursor={{
                      fill: 'rgba(255,255,255,0.05)',
                    }}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                  />

                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {areaData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? '#00d4ff'
                            : index === 1
                            ? '#6366f1'
                            : 'rgba(255,255,255,0.2)'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="h-full">
            <h2 className="text-lg font-semibold text-white mb-6">Energy Saving Insights</h2>
            <div className="space-y-4">
              {[
                {
                  text: 'Switching to LED lighting in Warehouse B could save ₱3,200/month',
                  action: 'View ROI',
                },
                {
                  text: 'Off-peak AC scheduling could reduce overall cooling costs by 15%',
                  action: 'Apply Schedule',
                },
                {
                  text: 'Power factor correction recommended for Power Tools section',
                  action: 'Read Report',
                },
              ].map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex items-start space-x-4"
                >
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 shrink-0">
                    <LightbulbIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 mb-2">{insight.text}</p>
                    <button className="text-xs font-medium text-[#00d4ff] hover:text-blue-400 transition-colors">
                      {insight.action} &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
