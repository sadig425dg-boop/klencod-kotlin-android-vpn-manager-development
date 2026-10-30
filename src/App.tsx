import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Wifi, 
  Shield, 
  Globe, 
  BarChart3, 
  Activity, 
  Plus, 
  Zap, 
  Server, 
  ChevronLeft,
  Share2,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './utils/cn';

// --- Components ---

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0D0E12]/80 backdrop-blur-md">
      <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <Settings className="w-6 h-6 text-white" />
      </button>
      
      <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs font-medium text-white/70">تم تفعيل مشاركة نقطة الاتصال عبر Shizzi</span>
      </div>

      <div className="text-sm font-bold bg-gradient-to-r from-[#E040FB] to-[#7C4DFF] bg-clip-text text-transparent">
        Fast-Node
      </div>
    </nav>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass-card flex gap-8 items-center neon-glow-purple">
      <button onClick={() => navigate('/')} className="p-2 rounded-xl text-[#E040FB] hover:bg-white/5 transition-colors">
        <Shield className="w-6 h-6" />
      </button>
      <button onClick={() => navigate('/servers')} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
        <Globe className="w-6 h-6" />
      </button>
      <button onClick={() => navigate('/stats')} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
        <BarChart3 className="w-6 h-6" />
      </button>
    </div>
  );
};

// --- Pages ---

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isSharing, setIsSharing] = useState(true);

  return (
    <div className="min-h-screen pt-24 pb-32 flex flex-col items-center justify-center px-6">
      {/* Visual Indicator */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Animated Rings */}
        <div className="absolute inset-0 border-4 border-[#7C4DFF]/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute inset-4 border-4 border-[#E040FB]/30 rounded-full"></div>
        <div className="absolute inset-8 border-4 border-[#7C4DFF]/40 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-12 border-4 border-[#E040FB]/50 rounded-full"></div>
        
        {/* Central Icon */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative z-10 w-24 h-24 bg-gradient-to-br from-[#E040FB] to-[#7C4DFF] rounded-full flex items-center justify-center shadow-xl shadow-purple-500/20"
        >
          <Wifi className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      <div className="mt-16 w-full max-w-sm space-y-4">
        <button 
          onClick={() => setIsConnected(!isConnected)}
          className={cn(
            "w-full py-5 rounded-3xl font-bold text-xl transition-all duration-300 neon-glow-pink",
            isConnected ? "bg-[#E040FB] text-white" : "bg-white/5 border border-white/10 text-white/60"
          )}
        >
          {isConnected ? "إيقاف VPN" : "تشغيل VPN"}
        </button>

        <button 
          onClick={() => setIsSharing(!isSharing)}
          className={cn(
            "w-full py-5 rounded-3xl font-bold text-xl transition-all duration-300 neon-glow-purple",
            isSharing ? "bg-[#7C4DFF] text-white" : "bg-white/5 border border-white/10 text-white/60"
          )}
        >
          {isSharing ? "إيقاف مشاركة الشبكة" : "تشغيل مشاركة الشبكة"}
        </button>
      </div>

      <div className="mt-auto pt-8 flex gap-4 text-[10px] font-bold text-white/30 tracking-widest uppercase">
        <span>V1.0.0</span>
        <span>|</span>
        <span className={isSharing ? "text-[#7C4DFF]" : ""}>
          {isSharing ? "STATUS SHARING ACTIVE" : "STATUS SHARING INACTIVE"}
        </span>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 overflow-y-auto">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5">
            <ChevronLeft className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">إعدادات التطبيق والاتصال</h1>
        </div>

        {/* Config Card */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm font-bold">كود اتصال V2Ray (VLESS / VMess / Trojan / SS)</span>
            </div>
            <button className="text-[#E040FB] text-xs font-bold px-3 py-1 bg-[#E040FB]/10 rounded-lg">إدراج كود تجريبي</button>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly
              value="vless://9a8b7c6d-1122..."
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white/60"
            />
            <button className="bg-[#E040FB] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/20">
              حفظ الكود
            </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="bg-[#E040FB]/20 text-[#E040FB] text-[10px] font-black px-2 py-0.5 rounded">VLESS</div>
             <div className="flex flex-col">
                <span className="text-xs font-bold text-white/90">Thmanyah-de-Fast-Node</span>
                <span className="text-[10px] text-white/40">edge.v2rayng.org:443</span>
             </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-white/30 block mr-2">سيرفرات سريعة محفوظة:</span>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5">
              <span className="text-xs font-bold">DE-Xray-Reality-01 (VLESS)</span>
              <span className="text-xs font-bold text-green-400">42 ms</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5">
              <span className="text-xs font-bold">NL-VMess-WS-Stream (VMess)</span>
              <span className="text-xs font-bold text-green-400">58 ms</span>
            </div>
          </div>
        </div>

        {/* Shizzi Integration Card */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-sm font-bold text-center">إعدادات Shizzi (بث نقطة الاتصال عبر Shizuku)</h2>
          
          <div className="space-y-2">
             <label className="text-[10px] text-white/40 font-bold block">وضع توجيه VPN في Shizzi</label>
             <div className="w-full p-4 bg-black/30 rounded-2xl border border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold">ربط تلقائي مع V2Ray (Follow VPN)</span>
                <ChevronLeft className="w-4 h-4 -rotate-90 text-white/40" />
             </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/40 font-bold">صلاحية Shizuku</span>
              <span className="text-xs font-bold text-green-400">متصل ومفعّل (UID 2000)</span>
            </div>
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold">فحص</button>
          </div>
        </div>

        {/* Appearance Card */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-bold">المظهر وخط ثمانية (Thmanyah Font Family)</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#E040FB]"></div>
              <span className="text-xs font-bold">الوضع: Dark Mode (الوردي الداكن)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServersPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
       <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">إدارة السيرفرات</h1>
            <button className="p-3 rounded-2xl bg-[#E040FB] shadow-lg shadow-pink-500/20">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="البحث عن سيرفر..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-sm focus:outline-none focus:border-[#E040FB]/50"
            />
          </div>

          <div className="space-y-3">
            {[
              { name: 'DE-Xray-Reality-01', type: 'VLESS', ping: '42ms', country: 'Germany' },
              { name: 'NL-VMess-WS-Stream', type: 'VMess', ping: '58ms', country: 'Netherlands' },
              { name: 'US-Trojan-Direct', type: 'Trojan', ping: '120ms', country: 'USA' },
              { name: 'SG-SS-Reality', type: 'Shadowsocks', ping: '85ms', country: 'Singapore' },
              { name: 'TR-VLESS-GRPC', type: 'VLESS', ping: '65ms', country: 'Turkey' },
            ].map((server, i) => (
              <div key={i} className="glass-card p-4 flex items-center justify-between group hover:border-[#E040FB]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Server className="w-5 h-5 text-white/40" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{server.name}</span>
                    <span className="text-[10px] text-white/40">{server.type} • {server.country}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={cn("text-xs font-bold", parseInt(server.ping) < 100 ? "text-green-400" : "text-yellow-400")}>{server.ping}</span>
                  <Activity className="w-3 h-3 text-white/20 mt-1" />
                </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};

const StatsPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
       <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-xl font-bold mb-8">إحصائيات الاستهلاك</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 flex flex-col items-center justify-center gap-2">
              <Zap className="w-6 h-6 text-[#E040FB]" />
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">سرعة التحميل</span>
              <span className="text-xl font-black">12.5 MB/s</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center gap-2">
              <Share2 className="w-6 h-6 text-[#7C4DFF]" />
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">سرعة الرفع</span>
              <span className="text-xl font-black">2.1 MB/s</span>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">إجمالي الاستهلاك</span>
                <span className="text-3xl font-black">45.2 GB</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-lg">
                <Activity className="w-3 h-3" />
                <span>مستقر</span>
              </div>
            </div>

            <div className="h-32 flex items-end gap-1 px-2">
              {[40, 60, 45, 90, 65, 80, 50, 70, 85, 40, 55, 75, 95, 60, 40].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-[#7C4DFF]/40 to-[#E040FB]/80 rounded-t-sm" 
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold">تفاصيل الجلسة الحالية</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">مدة الاتصال:</span>
                <span className="font-bold">04:12:35</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">عنوان IP العام:</span>
                <span className="font-bold">185.234.12.89</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">البروتوكول المستخدم:</span>
                <span className="font-bold">VLESS + Reality</span>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D0E12] text-white rtl overflow-x-hidden selection:bg-[#E040FB]/30">
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/servers" element={<ServersPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>

        <BottomNav />

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E040FB]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7C4DFF]/5 blur-[120px] rounded-full"></div>
        </div>
      </div>
    </Router>
  );
};

export default App;
