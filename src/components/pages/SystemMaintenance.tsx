import React from 'react';

const SystemMaintenance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">系统维护</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          系统诊断
        </button>
      </div>

      {/* 系统状态 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">系统状态</h3>
          <p className="text-2xl font-bold text-green-600">正常</p>
          <p className="text-sm text-gray-500">运行时间: 30天</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">CPU使用率</h3>
          <p className="text-2xl font-bold text-gray-800">45%</p>
          <p className="text-sm text-gray-500">较昨日 -5%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">内存使用</h3>
          <p className="text-2xl font-bold text-gray-800">2.3GB</p>
          <p className="text-sm text-gray-500">总内存: 8GB</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">磁盘空间</h3>
          <p className="text-2xl font-bold text-gray-800">65%</p>
          <p className="text-sm text-gray-500">可用: 175GB</p>
        </div>
      </div>

      {/* 系统日志 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">系统日志</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-800">系统更新完成</h4>
                <p className="text-sm text-gray-600">版本: 1.2.3</p>
              </div>
              <span className="text-sm text-gray-500">2小时前</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-800">数据库备份</h4>
                <p className="text-sm text-gray-600">大小: 2.5GB</p>
              </div>
              <span className="text-sm text-gray-500">5小时前</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-800">性能优化</h4>
                <p className="text-sm text-gray-600">响应时间提升 15%</p>
              </div>
              <span className="text-sm text-gray-500">1天前</span>
            </div>
          </div>
        </div>
      </div>

      {/* 系统设置 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">系统设置</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">自动备份</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>每天</option>
                <option>每周</option>
                <option>每月</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">日志保留时间</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>7天</option>
                <option>30天</option>
                <option>90天</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">系统通知</label>
              <div className="mt-2 space-y-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">系统更新通知</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">性能警告</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">安全警报</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMaintenance; 