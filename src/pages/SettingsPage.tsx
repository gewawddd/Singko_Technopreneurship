import React from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  BellIcon,
  SlidersIcon,
  SaveIcon
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
export function SettingsPage() {
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
      className="max-w-4xl mx-auto space-y-6 pb-12">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Settings
        </h1>
        <p className="text-slate-400 mt-1">
          Manage system preferences and alert thresholds.
        </p>
      </div>

      <motion.div variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/[0.08]">
            <SlidersIcon className="w-5 h-5 text-[#00d4ff]" />
            <h2 className="text-lg font-semibold text-white">
              Alert Thresholds
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Voltage Minimum (V)
                </label>
                <input
                  type="number"
                  defaultValue={210}
                  className="glass-input w-full" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Voltage Maximum (V)
                </label>
                <input
                  type="number"
                  defaultValue={240}
                  className="glass-input w-full" />
                
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Global Power Warning Threshold (kW)
              </label>
              <input
                type="number"
                defaultValue={40}
                className="glass-input w-full" />
              
              <p className="text-xs text-slate-500 mt-2">
                Alerts will trigger when total consumption exceeds this value.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/[0.08]">
            <BellIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-semibold text-white">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-4">
            {[
            {
              label: 'Critical Alerts (Overload, Outage)',
              desc: 'Immediate notification for severe issues',
              email: true,
              sms: true
            },
            {
              label: 'Warning Alerts (Thresholds reached)',
              desc: 'Notifies when approaching limits',
              email: true,
              sms: false
            },
            {
              label: 'Weekly Reports',
              desc: 'Summary of energy consumption',
              email: true,
              sms: false
            }].
            map((item, idx) =>
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                    type="checkbox"
                    defaultChecked={item.email}
                    className="rounded border-white/[0.2] bg-white/[0.05] text-[#00d4ff] focus:ring-[#00d4ff]/50" />
                  
                    <span className="text-xs text-slate-300">Email</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                    type="checkbox"
                    defaultChecked={item.sms}
                    className="rounded border-white/[0.2] bg-white/[0.05] text-[#00d4ff] focus:ring-[#00d4ff]/50" />
                  
                    <span className="text-xs text-slate-300">SMS</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/[0.08]">
            <UserIcon className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">User Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Admin User"
                className="glass-input w-full" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@powertrack.io"
                className="glass-input w-full" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Role
              </label>
              <input
                type="text"
                defaultValue="System Administrator"
                disabled
                className="glass-input w-full opacity-50 cursor-not-allowed" />
              
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>
              <input
                type="text"
                defaultValue="Hardware Pro Inc."
                className="glass-input w-full" />
              
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-blue-600 hover:from-[#00b8e6] hover:to-blue-700 text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all">
          <SaveIcon className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </motion.div>
    </motion.div>);

}