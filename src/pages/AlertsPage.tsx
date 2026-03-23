import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangleIcon,
  ZapIcon,
  ThermometerIcon,
  WalletIcon,
  ClockIcon,
  CheckCircleIcon,
  LightbulbIcon
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { StatusBadge, StatusType } from '../components/StatusBadge';
const alertsData = [
{
  id: 1,
  type: 'critical' as StatusType,
  title: 'Power overload risk in Warehouse B',
  description:
  'Current draw exceeds 90% capacity. Reduce load immediately to prevent breaker trip.',
  suggestedAction:
  'Disconnect non-essential equipment (Forklift chargers, secondary lighting).',
  time: '5 min ago',
  location: 'Warehouse B - Main Panel',
  icon: ZapIcon
},
{
  id: 2,
  type: 'critical' as StatusType,
  title: 'Voltage surge detected',
  description:
  'Voltage spike of 245V detected on Main Line 2. Risk of equipment damage.',
  suggestedAction:
  'Check main breaker and surge protectors. Contact utility provider if persistent.',
  time: '18 min ago',
  location: 'Main Line 2',
  icon: AlertTriangleIcon
},
{
  id: 3,
  type: 'warning' as StatusType,
  title: 'AC Unit 3 overconsumption',
  description:
  'Running 40% above normal baseline for current temperature conditions.',
  suggestedAction:
  'Schedule maintenance. Check filters and compressor efficiency.',
  time: '23 min ago',
  location: 'Office Area - Zone A',
  icon: ThermometerIcon
},
{
  id: 4,
  type: 'warning' as StatusType,
  title: 'Monthly budget threshold reached',
  description:
  '₱48,250 of ₱55,000 budget used with 8 days remaining in billing cycle.',
  suggestedAction:
  'Review usage patterns and implement energy-saving protocols.',
  time: '1 hr ago',
  location: 'System Wide',
  icon: WalletIcon
},
{
  id: 5,
  type: 'warning' as StatusType,
  title: 'Unusual after-hours usage',
  description:
  'Power draw of 2.4kW detected at 11:30 PM (Expected: < 0.5kW).',
  suggestedAction:
  'Verify authorized access or check for equipment left running.',
  time: '14 hrs ago',
  location: 'Power Tools Section',
  icon: ClockIcon
},
{
  id: 6,
  type: 'warning' as StatusType,
  title: 'Projected monthly bill increase',
  description:
  'At current consumption rate, your monthly bill is projected to reach ₱58,400 — 6% above last month.',
  suggestedAction:
  'Review high-consumption areas and consider shifting non-critical loads to off-peak hours.',
  time: '3 hrs ago',
  location: 'System Wide',
  icon: WalletIcon
},
{
  id: 7,
  type: 'info' as StatusType,
  title: 'Scheduled maintenance reminder',
  description: 'Generator backup test due in 3 days as per monthly schedule.',
  suggestedAction:
  'Prepare for brief power interruption during switchover test.',
  time: '1 day ago',
  location: 'Backup Systems',
  icon: CheckCircleIcon
}];

export function AlertsPage() {
  const [filter, setFilter] = useState<
    'all' | 'critical' | 'warning' | 'resolved'>(
    'all');
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
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0
    }
  };
  const filteredAlerts = alertsData.filter((alert) => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return false; // Mock data has no resolved state
    return alert.type === filter;
  });
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-6 pb-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Alerts & Notifications
          </h1>
          <p className="text-slate-400 mt-1">
            Monitor system anomalies and required actions.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="!p-4 text-center">
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-xs text-slate-400 mt-1">Total Alerts</div>
        </GlassCard>
        <GlassCard className="!p-4 text-center border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
          <div className="text-2xl font-bold text-red-400">2</div>
          <div className="text-xs text-slate-400 mt-1">Critical</div>
        </GlassCard>
        <GlassCard className="!p-4 text-center border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
          <div className="text-2xl font-bold text-amber-400">5</div>
          <div className="text-xs text-slate-400 mt-1">Warnings</div>
        </GlassCard>
        <GlassCard className="!p-4 text-center border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">8</div>
          <div className="text-xs text-slate-400 mt-1">Resolved Today</div>
        </GlassCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-white/[0.02] p-1.5 rounded-xl border border-white/[0.05] w-fit">
        {(['all', 'critical', 'warning', 'resolved'] as const).map((tab) =>
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${filter === tab ? 'bg-white/[0.1] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'}`}>
          
            {tab}
          </button>
        )}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const Icon = alert.icon;
          const glowColor =
          alert.type === 'critical' ?
          'red' :
          alert.type === 'warning' ?
          'amber' :
          'none';
          const iconBg =
          alert.type === 'critical' ?
          'bg-red-500/20 text-red-400' :
          alert.type === 'warning' ?
          'bg-amber-500/20 text-amber-400' :
          'bg-blue-500/20 text-blue-400';
          return (
            <motion.div key={alert.id} variants={itemVariants}>
              <GlassCard
                glowColor={glowColor}
                className="flex flex-col md:flex-row gap-6 relative overflow-hidden">
                
                {/* Subtle side accent line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${alert.type === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : alert.type === 'warning' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-blue-500'}`}>
                </div>

                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl ${iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-3">
                      <StatusBadge status={alert.type} />
                      <span className="text-xs text-slate-500">
                        {alert.time}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.05]">
                      {alert.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1">
                    {alert.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-3 flex items-start space-x-3">
                    <LightbulbIcon className="w-4 h-4 text-[#00d4ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-[#00d4ff] uppercase tracking-wider block mb-0.5">
                        Suggested Action
                      </span>
                      <span className="text-sm text-slate-300">
                        {alert.suggestedAction}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-end gap-3 md:min-w-[140px]">
                  <button className="flex-1 md:flex-none px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/20 transition-colors">
                    Mark Resolved
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white text-sm font-medium rounded-lg border border-white/[0.1] transition-colors">
                    View Details
                  </button>
                </div>
              </GlassCard>
            </motion.div>);

        })}
        {filteredAlerts.length === 0 &&
        <div className="text-center py-12">
            <p className="text-slate-400">No alerts found for this filter.</p>
          </div>
        }
      </div>
    </motion.div>);

}
// Using LightbulbIcon imported from lucide-react instead of local helper