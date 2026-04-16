import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { CHAT_DATA } from "../constants/chatdata";
import { cn } from "../utils/cn";
import avatarImg from "../assets/images/new-me-ani.png";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: "bot", text: CHAT_DATA.intro }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  
  const chatWindowRef = useRef(null);
  const scrollRef = useRef(null);

  // URL 감지 및 링크 변환 헬퍼 함수
  const renderMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline font-medium hover:opacity-80 break-all transition-opacity"
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 창 열기/닫기 애니메이션
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatWindowRef.current,
        { opacity: 0, scale: 0.8, y: 20, pointerEvents: "none" },
        { opacity: 1, scale: 1, y: 0, pointerEvents: "auto", duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(chatWindowRef.current, {
        opacity: 0, scale: 0.8, y: 20, pointerEvents: "none", duration: 0.3, ease: "power2.in"
      });
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    setShowOptions(false);
    
    // 1. 사용자 질문 추가
    const userMsg = { id: Date.now(), type: "user", text: option.label };
    setMessages(prev => [...prev, userMsg]);

    // 2. 약간의 지연 후 봇 답변 추가 (자연스러운 느낌)
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, type: "bot", text: option.answer };
      setMessages(prev => [...prev, botMsg]);
      setShowOptions(true); // 다시 옵션 보여주기
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        className={cn(
          "w-[320px] sm:w-[380px] h-[500px] bg-white/90 backdrop-blur-xl rounded-[24px] shadow-2xl border border-violet-100 flex flex-col overflow-hidden origin-bottom-right opacity-0"
        )}
      >
        {/* Header */}
        <div className="bg-violet-500 p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white/20 flex items-center justify-center">
              <img src={avatarImg} alt="Assistant" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-medium text-sm">HIZINI</h3>
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <p className="text-[10px] text-violet-300 uppercase tracking-tighter">Always Online</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-hide"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "max-w-[80%] p-3.5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap",
                msg.type === "bot" 
                  ? "bg-slate-100 text-slate-700 self-start rounded-bl-none" 
                  : "bg-violet-500 text-white self-end rounded-br-none shadow-md"
              )}
            >
              {renderMessageWithLinks(msg.text)}
            </div>
          ))}
          
          {/* Options */}
          {showOptions && (
            <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-[11px] text-slate-400 font-medium px-1 uppercase tracking-wider">궁금한 내용을 선택해주세요</p>
              <div className="flex flex-wrap gap-2">
                {CHAT_DATA.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    className="px-4 py-2 bg-violet-50 hover:bg-violet-100 text-violet-600 border border-violet-200 rounded-full text-[13px] transition-all hover:scale-103 active:scale-95 cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-300">I'm so glad you found me :D</p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative cursor-pointer w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform active:scale-90",
          isOpen 
            ? "bg-slate-800 text-white rotate-90" 
            : "bg-violet-500 text-white hover:scale-103 hover:shadow-violet-200/50"
        )}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faComments} className="text-2xl" />
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 border-2 border-white rounded-full animate-bounce shadow-sm"></span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
