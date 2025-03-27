import React, { useState } from 'react';

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({ isOpen, onClose, onConfirm, title }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456') { // 这里使用固定密码，实际应用中应该使用更安全的方式
      onConfirm();
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入密码"
          />
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              确认
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TradeManagement: React.FC = () => {
  const [isAutoTrading, setIsAutoTrading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');

  const handleAutoTradingClick = () => {
    setDialogTitle(isAutoTrading ? '关闭自动交易' : '开启自动交易');
    setShowPasswordDialog(true);
  };

  const handlePasswordConfirm = () => {
    setIsAutoTrading(!isAutoTrading);
    setShowPasswordDialog(false);
  };

  return (
    <div className="h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">交易管理</h2>
        <div className="flex items-center space-x-6">
          <button
            onClick={handleAutoTradingClick}
            className={`px-4 py-2 text-white rounded-md ${
              isAutoTrading ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isAutoTrading ? '自动交易已开' : '自动交易已关'}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            新建交易
          </button>
        </div>
      </div>

      {/* 密码验证对话框 */}
      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onConfirm={handlePasswordConfirm}
        title={dialogTitle}
      />

      {/* 交易概览卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">今日交易</h3>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">持仓数量</h3>
          <p className="text-2xl font-bold text-gray-800">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">今日盈亏</h3>
          <p className="text-2xl font-bold text-green-600">+¥2,345</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">胜率</h3>
          <p className="text-2xl font-bold text-blue-600">75%</p>
        </div>
      </div>

      {/* 交易列表 */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">交易列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易品种</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开仓价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">当前价格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">持仓数量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">盈亏</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TRD001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">做多</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">黄金</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥1,890.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥1,895.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+¥500.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    持仓中
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">平仓</button>
                  <button className="text-red-600 hover:text-red-900">止损</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 交易设置 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">交易设置</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">止损比例</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">止盈比例</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="4" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">最大持仓数量</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">单笔最大交易量</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeManagement; 