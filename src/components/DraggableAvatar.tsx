import React, { useState, useEffect } from 'react';

const DraggableAvatar: React.FC = () => {
  const [position, setPosition] = useState({ x: 10, y: window.innerHeight - 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEarClicked, setIsEarClicked] = useState(false);

  // 添加说话动画效果
  useEffect(() => {
    const speakInterval = setInterval(() => {
      if (!isEarClicked) {
        setIsSpeaking(true);
        setIsClosing(false);
        setTimeout(() => {
          setIsSpeaking(false);
          setIsClosing(true);
          setTimeout(() => setIsClosing(false), 2000);
        }, 2000);
      }
    }, 4000);

    return () => clearInterval(speakInterval);
  }, [isEarClicked]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // 确保图标不会拖出视窗
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;

    setPosition({
      x: Math.min(Math.max(0, newX), maxX),
      y: Math.min(Math.max(0, newY), maxY)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleEarClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发拖动
    setIsEarClicked(!isEarClicked);
    if (!isEarClicked) {
      setIsSpeaking(false);
      setIsClosing(true);
      setTimeout(() => setIsClosing(false), 2000);

      // 发送webhook请求
      try {
        await fetch('https://hook.us2.make.com/eo5l39q1rbqibh1cq6wl2a7xo6ztvp3m', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: '请说话please'
          })
        });
      } catch (error) {
        console.error('发送webhook请求失败:', error);
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: 'move',
        zIndex: 1000,
        userSelect: 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          {/* 白色脸部 */}
          <div className="w-12 h-12 bg-white rounded-full absolute top-2 left-2"></div>
          
          {/* 眼睛 */}
          <div className="absolute top-5 left-4 w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute top-5 right-4 w-2 h-2 bg-black rounded-full"></div>
          
          {/* 鼻子 */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          
          {/* 嘴巴 */}
          <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 bg-black rounded-b-full transition-all duration-2000 ${
            isSpeaking ? 'h-3' : isClosing ? 'h-1' : 'h-3'
          }`}></div>

          {/* 麦克风图标 */}
          <div 
            className="absolute -top-4 left-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleEarClick}
          >
            <svg
              className={`w-4 h-4 transition-colors duration-200 ${isEarClicked ? 'text-red-500' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <div 
            className="absolute -top-4 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer"
            onClick={handleEarClick}
          >
            <svg
              className={`w-4 h-4 transition-colors duration-200 ${isEarClicked ? 'text-red-500' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
        </div>
        {/* WiFi图标 */}
        <div className={`absolute bottom-2 -right-4 w-5 h-5 transform rotate-90 transition-opacity duration-2000 ${
          isSpeaking && !isEarClicked ? 'opacity-100' : 'opacity-0'
        }`}>
          <svg
            className={`w-full h-full transition-colors duration-2000 ${
              isSpeaking ? 'text-red-500' : 'text-green-500'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DraggableAvatar; 