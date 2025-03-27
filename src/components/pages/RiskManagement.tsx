import React from 'react';

const RiskManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">风险管理</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          设置风险参数
        </button>
      </div>

      {/* 风险概览 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">当前风险等级</h3>
          <p className="text-2xl font-bold text-yellow-600">中等</p>
          <p className="text-sm text-gray-500">较昨日 持平</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">最大回撤</h3>
          <p className="text-2xl font-bold text-red-600">-8.3%</p>
          <p className="text-sm text-gray-500">警戒线 -10%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">波动率</h3>
          <p className="text-2xl font-bold text-gray-800">2.5%</p>
          <p className="text-sm text-gray-500">较昨日 +0.3%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">夏普比率</h3>
          <p className="text-2xl font-bold text-green-600">1.8</p>
          <p className="text-sm text-gray-500">风险调整收益</p>
        </div>
      </div>

      {/* 风险预警 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">风险预警</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-yellow-800">BTC/USDT 波动率过高</h4>
                <p className="text-sm text-yellow-700">当前波动率 3.2%，超过警戒线 2.5%</p>
              </div>
              <button className="text-sm text-yellow-800 hover:text-yellow-900">查看详情</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-red-800">ETH/USDT 接近止损线</h4>
                <p className="text-sm text-red-700">当前价格 $3,100，止损线 $3,000</p>
              </div>
              <button className="text-sm text-red-800 hover:text-red-900">查看详情</button>
            </div>
          </div>
        </div>
      </div>

      {/* 风险控制参数 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">风险控制参数</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">单笔交易最大金额</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="10000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">止损线设置</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">最大回撤限制</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="15" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">波动率警戒线</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="2.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagement; 