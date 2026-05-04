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
  Check,
  Shield,
  User,
  Zap,
  Clock,
  FileText,
  Trash,
  CheckCircle,
  Settings2,
  Menu,
  Filter,
  History,
  ClipboardCheck,
  Truck,
  Info,
  Mic,
  Video,
  Upload,
  RotateCcw,
  Save,
  MessageSquare
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

const MOCK_RO_LIST = [
  {
    id: 1,
    plate: '30A-123.45',
    car: 'Toyota Vios',
    isRetail: true,
    hasInsurance: true,
    customerName: 'Nguyễn Văn A',
    customerPhone: '0912.345.xxx',
    driverName: 'Trần Văn B',
    driverPhone: '0987.654.xxx',
    status: 'Chờ vật tư về',
    subStatus: 'Đang xử lý...',
    hasDeposit: true,
    expectedTime: '16:30',
    remainingTime: 'Còn 60 phút',
    totalTime: '02:30',
    hereTime: '00:45',
    borderColor: 'border-l-4 border-l-green-600 border-y border-r border-gray-200',
    btnColor: 'bg-green-600',
  },
  {
    id: 2,
    plate: '51H-999.99',
    car: 'Ford Ranger',
    isRetail: false,
    hasInsurance: false,
    customerName: 'Phạm Thị C',
    customerPhone: '0903.456.xxx',
    driverName: 'Lê Văn D',
    driverPhone: '0901.234.xxx',
    status: 'Đang sửa chữa',
    subStatus: 'Cầu nâng số 2...',
    hasDeposit: false,
    expectedTime: '17:00',
    remainingTime: 'Còn 90 phút',
    totalTime: '01:15',
    hereTime: '01:15',
    borderColor: 'border-l-4 border-l-blue-600 border-y border-r border-gray-200',
    btnColor: 'bg-blue-600',
  },
  {
    id: 3,
    plate: '60C-111.22',
    car: 'Hyundai SantaFe',
    isRetail: true,
    hasInsurance: true,
    customerName: 'Trần Đại E',
    customerPhone: '0933.789.xxx',
    driverName: 'Trần Đại E',
    driverPhone: '0933.789.xxx',
    status: 'Chờ khách duyệt',
    subStatus: 'Báo giá bổ sung...',
    hasDeposit: true,
    expectedTime: '10:00',
    remainingTime: 'Tạm dừng',
    totalTime: '04:00',
    hereTime: '02:30',
    borderColor: 'border-l-4 border-l-orange-500 border-y border-r border-gray-200',
    btnColor: 'bg-orange-500',
  }
];

const MOCK_INSPECTION_DATA = [
  {
    id: 'c1',
    name: 'Ngoại thất & Sạc',
    items: [
      { id: 'i1', name: 'Đèn pha / Cốt', help: 'Kiểm tra độ sáng, ố vàng, nứt vỡ.' },
      { id: 'i2', name: 'Gạt mưa', help: 'Kiểm tra độ mòn chổi gạt, độ rách cao su, xước kính.' }
    ]
  },
  {
    id: 'c2',
    name: 'Bánh xe và Gầm',
    items: [
      { id: 'i3', name: 'Áp suất lốp', help: 'Kiểm tra áp suất tiêu chuẩn 2.2 - 2.5 bar, vết chém nứt.' },
      { id: 'i4', name: 'Phanh cơ bản', help: 'Kiểm tra độ mòn bố phanh, đĩa phanh và cụm thước.' }
    ]
  },
  {
    id: 'c3',
    name: 'Khoang máy và Điện',
    items: [
      { id: 'i5', name: 'Dầu động cơ', help: 'Mức dầu trên ty thăm dầu, màu sắc và độ nhớt.' },
      { id: 'i6', name: 'Bình Ắc quy', help: 'Mức dung dịch, cọc bình, chỉ số CCA.' }
    ]
  },
  {
    id: 'c4',
    name: 'Nội thất và Tiện nghi',
    items: [
      { id: 'i7', name: 'Hệ thống lạnh (AC)', help: 'Độ lạnh cửa gió, tốc độ quạt, mùi hôi.' },
      { id: 'i8', name: 'Cảnh báo đồng hồ', help: 'Kiểm tra các đèn cảnh báo trên màn hình lái.' }
    ]
  }
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
  key?: React.Key;
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
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'not_found' | 'history' | 'create_ro' | 'error'>(
    'idle'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectedInspectionRO, setSelectedInspectionRO] = useState<any>(null);
  const [selectedHistoryRO, setSelectedHistoryRO] = useState<any>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const renderContent = () => {
    if (selectedInspectionRO) {
      return (
        <InspectionView 
          ro={selectedInspectionRO}
          onBack={() => setSelectedInspectionRO(null)}
          onSave={() => {
            setSelectedInspectionRO(null);
            showToast('Đã lưu dữ liệu kiểm tra thành công');
          }}
        />
      );
    }

    if (selectedHistoryRO) {
      return (
        <ROHistoryView
          ro={selectedHistoryRO}
          onBack={() => setSelectedHistoryRO(null)}
        />
      );
    }
    
    if (activeTab === 'scan') {
      if (scanState === 'idle' || scanState === 'scanning' || scanState === 'error') {
        return <CameraScannerView scanState={scanState} setScanState={setScanState} />;
      }
      if (scanState === 'not_found') {
        return <NotFoundResultView onBack={() => setActiveTab('home')} />;
      }
      if (scanState === 'history') {
        return <VehicleHistoryView showToast={showToast} onBack={() => setActiveTab('home')} onCreateRO={() => setScanState('create_ro')} />;
      }
      if (scanState === 'create_ro') {
        return <CreateROView onBack={() => setScanState('history')} onSuccess={() => {
           setScanState('idle');
           setActiveTab('home');
           showToast('Đã tạo RO thành công');
        }} showToast={showToast} />;
      }
    }

    if (activeTab === 'home') {
      return <ROListView onInspect={(ro) => setSelectedInspectionRO(ro)} onHistory={(ro) => setSelectedHistoryRO(ro)} />;
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
            <span className="hidden text-[9px] text-blue-600 absolute -bottom-2 w-full text-center font-bold mt-1">
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
  onCreateRO
}: {
  showToast: (msg: string) => void;
  onBack: () => void;
  onCreateRO: () => void;
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
          <button onClick={onCreateRO} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg text-[14px] flex items-center justify-center gap-1.5 hover:bg-blue-700 transition">
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

function ROListView({ onInspect, onHistory }: { onInspect: (ro: any) => void; onHistory: (ro: any) => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <div className="flex gap-2">
          <Menu size={20} />
          <h1 className="font-bold text-[14px] uppercase tracking-wide">Quản lý lệnh (RO)</h1>
        </div>
        <div className="flex gap-3">
          <Search size={18} />
          <Filter size={18} />
        </div>
      </div>

      {/* RO List */}
      <div className="p-3 flex flex-col gap-3">
        {MOCK_RO_LIST.map((ro) => (
          <div key={ro.id} className={`bg-white rounded ${ro.borderColor} shadow-sm overflow-hidden flex flex-col`}>
            
            {/* Header / License & Badges */}
            <div className="flex justify-between items-start p-3 border-b border-gray-100 border-dashed">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[14px] text-gray-900 border-b-2 border-black inline-block pb-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {ro.plate} <span className="font-normal text-gray-500 text-[12px]">• {ro.car}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  {ro.isRetail && <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded uppercase">Khách lẻ</span>}
                  {ro.hasInsurance && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                      <Shield size={10} /> Có BH
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* User & Driver */}
            <div className="p-3 flex flex-col gap-1 border-b border-gray-100 border-dashed bg-gray-50/50">
               <div className="flex items-center gap-2 text-[12px] text-gray-700">
                  <User size={12} className="text-gray-400" />
                  <span className="truncate">{ro.customerName} - <span className="text-gray-500 font-mono">{ro.customerPhone}</span></span>
               </div>
               <div className="flex items-center gap-2 text-[12px] text-gray-700">
                  <Zap size={12} className="text-gray-400" />
                  <span className="truncate">LX: {ro.driverName} - <span className="text-gray-500 font-mono">{ro.driverPhone}</span></span>
               </div>
            </div>

            {/* Status & Time Tracking */}
            <div className="p-3 flex flex-col gap-2 relative">
               <div className="flex justify-between items-start mb-1">
                 <div>
                   <div className="font-bold text-[13px] text-green-700">{ro.status}</div>
                   <div className="text-[11px] text-gray-500 italic">{ro.subStatus}</div>
                 </div>
                 {ro.hasDeposit && (
                   <span className="text-[9px] text-gray-500 border border-gray-300 rounded px-1.5 py-0.5 uppercase tracking-wide">
                     Đã cọc
                   </span>
                 )}
               </div>

               <div className="grid grid-cols-2 gap-2 bg-green-50/50 rounded p-2 text-[11px]">
                  <div className="flex flex-col gap-0.5 border-r border-green-100">
                     <span className="text-gray-500 uppercase text-[9px] font-bold">Dự kiến giao</span>
                     <span className="font-bold text-[13px] text-gray-900">{ro.expectedTime}</span>
                     <span className="text-gray-600">{ro.remainingTime}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 pl-1">
                     <span className="text-gray-500 uppercase text-[9px] font-bold">Thực tế</span>
                     <span className="text-gray-800">Tổng: {ro.totalTime}</span>
                     <span className="font-bold text-[12px] text-gray-900">Tại đây: {ro.hereTime}</span>
                  </div>
               </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col border-t border-gray-100 bg-gray-50">
               {/* Dòng 1 */}
               <div className="flex h-[36px] border-b border-gray-100">
                 <button className="flex-1 text-gray-700 font-medium text-[10px] sm:text-[11px] flex flex-col items-center justify-center gap-0.5 border-r border-gray-100 hover:bg-gray-100 transition">
                   <div className="flex items-center gap-1"><Camera size={13} className="text-blue-600" /> Tiếp nhận</div>
                 </button>
                 <button className="flex-1 text-gray-700 font-medium text-[10px] sm:text-[11px] flex flex-col items-center justify-center gap-0.5 border-r border-gray-100 hover:bg-gray-100 transition">
                   <div className="flex items-center gap-1"><Camera size={13} className="text-green-600" /> Bàn giao</div>
                 </button>
                 <button onClick={() => onHistory(ro)} className="flex-1 text-gray-700 font-medium text-[10px] sm:text-[11px] flex flex-col items-center justify-center gap-0.5 hover:bg-gray-100 transition">
                   <div className="flex items-center gap-1"><History size={13} className="text-purple-600" /> Lịch sử xe</div>
                 </button>
               </div>
               {/* Dòng 2 */}
               <div className="flex h-[36px]">
                 <button onClick={() => onInspect(ro)} className="flex-1 text-gray-700 font-medium text-[10px] sm:text-[11px] flex flex-col items-center justify-center gap-0.5 border-r border-gray-100 hover:bg-gray-100 transition">
                   <div className="flex items-center gap-1"><ClipboardCheck size={13} className="text-orange-500" /> Kiểm tra</div>
                 </button>
                 <button className="flex-1 text-gray-700 font-medium text-[10px] sm:text-[11px] flex flex-col items-center justify-center gap-0.5 border-r border-gray-100 hover:bg-gray-100 transition">
                   <div className="flex items-center gap-1"><Truck size={13} className="text-teal-600" /> SC lưu động</div>
                 </button>
                 <button className="flex-1 text-gray-700 font-medium text-[10px] sm:text-[11px] flex flex-col items-center justify-center gap-0.5 hover:bg-gray-100 transition">
                   <div className="flex items-center gap-1"><Shield size={13} className="text-blue-500" /> Bảo hiểm</div>
                 </button>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

function CreateROView({
  showToast,
  onBack,
  onSuccess
}: {
  showToast: (msg: string) => void;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(MOCK_CUSTOMERS[0]);
  const [selectedDriver, setSelectedDriver] = useState(MOCK_DRIVERS[0]);

  const [isCustomerListOpen, setIsCustomerListOpen] = useState(false);
  const [isDriverListOpen, setIsDriverListOpen] = useState(false);
  
  const [km, setKm] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // Poka-yoke for phone display
  const formatPhone = (p: string) => p.replace(/\./g, ' ').replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');

  // Format KM with commas
  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    if (!numericValue) {
      setKm('');
      return;
    }
    setKm(parseInt(numericValue, 10).toLocaleString('en-US'));
  }

  const handleCreate = () => {
    onSuccess();
  }

  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col pb-16">
      {/* Header */}
      <div className="bg-white py-3 px-4 sticky top-0 z-30 flex items-center justify-between border-b border-gray-200">
         <button onClick={onBack} className="text-gray-600 mr-2">
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1 flex justify-center text-[12px] font-bold text-gray-800 tracking-wide uppercase px-2">
           Thêm mới Lệnh sửa chữa<br/>
           <div className="inline-block mt-0.5 relative border-2 border-[#333] rounded px-2.5 py-0.5 bg-white flex justify-center items-center scale-90">
             <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-5 h-[1px] bg-gray-300"></div>
             <span className="text-lg font-extrabold tracking-[1px] text-black">
               52H-222.22
             </span>
           </div>
        </div>
        
        <div className="w-5"></div>
      </div>

      <div className="flex flex-col">
        {/* 1. Nhóm thông tin xe (Readonly) */}
        <Accordion title="Thông tin xe" defaultOpen={true}>
          <div className="flex flex-col bg-gray-100/50">
             <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Biển số xe</span>
              <span className="text-[12px] font-bold text-gray-800 flex-1 text-right">52H-222.22</span>
            </div>
            <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Tên / Hiệu xe</span>
              <span className="text-[12px] font-medium text-gray-800 flex-1 text-right">Camry 2.0E 2022 / Toyota</span>
            </div>
            <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-[12px] text-gray-500 w-[100px]">Loại xe</span>
              <span className="text-[12px] font-medium text-gray-800 flex-1 text-right">Sedan 4 chỗ</span>
            </div>
          </div>
        </Accordion>

        {/* 2. Nhóm khách hàng & Tài xế */}
        <Accordion title="Khách hàng & Tài xế" defaultOpen={true}>
          <div className="flex flex-col">
            {/* Khách hàng */}
            <div className="px-4 py-2 border-b border-gray-50">
               <div className="flex items-center justify-between mb-1">
                 <span className="text-[12px] text-gray-500">Khách hàng</span>
                 <div className="flex gap-2">
                   <button onClick={() => setIsCustomerListOpen(true)} className="text-blue-600 p-1 bg-blue-50 rounded"><List size={14} /></button>
                 </div>
               </div>
               <div className="text-[14px] font-bold text-gray-800">{selectedCustomer.name}</div>
               <button className="text-[11px] text-green-600 font-medium flex items-center gap-1 mt-1"><Plus size={12} /> Thêm mới</button>
            </div>
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <span className="text-[12px] text-gray-500 w-[100px]">Số điện thoại</span>
              <span className="text-[14px] font-mono font-bold text-gray-800 flex-1 text-right">{formatPhone(selectedCustomer.phone)}</span>
            </div>

            {/* Tài xế */}
            <div className="px-4 py-2 border-b border-gray-50 mt-1">
               <div className="flex items-center justify-between mb-1">
                 <span className="text-[12px] text-gray-500">Tài xế</span>
                 <div className="flex gap-2">
                   <button onClick={() => setIsDriverListOpen(true)} className="text-blue-600 p-1 bg-blue-50 rounded"><List size={14} /></button>
                 </div>
               </div>
               <div className="text-[14px] font-bold text-gray-800">{selectedDriver.name}</div>
               <button className="text-[11px] text-green-600 font-medium flex items-center gap-1 mt-1"><Plus size={12} /> Thêm mới</button>
            </div>
            <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <span className="text-[12px] text-gray-500 w-[100px]">Số điện thoại</span>
              <span className="text-[14px] font-mono font-bold text-gray-800 flex-1 text-right">{formatPhone(selectedDriver.phone)}</span>
            </div>
          </div>
        </Accordion>

        {/* 3. Nhóm Ghi nhận thông tin */}
        <Accordion title="Ghi nhận thông tin" defaultOpen={true}>
          <div className="flex flex-col p-4 gap-4">
             {/* Yêu cầu của khách */}
             <div>
                <label className="text-[12px] text-gray-500 mb-1 block">Yêu cầu của khách hàng</label>
                <textarea 
                  className="w-full bg-white border border-gray-300 rounded p-2 text-[13px] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                  rows={3}
                  placeholder="Nhập yêu cầu..."
                />
             </div>

             {/* Ngày nhận / Giao xe */}
             <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="text-[12px] text-gray-500 mb-1 block">Ngày nhận (Tự động)</label>
                   <div className="bg-gray-100 text-[12px] font-semibold text-gray-700 p-2 border border-gray-200 rounded">
                      14:30 - 22/04/2026
                   </div>
                </div>
                <div>
                   <label className="text-[12px] text-gray-500 mb-1 block">Dự kiến giao</label>
                   <div className="bg-gray-100 text-[12px] font-semibold text-gray-700 p-2 border border-gray-200 rounded">
                      16:30 - 22/04/2026
                   </div>
                </div>
             </div>

             {/* Số KM */}
             <div>
                <label className="text-[12px] text-gray-500 mb-1 block">Số ki-lô-mét (km) hiện tại</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={km}
                    onChange={handleKmChange}
                    placeholder="0"
                    className="flex-1 bg-white border border-gray-300 rounded p-2 text-[16px] font-bold text-blue-700 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <div className="text-[14px] font-bold text-gray-500">km</div>
                </div>
             </div>

             {/* Khu vực Hình ảnh */}
             <div>
                <label className="text-[12px] text-gray-500 mb-1 block">Hình ảnh xe</label>
                <button 
                  onClick={() => setImages([...images, `https://picsum.photos/seed/${Math.random()}/200`])}
                  className="w-full h-[60px] border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 mb-2"
                >
                   <Camera size={20} className="mb-1" />
                   <span className="text-[10px] font-medium uppercase">Chụp ảnh xe</span>
                </button>

                {images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                     {images.map((img, idx) => (
                       <div key={idx} className="relative w-16 h-16 shrink-0 rounded overflow-hidden border border-gray-200">
                          <img src={img} alt="xe" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md"
                          >
                             <X size={10} strokeWidth={3} />
                          </button>
                       </div>
                     ))}
                  </div>
                )}
             </div>
          </div>
        </Accordion>

        {/* Action Bottom */}
        <div className="px-4 mt-6 mb-6">
          <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold tracking-wide py-3.5 rounded-lg text-[14px] shadow-sm hover:bg-blue-700 transition uppercase">
            Ghi sổ
          </button>
        </div>

      </div>

      {isCustomerListOpen && (
        <SelectionModal
          title="Chọn khách hàng"
          data={MOCK_CUSTOMERS}
          onClose={() => setIsCustomerListOpen(false)}
          onSelect={(cus) => { setSelectedCustomer(cus); setIsCustomerListOpen(false); }}
          currentId={selectedCustomer.id}
        />
      )}
      {isDriverListOpen && (
        <SelectionModal
          title="Chọn tài xế"
          data={MOCK_DRIVERS}
          onClose={() => setIsDriverListOpen(false)}
          onSelect={(drv) => { setSelectedDriver(drv); setIsDriverListOpen(false); }}
          currentId={selectedDriver.id}
        />
      )}
    </div>
  );
}

function InspectionItemRow({ item, index, status, onStatusChange }: any) {
  const [showHelp, setShowHelp] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isNoteActive, setIsNoteActive] = useState(false);
  
  // Lịch sử file (chụp ảnh, video, upload, etc)
  const [hasMedia, setHasMedia] = useState(false);

  return (
    <div className="flex flex-col border-b border-gray-200 py-3 bg-white">
       <div className="flex items-center gap-2 mb-2 px-3 relative">
          <span className="text-[13px] font-bold text-[#3B6E4B] w-5">{index + 1}.</span>
          <span className="text-[13px] font-medium text-gray-800 flex-1">{item.name}</span>
          <button 
             onClick={() => setShowHelp(!showHelp)}
             className="w-5 h-5 rounded-full bg-[#14A64A] text-white flex items-center justify-center relative cursor-pointer z-10"
          >
             <Info size={12} strokeWidth={3} />
          </button>
          {/* Tooltip */}
          {showHelp && (
            <div className="absolute right-8 top-0 p-2 bg-gray-800 text-white text-[11px] rounded shadow-lg max-w-[200px] z-50">
               {item.help}
            </div>
          )}
       </div>

       {/* Kết quả (Đánh giá nhanh) - 3 nút */}
       <div className="flex gap-2 px-3 mb-3">
         <button 
           onClick={() => onStatusChange(item.id, 'GOOD')}
           className={`flex-1 flex justify-center py-2 rounded font-bold text-[11px] uppercase tracking-wide border-2 transition ${status === 'GOOD' ? 'bg-[#14A64A] text-white border-[#14A64A]' : 'bg-white text-[#14A64A] border-[#14A64A] hover:bg-green-50'}`}
         >
           Tốt
         </button>
         <button 
           onClick={() => onStatusChange(item.id, 'MONITOR')}
           className={`flex-1 flex justify-center py-2 rounded font-bold text-[11px] uppercase tracking-wide border-2 transition ${status === 'MONITOR' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-white text-yellow-500 border-yellow-400 hover:bg-yellow-50'}`}
         >
           Theo dõi
         </button>
         <button 
           onClick={() => onStatusChange(item.id, 'FIX')}
           className={`flex-1 flex justify-center py-2 rounded font-bold text-[11px] uppercase tracking-wide border-2 transition ${status === 'FIX' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-600 border-red-600 hover:bg-red-50'}`}
         >
           Cần xử lý
         </button>
       </div>

       {/* Các nút hành động hỗ trợ */}
       <div className="flex items-center justify-between px-3">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsNoteActive(!isNoteActive)}
              className={`p-1.5 rounded transition ${isNoteActive || noteText ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <MessageSquare size={16} />
            </button>
            <button onClick={() => setHasMedia(true)} className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
              <Camera size={16} />
            </button>
            <button onClick={() => setHasMedia(true)} className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
              <Video size={16} />
            </button>
            <button onClick={() => setHasMedia(true)} className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
              <Upload size={16} />
            </button>
          </div>
          
          {(noteText || hasMedia) && (
             <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
               <History size={12} /> Xem lại
             </button>
          )}
       </div>

       {/* Note interaction box */}
       {isNoteActive && (
         <div className="mx-3 mt-2 bg-blue-50/50 p-2 border border-blue-100 rounded">
            {!isRecording ? (
               <div className="flex items-center justify-center p-4">
                 <button onClick={() => setIsRecording(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium text-[12px] shadow-sm hover:bg-blue-700">
                    <Mic size={14} /> Nói để nhập liệu
                 </button>
               </div>
            ) : (
               <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-center h-8 bg-blue-100/50 rounded overflow-hidden">
                    {/* Simulated visualizer */}
                    <div className="flex items-center h-full gap-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-1 bg-blue-500 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                 </div>
                 <div className="flex gap-2 w-full mt-2">
                   <button onClick={() => { setIsRecording(false); setNoteText(''); setIsNoteActive(false); }} className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded text-[11px] font-bold flex items-center justify-center gap-1">
                      <Trash size={12} /> Xóa
                   </button>
                   <button onClick={() => { setIsRecording(false); setTimeout(() => setIsRecording(true), 100); }} className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded text-[11px] font-bold flex items-center justify-center gap-1">
                      <RotateCcw size={12} /> Thử lại
                   </button>
                   <button onClick={() => { setIsRecording(false); setNoteText('Nội dung đã ghi âm...'); setIsNoteActive(false); }} className="flex-1 bg-blue-600 text-white py-1.5 rounded text-[11px] font-bold flex items-center justify-center gap-1">
                      <Save size={12} /> Lưu
                   </button>
                 </div>
               </div>
            )}
         </div>
       )}
    </div>
  );
}

function InspectionView({
  ro,
  onBack,
  onSave
}: {
  ro: any;
  onBack: () => void;
  onSave: () => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [carType, setCarType] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'GOOD' | 'MONITOR' | 'FIX'
  const [results, setResults] = useState<Record<string, string>>({}); // item.id -> status

  const handleStatusChange = (id: string, status: string) => {
    setResults(prev => ({ ...prev, [id]: status }));
  };

  const handleCreate = () => {
    onSave();
  }

  // Lọc category theo filterMode
  const filteredCategories = MOCK_INSPECTION_DATA.map(cat => {
    const filteredItems = cat.items.filter(item => {
      if (filterMode === 'ALL') return true;
      return results[item.id] === filterMode;
    });
    return { ...cat, items: filteredItems };
  }).filter(cat => cat.items.length > 0);

  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col pb-16">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 flex flex-col border-b border-gray-200 shadow-sm">
         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
           <button onClick={onBack} className="text-gray-600 mr-2">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1 flex flex-col justify-center text-[12px] font-bold text-gray-800 tracking-wide uppercase px-2 text-center">
             <span>Số RO: <span className="text-blue-600 font-mono">112233</span></span>
             <span className="text-[11px] text-gray-500 font-medium normal-case mt-0.5">
               Biển số {ro.plate} - {ro.car}
             </span>
          </div>
          <div className="w-5"></div>
         </div>
         {/* Footer Của header */}
         <div className="p-3 bg-blue-50/30 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-800 text-[13px]">
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={(e) => setIsChecked(e.target.checked)} 
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              Kiểm tra
            </label>
         </div>
      </div>

      {isChecked && (
        <div className="flex flex-col">
           {/* Loại xe (Radio) */}
           <div className="p-4 bg-white border-b border-gray-200">
              <span className="text-[12px] font-bold uppercase text-gray-500 mb-2 block">Loại xe</span>
              <div className="flex gap-4">
                 {['Xe xăng', 'Xe Hybrid', 'Xe điện'].map(type => (
                   <label key={type} className="flex items-center gap-2 text-[13px] font-medium text-gray-800 cursor-pointer">
                     <input 
                       type="radio" 
                       name="cartype" 
                       value={type} 
                       checked={carType === type}
                       onChange={() => setCarType(type)}
                       className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                     />
                     {type}
                   </label>
                 ))}
              </div>
           </div>

           {carType && (
             <>
               {/* Filter Radio */}
               <div className="p-3 bg-gray-50 border-b border-gray-200">
                 <div className="flex flex-wrap gap-2 text-[12px]">
                   <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer transition ${filterMode === 'ALL' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
                      <input type="radio" className="hidden" checked={filterMode === 'ALL'} onChange={() => setFilterMode('ALL')} />
                      Tất cả
                   </label>
                   <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer transition ${filterMode === 'GOOD' ? 'bg-[#14A64A] text-white border-[#14A64A]' : 'bg-white text-[#14A64A] border-[#14A64A]'}`}>
                      <input type="radio" className="hidden" checked={filterMode === 'GOOD'} onChange={() => setFilterMode('GOOD')} />
                      Tốt
                   </label>
                   <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer transition ${filterMode === 'MONITOR' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-white text-yellow-600 border-yellow-400'}`}>
                      <input type="radio" className="hidden" checked={filterMode === 'MONITOR'} onChange={() => setFilterMode('MONITOR')} />
                      Theo dõi
                   </label>
                   <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer transition ${filterMode === 'FIX' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-600 border-red-600'}`}>
                      <input type="radio" className="hidden" checked={filterMode === 'FIX'} onChange={() => setFilterMode('FIX')} />
                      Cần xử lý
                   </label>
                 </div>
               </div>

               {/* Categories */}
               <div className="flex flex-col mb-6">
                 {filteredCategories.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-[13px]">
                       Không có mục nào phù hợp bộ lọc.
                    </div>
                 ) : (
                    filteredCategories.map((cat) => (
                      <Accordion key={cat.id} title={cat.name} defaultOpen={true}>
                         <div className="flex flex-col bg-gray-50 pb-2">
                           {cat.items.map((item, idx) => (
                             <InspectionItemRow 
                               key={item.id} 
                               item={item} 
                               index={idx} 
                               status={results[item.id]} 
                               onStatusChange={handleStatusChange} 
                             />
                           ))}
                         </div>
                      </Accordion>
                    ))
                 )}
               </div>

               {/* Action Bottom */}
               <div className="px-4 mt-2 mb-6">
                 <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-extrabold tracking-[1px] py-4 rounded-lg text-[15px] shadow-sm hover:bg-blue-700 transition uppercase">
                   Ghi sổ
                 </button>
               </div>
             </>
           )}
        </div>
      )}
    </div>
  );
}

function ROHistoryView({ ro, onBack }: { ro: any; onBack: () => void }) {
  const [filter, setFilter] = useState('1 tháng');

  const filters = ['1 tháng', '3 tháng', '1 năm', '2 năm', '3 năm', '5 năm'];

  const MOCK_HISTORY = [
    { 
      group: 'Tuần trước', 
      data: [
        { roNumber: '112232', km: '15.200', days: 15, amount: '1.250.000' }
      ] 
    },
    { 
      group: 'Tháng trước', 
      data: [
        { roNumber: '111005', km: '14.800', days: 30, amount: '850.000' },
        { roNumber: '109012', km: '13.500', days: 60, amount: '3.400.000' }
      ] 
    },
    { 
      group: 'Năm trước', 
      data: [
        { roNumber: '98001', km: '8.000', days: 200, amount: '12.000.000' },
        { roNumber: '85002', km: '3.000', days: 365, amount: '1.500.000' }
      ] 
    }
  ];

  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col pb-16">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 flex flex-col border-b border-gray-200 shadow-sm">
         <div className="flex items-center justify-between px-4 py-3">
           <button onClick={onBack} className="text-gray-600 mr-2">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1 flex flex-col justify-center text-[12px] font-bold text-gray-800 tracking-wide uppercase px-2 text-center">
             <span>Số RO: <span className="text-blue-600 font-mono">112233</span></span>
             <span className="text-[11px] text-gray-500 font-medium normal-case mt-0.5">
               Biển số {ro.plate} - {ro.car}
             </span>
          </div>
          <div className="w-5"></div>
         </div>
         {/* Footer Của header - Gợi ý lọc */}
         <div className="px-3 pb-3 pt-1 border-t border-gray-100 mt-1">
            <div className="text-[10px] text-gray-400 mb-1.5 uppercase font-bold tracking-wide">Thời gian hiển thị</div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
               {filters.map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition whitespace-nowrap ${filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}`}
                 >
                   {f}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Danh sách Lịch sử */}
      <div className="flex flex-col p-3 gap-4">
        {MOCK_HISTORY.map(grp => (
           <div key={grp.group} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">{grp.group}</span>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>
              <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                 {grp.data.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition cursor-pointer">
                       <div className="flex flex-col gap-1">
                          <div className="font-bold text-[13px] text-gray-900 border-b border-gray-200 pb-0.5 inline-block w-fit">
                             RO: <span className="font-mono text-blue-700">{item.roNumber}</span>
                          </div>
                          <div className="text-[11px] text-gray-600 flex items-center gap-2">
                             <span>Odo: <span className="text-gray-900 font-bold">{item.km}</span> km</span>
                             <span className="text-gray-300">|</span>
                             <span>Quay lại: <span className="text-gray-900 font-bold">{item.days}</span> ngày</span>
                          </div>
                          <div className="text-[13px] font-bold text-red-600 mt-1">{item.amount} ₫</div>
                       </div>
                       <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 hover:scale-105 transition-all">
                          <Eye size={18} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        ))}
      </div>
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
