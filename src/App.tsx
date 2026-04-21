import React, { useState } from 'react';
import {
  Home,
  Search,
  Scan,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  List,
  Edit,
  Eye,
  Plus,
  AlertCircle,
  Camera,
  X,
  ArrowLeft,
  Check
} from 'lucide-react';

/**
 * MOCK DATA
 */
const MOCK_CUSTOMERS = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901.111.111' },
  { id: 2, name: 'Trần Thị B', phone: '0902.222.222' },
  { id: 3, name: 'Lê Hoàng C', phone: '0903.333.333' },
];

const MOCK_DRIVERS = [
  { id: 1, name: 'Phạm Văn D', phone: '0904.444.444' },
  { id: 2, name: 'Hoàng Thị E', phone: '0905.555.555' },
];

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    date: '22/04/2026 09:00',
    service: 'Bảo dưỡng cấp 4',
    note: 'Nhớ rửa xe sạch sẽ',
    bookerName: 'Nguyễn Văn A',
    bookerPhone: '0901.111.111',
    channel: 'Hotline',
  },
  {
    id: 2,
    date: '15/05/2026 14:30',
    service: 'Thay dầu động cơ',
    note: 'Sử dụng dầu tổng hợp',
    bookerName: 'Trần Thị B',
    bookerPhone: '0902.222.222',
    channel: 'App',
  },
  {
    id: 3,
    date: '20/06/2026 10:00',
    service: 'Kiểm tra lốp',
    note: 'Kêu lốp trước bên phải',
    bookerName: 'Lê Văn C',
    bookerPhone: '0903.333.333',
    channel: 'Zalo',
  },
];

const MOCK_HISTORY = [
  { id: 'RO-2604-0001', km: '15,000', daysAgo: 10, value: 2500000 },
  { id: 'RO-2512-0042', km: '10,000', daysAgo: 120, value: 1200000 },
  { id: 'RO-2506-0112', km: '5,000', daysAgo: 300, value: 1800000 },
];

/**
 * REUSABLE COMPONENTS
 */
const Accordion = ({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-50 border-y border-gray-200"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wide">{title}</span>
          {subtitle && <span className="text-[9px] text-gray-500">{subtitle}</span>}
        </div>
        {isOpen ? (
          <ChevronUp size={14} className="text-gray-500" />
        ) : (
          <ChevronDown size={14} className="text-gray-500" />
        )}
      </button>
      {isOpen && <div className="bg-white">{children}</div>}
    </div>
  );
};

const Toast = ({ message, onClose }: { message: string | null; onClose: () => void }) => {
  if (!message) return null;
  return (
    <div className="absolute bottom-[85px] left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-[11px] z-50 whitespace-nowrap flex items-center gap-2 shadow-sm animate-in fade-in slide-in-from-bottom-5">
      <Check size={12} className="text-green-400" />
      {message}
    </div>
  );
};

/**
 * MAIN APP
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'not_found' | 'history' | 'error'>(
    'idle'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const renderContent = () => {
    if (activeTab === 'scan') {
      if (scanState === 'idle' || scanState === 'scanning' || scanState === 'error') {
        return <CameraScannerView scanState={scanState} setScanState={setScanState} />;
      }
      if (scanState === 'not_found') {
        return <NotFoundResultView onBack={() => setActiveTab('home')} />;
      }
      if (scanState === 'history') {
        return <VehicleHistoryView showToast={showToast} onBack={() => setActiveTab('home')} />;
      }
    }

    if (activeTab === 'home') {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500 text-lg">
          Đang phát triển
        </div>
      );
    }

    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500 text-lg">
        Đang phát triển
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex justify-center items-center overflow-hidden">
      {/* Mobile Container limits width on desktop */}
      <div className="w-full h-full sm:w-[375px] sm:h-[720px] bg-gray-100 relative flex flex-col sm:rounded-[40px] sm:border-[8px] sm:border-gray-700 shadow-2xl overflow-hidden">
        {/* Top Spacer for mobile status bar simulation */}
        <div className="w-full h-6 bg-white shrink-0 flex justify-between items-center px-6 text-[10px] font-semibold text-black">
           <span>9:41</span>
           <div className="flex gap-1">
             <span>📶</span>
             <span>🔋</span>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative pb-20 no-scrollbar">
          {renderContent()}
        </div>

        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full h-[65px] bg-white border-t border-gray-200 grid grid-cols-5 pb-2.5 z-40">
          <NavBtn
            icon={<Home size={18} />}
            label="Trang chủ"
            isActive={activeTab === 'home'}
            onClick={() => {
              setActiveTab('home');
              setScanState('idle');
            }}
          />
          <NavBtn
            icon={<Search size={18} />}
            label="Tra cứu"
            isActive={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
          />

          {/* Prominent Scan Button */}
          <div className="flex flex-col items-center justify-center -translate-y-[15px] relative">
            <button
              onClick={() => {
                setActiveTab('scan');
                setScanState('scanning');
              }}
              className="w-[50px] h-[50px] bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_4px_10px_rgba(37,99,235,0.4)] border-4 border-white hover:bg-blue-700 transition"
            >
              <Camera size={20} />
            </button>
            <span className="text-[9px] text-blue-600 absolute -bottom-2 w-full text-center font-bold mt-1">
              SCAN
            </span>
          </div>

          <NavBtn
            icon={
              <div className="relative">
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-1.5 h-1.5 rounded-full"></span>
              </div>
            }
            label="Thông báo"
            isActive={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
          />
          <NavBtn
            icon={<Settings size={18} />}
            label="Cài đặt"
            isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * VIEWS
 */

function CameraScannerView({
  scanState,
  setScanState,
}: {
  scanState: string;
  setScanState: (st: any) => void;
}) {
  return (
    <div className="relative w-full h-full bg-slate-900 flex flex-col justify-center items-center">
      {/* Mock Camera Guide */}
      <div className="w-64 h-32 border-2 border-white/50 rounded-lg relative overflow-hidden flex items-center justify-center">
        <span className="text-white/50 text-sm">Đưa biển số vào khung</span>
        {/* Animated scan line */}
        <div className="absolute top-0 w-full h-1 bg-green-400/50 blur-sm shadow-[0_0_10px_rgba(74,222,128,1)] animate-[ping-pong_2s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes ping-pong {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Simulator Tools (Only for testing mock states) */}
      <div className="absolute bottom-32 flex flex-col gap-3 w-3/4">
        <div className="text-white text-xs text-center mb-2">
          (Trình giả lập quét biển số)
        </div>
        <button
          onClick={() => setScanState('not_found')}
          className="bg-white/20 text-white py-3 rounded-lg backdrop-blur-sm border border-white/30"
        >
          Mô phỏng: 51H-111.11 (Không có)
        </button>
        <button
          onClick={() => setScanState('history')}
          className="bg-white/20 text-white py-3 rounded-lg backdrop-blur-sm border border-white/30"
        >
          Mô phỏng: 52H-222.22 (Tồn tại)
        </button>
        <button
          onClick={() => setScanState('error')}
          className="bg-red-500/80 text-white py-3 rounded-lg backdrop-blur-sm"
        >
          Mô phỏng: Lỗi quét mờ
        </button>
      </div>

      {scanState === 'error' && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 px-6 backdrop-blur-sm">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <p className="text-white text-center text-lg mb-6">
            Không đọc được biển số. Vui lòng giữ chắc tay và thử lại.
          </p>
          <button
            onClick={() => setScanState('scanning')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium"
          >
            Quét lại
          </button>
        </div>
      )}
    </div>
  );
}

function NotFoundResultView({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full min-h-full bg-white flex flex-col">
      {/* Header */}
      <div className="w-full py-4 border-b border-gray-200 flex items-center justify-center relative bg-white">
        <button onClick={onBack} className="absolute left-4 text-gray-600">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-gray-900 text-sm uppercase">Kết quả quét biển số</h1>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 space-y-6">
        {/* Scanned Image Focus Mock */}
        <div className="w-full max-w-[240px] mt-4 p-2 bg-gray-200 border border-gray-300">
          <div className="w-full bg-white border border-[#333] overflow-hidden aspect-[2/1] flex items-center justify-center text-xl font-bold font-mono tracking-[2px] text-slate-800 relative bg-cover bg-center" style={{backgroundImage: 'url(https://picsum.photos/seed/licenseplate/300/150?blur=1)'}}>
             <div className="bg-white/90 px-3 py-1 border border-black/50">
               51H-111.11
             </div>
          </div>
        </div>

        <h2 className="text-[14px] font-bold text-gray-800 text-center leading-snug">
          Biển số xe 51H-111.11 chưa tồn tại trên hệ thống.
        </h2>

        <p className="text-gray-500 text-center text-[12px] px-4">
          Bạn có muốn thêm thông tin cho xe này để bắt đầu theo dõi không?
        </p>

        <div className="flex flex-col w-full mt-4">
          <button className="w-full bg-blue-600 text-white font-semibold py-3 flex items-center justify-center gap-1.5 rounded-lg text-[14px] shadow-sm hover:bg-blue-700 transition-all mb-2">
            <Plus size={16} strokeWidth={3} /> THÊM XE MỚI
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 text-gray-500 font-medium text-[12px] hover:bg-gray-50"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

function VehicleHistoryView({
  showToast,
  onBack,
}: {
  showToast: (msg: string) => void;
  onBack: () => void;
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(MOCK_CUSTOMERS[0]);
  const [selectedDriver, setSelectedDriver] = useState(MOCK_DRIVERS[0]);

  // Modals for selecting lists
  const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);
  const [isDriverListOpen, setIsDriverListOpen] = useState(false);

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const handleSelectCustomer = (cus: typeof MOCK_CUSTOMERS[0]) => {
    setSelectedCustomer(cus);
    setIsCustomerListOpen(false);
    showToast('Đã cập nhật thông tin liên hệ mới');
  };

  const handleSelectDriver = (drv: typeof MOCK_DRIVERS[0]) => {
    setSelectedDriver(drv);
    setIsDriverListOpen(false);
    showToast('Đã cập nhật thông tin liên hệ mới');
  };

  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col pb-16">
      {/* Header */}
      <div className="bg-white py-3 px-4 sticky top-0 z-30 flex items-center justify-between border-b border-gray-200">
         <button onClick={onBack} className="text-gray-600 mr-2">
          <ArrowLeft size={20} />
        </button>
        
        {/* Stylized License Plate */}
        <div className="mx-auto relative border-2 border-[#333] rounded px-2.5 py-0.5 bg-white flex justify-center items-center">
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-5 h-[1px] bg-gray-300"></div>
            <span className="text-lg font-extrabold tracking-[1px] text-black">
              52H-222.22
            </span>
        </div>
        
        <div className="w-5"></div> {/* Spacer for centering */}
      </div>

      <div className="flex flex-col">
        {/* 1. Nhóm thông tin xe */}
        <Accordion title="Thông tin xe" defaultOpen={true}>
          <div className="flex flex-col">
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Xe</span>
              <div className="flex-1 flex justify-end items-center gap-2">
                <span className="text-[12px] font-medium text-gray-800 text-right">Camry 2.0E 2022</span>
                <button className="text-blue-600">
                  <Edit size={14} />
                </button>
              </div>
            </div>
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Hiệu xe</span>
              <span className="text-[12px] font-medium text-gray-800 flex-1 text-right"><span className="bg-gray-100 rounded px-1.5 py-0.5">Toyota</span></span>
            </div>
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Loại xe</span>
              <span className="text-[12px] font-medium text-gray-800 flex-1 text-right"><span className="bg-gray-100 rounded px-1.5 py-0.5">Sedan 4 chỗ</span></span>
            </div>
          </div>
        </Accordion>

        {/* 2. Nhóm khách hàng & Tài xế */}
        <Accordion title="Khách hàng & Tài xế" subtitle="(Dựa trên RO gần nhất: 2604-0001)" defaultOpen={true}>
          <div className="flex flex-col">
            {/* Khách hàng */}
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Khách hàng</span>
              <div className="flex-1 flex justify-end items-center gap-2">
                <span className="text-[12px] font-medium text-gray-800 text-right">{selectedCustomer.name}</span>
                <button onClick={() => setIsCustomerListOpen(true)} className="text-blue-600"><List size={14} /></button>
                <button className="text-blue-600"><Plus size={14} /></button>
              </div>
            </div>
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Số điện thoại</span>
              <span className="text-[12px] font-medium text-gray-800 flex-1 text-right">{selectedCustomer.phone}</span>
            </div>

            {/* Tài xế */}
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <span className="text-[12px] text-gray-500 w-[100px]">Tài xế</span>
              <div className="flex-1 flex justify-end items-center gap-2">
                <span className="text-[12px] font-medium text-gray-800 text-right">{selectedDriver.name}</span>
                <button onClick={() => setIsDriverListOpen(true)} className="text-blue-600"><List size={14} /></button>
                <button className="text-blue-600"><Plus size={14} /></button>
              </div>
            </div>
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <span className="text-[12px] text-gray-500 w-[100px]">Số điện thoại</span>
              <span className="text-[12px] font-medium text-gray-800 flex-1 text-right">{selectedDriver.phone}</span>
            </div>
          </div>
        </Accordion>

        {/* 3. Nhóm lịch hẹn */}
        <Accordion title="Khớp lịch hẹn" subtitle="Có 3 lịch hẹn chưa phục vụ">
          <div className="flex flex-col">
            {MOCK_APPOINTMENTS.map((apt, index) => {
              const isSelected = selectedAppointmentId === apt.id;
              return (
                <div key={apt.id} className={`p-4 border-b border-gray-100 ${isSelected ? 'bg-blue-50/30' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                       <span className="font-bold text-[12px] text-gray-900">{apt.date}</span>
                     </div>
                     <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">#{index + 1}</span>
                  </div>
                  
                  <div className="grid grid-cols-[80px_1fr] gap-y-1 text-[11px] mb-3">
                    <div className="text-gray-500">Dịch vụ</div>
                    <div className="font-medium text-gray-900">{apt.service}</div>
                    <div className="text-gray-500">Ghi chú</div>
                    <div className="text-gray-700">{apt.note}</div>
                    <div className="text-gray-500">Người đặt</div>
                    <div className="text-gray-700">{apt.bookerName} <span className="text-gray-400">({apt.bookerPhone})</span></div>
                    <div className="text-gray-500">Kênh</div>
                    <div className="text-blue-600">{apt.channel}</div>
                  </div>

                  <button 
                     onClick={() => setSelectedAppointmentId(isSelected ? null : apt.id)}
                     className="flex items-center gap-2 text-left"
                  >
                    <div className={`w-4 h-4 shrink-0 rounded flex items-center justify-center border ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-[11px] font-medium ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                      Chọn lịch hẹn này cho lượt phục vụ hiện tại
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </Accordion>

        {/* 4. Nhóm tài chính */}
        <Accordion title="Tài chính">
          <div className="grid grid-cols-2 gap-[1px] bg-gray-200 border-b border-gray-200">
            <div className="bg-white p-2.5 text-center flex flex-col justify-center items-center">
              <span className="font-bold text-[14px] text-blue-600 leading-tight">14</span>
              <span className="text-[9px] text-gray-500 uppercase mt-0.5">Tổng lệnh (RO)</span>
            </div>
            <div className="bg-white p-2.5 text-center flex flex-col justify-center items-center">
              <span className="font-bold text-[14px] text-blue-600 leading-tight">50,000,000đ</span>
              <span className="text-[9px] text-gray-500 uppercase mt-0.5">Tổng giá trị</span>
            </div>
            <div className="bg-white p-2.5 text-center flex flex-col justify-center items-center">
              <span className="font-bold text-[14px] text-blue-600 leading-tight">5,000,000đ</span>
              <span className="text-[9px] text-gray-500 uppercase mt-0.5">Trung bình</span>
            </div>
             <div className="bg-white p-2.5 text-center flex flex-col justify-center items-center">
              <span className="font-bold text-[14px] text-blue-600 leading-tight">2,500,000đ</span>
              <span className="text-[9px] text-gray-500 uppercase mt-0.5">Gần nhất</span>
            </div>
          </div>
        </Accordion>

        {/* 5. Lịch sử lệnh sửa chữa */}
        <Accordion title="Lịch sử sửa chữa" defaultOpen={true}>
          <div className="px-4 py-2 flex gap-1 border-b border-gray-50">
             {['1 Tháng', '3 Tháng', '1 Năm', 'Tất cả'].map((filter, i) => (
                <button key={filter} className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-medium ${i === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {filter}
                </button>
             ))}
          </div>

          <div className="flex flex-col">
            {MOCK_HISTORY.map((ro) => (
              <div key={ro.id} className="px-4 py-2 flex items-center justify-between border-b border-gray-50">
                <div>
                  <div className="font-bold text-[11px] text-gray-900">{ro.id}</div>
                  <div className="text-gray-500 text-[9px] mt-0.5">{ro.km} km • {ro.daysAgo} ngày trước</div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="font-bold text-[12px] text-gray-900">{ro.value.toLocaleString('vi-VN')}đ</div>
                  <button className="text-[10px] text-blue-600 flex items-center gap-1 mt-0.5">
                     <Eye size={10} /> Xem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
        
        {/* Thêm RO button inline with content rather than floating */}
        <div className="px-4 mt-2 mb-6">
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg text-[14px] flex items-center justify-center gap-1.5 hover:bg-blue-700 transition">
            <Plus size={16} strokeWidth={3} /> THÊM LỆNH SỬA CHỮA (RO)
          </button>
        </div>
      </div>

      {/* Select Customer Modal */}
      {isCustomerListOpen && (
        <SelectionModal
          title="Chọn khách hàng"
          data={MOCK_CUSTOMERS}
          onClose={() => setIsCustomerListOpen(false)}
          onSelect={handleSelectCustomer}
          currentId={selectedCustomer.id}
        />
      )}

      {/* Select Driver Modal */}
      {isDriverListOpen && (
        <SelectionModal
          title="Chọn tài xế"
          data={MOCK_DRIVERS}
          onClose={() => setIsDriverListOpen(false)}
          onSelect={handleSelectDriver}
          currentId={selectedDriver.id}
        />
      )}
    </div>
  );
}

/**
 * UTILS
 */
function NavBtn({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full transition gap-1 ${
        isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="text-[9px] line-clamp-1">{label}</span>
    </button>
  );
}

function SelectionModal({
  title,
  data,
  onClose,
  onSelect,
  currentId
}: {
  title: string;
  data: any[];
  onClose: () => void;
  onSelect: (item: any) => void;
  currentId: number;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-t-xl sm:rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[70vh] animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-4">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="font-bold text-[13px] text-gray-800 uppercase">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-1 rounded">
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex flex-col">
          {data.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 flex justify-between items-center ${currentId === item.id ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
            >
              <div>
                <div className={`text-[13px] font-semibold ${currentId === item.id ? 'text-blue-700' : 'text-gray-900'}`}>{item.name}</div>
                <div className="text-[11px] font-mono text-gray-500 mt-0.5">{item.phone}</div>
              </div>
              {currentId === item.id && <Check size={16} className="text-blue-600" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
