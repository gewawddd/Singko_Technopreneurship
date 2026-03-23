import React, { Children } from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  BuildingIcon,
  ActivityIcon,
  WalletIcon,
  AlertTriangleIcon } from
'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { StatusBadge, StatusType } from '../components/StatusBadge';
const branches = [
{
  id: 1,
  name: 'Main Store - Manila',
  usage: 12.8,
  status: 'normal' as StatusType,
  cost: '₱48,250',
  devices: 24,
  trend: '+2.1%'
},
{
  id: 2,
  name: 'Warehouse Hub - QC',
  usage: 18.4,
  status: 'warning' as StatusType,
  cost: '₱62,100',
  devices: 38,
  trend: '+8.4%'
},
{
  id: 3,
  name: 'Branch 2 - Cebu',
  usage: 8.2,
  status: 'normal' as StatusType,
  cost: '₱31,400',
  devices: 16,
  trend: '-1.2%'
},
{
  id: 4,
  name: 'Branch 3 - Davao',
  usage: 6.5,
  status: 'normal' as StatusType,
  cost: '₱24,800',
  devices: 12,
  trend: '-4.5%'
}];

export function BranchMonitoringPage() {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 pb-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Multi-Branch Overview
          </h1>
          <p className="text-slate-400 mt-1">
            Compare performance across all locations.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <GlassCard className="!p-5">
          <div className="flex items-center space-x-3 mb-2">
            <BuildingIcon className="w-5 h-5 text-[#00d4ff]" />
            <p className="text-sm text-slate-400">Total Branches</p>
          </div>
          <p className="text-2xl font-bold text-white">4</p>
        </GlassCard>
        <GlassCard className="!p-5">
          <div className="flex items-center space-x-3 mb-2">
            <ActivityIcon className="w-5 h-5 text-indigo-400" />
            <p className="text-sm text-slate-400">Total Usage</p>
          </div>
          <p className="text-2xl font-bold text-white">
            45.9 <span className="text-sm font-normal text-slate-500">kW</span>
          </p>
        </GlassCard>
        <GlassCard className="!p-5">
          <div className="flex items-center space-x-3 mb-2">
            <ActivityIcon className="w-5 h-5 text-slate-400" />
            <p className="text-sm text-slate-400">Avg per Branch</p>
          </div>
          <p className="text-2xl font-bold text-white">
            11.4 <span className="text-sm font-normal text-slate-500">kW</span>
          </p>
        </GlassCard>
        <GlassCard className="!p-5 border-emerald-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <WalletIcon className="w-5 h-5 text-emerald-400" />
            <p className="text-sm text-emerald-400">Most Efficient</p>
          </div>
          <p className="text-lg font-bold text-white truncate">
            Branch 3 - Davao
          </p>
        </GlassCard>
      </div>

      {/* Efficiency Comparison */}
      <GlassCard glowColor="amber" className="!p-5">
        <div className="flex items-start space-x-4">
          <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 shrink-0">
            <AlertTriangleIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-1">
              Least Efficient Branch Detected
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-amber-400 font-medium">
                Warehouse Hub — Quezon City
              </span>{' '}
              is consuming 8.4% more energy than last week and has the highest
              cost-per-device ratio across all branches. Consider scheduling an
              energy audit.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Branch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => {
          const glowColor = branch.status === 'warning' ? 'amber' : 'none';
          return (
            <motion.div key={branch.id} variants={itemVariants}>
              <GlassCard
                hover
                glowColor={glowColor}
                className="relative overflow-hidden">
                
                {/* Decorative map background hint */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:10px_10px] opacity-20 mask-image-radial"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 bg-white/[0.05] rounded-xl border border-white/[0.1] mt-1">
                      <MapPinIcon className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {branch.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {branch.devices} monitored devices
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={branch.status} />
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                    <p className="text-xs text-slate-500 mb-1">Current Usage</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-white">
                        {branch.usage}
                      </span>
                      <span className="text-sm text-slate-400">kW</span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${branch.trend.startsWith('+') ? branch.status === 'warning' ? 'text-red-400' : 'text-amber-400' : 'text-emerald-400'}`}>
                      
                      {branch.trend} vs last week
                    </p>
                  </div>

                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                    <p className="text-xs text-slate-500 mb-1">
                      Est. Monthly Cost
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-white">
                        {branch.cost}
                      </span>
                    </div>
                    <button className="text-xs text-[#00d4ff] hover:text-blue-400 mt-2 transition-colors">
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>);

        })}
      </div>
    </motion.div>);

}