import React from 'react';

const TradeManagement: React.FC = () => {
  return (
    <div className="h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">交易管理</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          新建交易
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-600">交易管理功能开发中...</p>
        </div>
      </div>
    </div>
  );
};

export default TradeManagement; 