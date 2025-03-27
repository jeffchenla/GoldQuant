import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import AssetManagement from './pages/AssetManagement';
import MarketAnalysis from './pages/MarketAnalysis';
import StrategyAnalysis from './pages/StrategyAnalysis';
import RiskManagement from './pages/RiskManagement';
import SystemMaintenance from './pages/SystemMaintenance';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState('asset');
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activePage) {
      case 'asset':
        return <AssetManagement />;
      case 'market':
        return <MarketAnalysis />;
      case 'strategy':
        return <StrategyAnalysis />;
      case 'risk':
        return <RiskManagement />;
      case 'system':
        return <SystemMaintenance />;
      default:
        return children;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 顶部导航栏 - 1/10 高度 */}
      <header className="h-[10vh] bg-white border-b border-gray-200 flex justify-between items-center px-4">
        <div className="text-xl font-bold text-gray-800">GoldQuant</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
            <span className="text-gray-600">{user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            退出登录
          </button>
        </div>
      </header>

      {/* 主要内容区域 - 9/10 高度 */}
      <div className="flex-1 flex">
        {/* 左侧菜单 - 1/20 宽度 */}
        <nav className="w-[5vw] bg-gray-50 border-r border-gray-200 py-4">
          <ul className="space-y-2">
            <li 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer ${activePage === 'asset' ? 'bg-gray-100' : ''}`}
              onClick={() => setActivePage('asset')}
            >
              <div className="flex flex-col items-center">
                <span>资产</span>
                <span>管理</span>
              </div>
            </li>
            <li 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer ${activePage === 'market' ? 'bg-gray-100' : ''}`}
              onClick={() => setActivePage('market')}
            >
              <div className="flex flex-col items-center">
                <span>市场</span>
                <span>分析</span>
              </div>
            </li>
            <li 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer ${activePage === 'strategy' ? 'bg-gray-100' : ''}`}
              onClick={() => setActivePage('strategy')}
            >
              <div className="flex flex-col items-center">
                <span>策略</span>
                <span>分析</span>
              </div>
            </li>
            <li 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer ${activePage === 'risk' ? 'bg-gray-100' : ''}`}
              onClick={() => setActivePage('risk')}
            >
              <div className="flex flex-col items-center">
                <span>风险</span>
                <span>管理</span>
              </div>
            </li>
            <li 
              className={`px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer ${activePage === 'system' ? 'bg-gray-100' : ''}`}
              onClick={() => setActivePage('system')}
            >
              <div className="flex flex-col items-center">
                <span>系统</span>
                <span>维护</span>
              </div>
            </li>
          </ul>
        </nav>

        {/* 右侧内容区域 - 19/20 宽度 */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout; 