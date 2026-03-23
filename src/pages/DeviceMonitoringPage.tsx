import React from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  FilterIcon,
  LightbulbIcon,
  WrenchIcon,
  WindIcon,
  PackageIcon,
  TruckIcon
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { StatusBadge, StatusType } from '../components/StatusBadge';
const areas = [
{
  id: 1,
  name: 'Lighting Systems',
  usage: 2.1,
  status: 'normal' as StatusType,
  devices: 12,
  efficiency: 94,
  icon: LightbulbIcon
},
{
  id: 2,
  name: 'Power Tools',
  usage: 3.8,
  status: 'warning' as StatusType,
  devices: 8,
  efficiency: 78,
  icon: WrenchIcon
},
{
  id: 3,
  name: 'Air Conditioning',
  usage: 4.2,
  status: 'normal' as StatusType,
  devices: 6,
  efficiency: 88,
  icon: WindIcon
},
{
  id: 4,
  name: 'Warehouse Equipment',
  usage: 1.9,
  status: 'normal' as StatusType,
  devices: 15,
  efficiency: 91,
  icon: PackageIcon
},
{
  id: 5,
  name: 'Storage Area',
  usage: 1.5,
  status: 'normal' as StatusType,
  devices: 10,
  efficiency: 96,
  icon: PackageIcon
},
{
  id: 6,
  name: 'Loading Area',
  usage: 0.9,
  status: 'normal' as StatusType,
  devices: 5,
  efficiency: 97,
  icon: TruckIcon
}];

export function DeviceMonitoringPage() {
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
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Device & Area Monitoring
          </h1>
          <p className="text-slate-400 mt-1">
            Real-time tracking of specific zones and equipment.
          </p>
        </div>

        <div className="flex space-x-3">
          <div className="relative">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search areas..."
              className="glass-input pl-9 py-2 text-sm w-64" />
            
          </div>
          <button className="glass-panel !p-2 !rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center">
            <FilterIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {areas.map((area) => {
          const Icon = area.icon;
          const glowColor =
          area.status === 'warning' ?
          'amber' :
          area.status === 'critical' ?
          'red' :
          'none';
          const barColor =
          area.status === 'warning' ?
          'bg-amber-500' :
          area.status === 'critical' ?
          'bg-red-500' :
          'bg-emerald-500';
          return (
            <motion.div key={area.id} variants={itemVariants}>
              <GlassCard
                hover
                glowColor={glowColor}
                className="h-full flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-xl border border-white/[0.1] ${area.status === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-white/[0.05] text-[#00d4ff]'}`}>
                      
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{area.name}</h3>
                      <p className="text-slate-400 text-xs">
                        {area.devices} active devices
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={area.status} />
                </div>

                <div className="mt-4 mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold text-white tracking-tight">
                      {area.usage}{' '}
                      <span className="text-sm text-slate-400 font-medium">
                        kW
                      </span>
                    </span>
                    <span className="text-sm text-slate-400">Current Load</span>
                  </div>
                  <div className="w-full bg-white/[0.05] rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: `${area.usage / 5 * 100}%`
                      }}
                      transition={{
                        duration: 1
                      }}
                      className={`h-full rounded-full ${barColor} shadow-[0_0_8px_currentColor] opacity-80`}>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/[0.05] flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">
                      Efficiency Score
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {area.efficiency}%
                    </span>
                  </div>
                  <button className="text-xs font-medium text-[#00d4ff] hover:text-blue-400 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 px-3 py-1.5 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </GlassCard>
            </motion.div>);

        })}
      </div>
    </motion.div>);

}