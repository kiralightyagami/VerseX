import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface GameChatProps {
  onClose: () => void;
}

const GameChat: React.FC<GameChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add some initial system messages
    setMessages([
      {
        id: '1',
        sender: 'System',
        text: 'Welcome to verseX!',
        timestamp: new Date(),
        isSystem: true,
      },
      {
        id: '2',
        sender: 'System',
        text: 'Use WASD or arrow keys to move around.',
        timestamp: new Date(),
        isSystem: true,
      },
      {
        id: '3',
        sender: 'Wizard1',
        text: 'Hello everyone!',
        timestamp: new Date(),
      },
      {
        id: '4',
        sender: 'TechGuy',
        text: 'This place looks amazing.',
        timestamp: new Date(),
      },
    ]);
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add new message
    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        'That sounds interesting!',
        'I agree with you.',
        'Let\'s explore more of this place.',
        'Have you tried the other areas?',
      ];
      
      const responseMessage: Message = {
        id: Date.now().toString(),
        sender: Math.random() > 0.5 ? 'Wizard1' : 'TechGuy',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full border-l border-gray-200">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-pixel text-lg">Chat</h3>
        <button 
          onClick={onClose}
          className="md:hidden p-2"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-4 ${msg.isSystem ? 'text-center' : ''}`}
          >
            {!msg.isSystem && (
              <div className="flex justify-between items-baseline mb-1">
                <span className={`font-bold ${msg.sender === 'You' ? 'text-primary-yellow' : 'text-black'}`}>
                  {msg.sender}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            )}
            <p className={`${
              msg.isSystem 
                ? 'text-gray-500 text-sm italic' 
                : 'text-gray-800'
            } font-pixel-body`}>
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 font-pixel-body"
          />
          <Button 
            type="submit"
            className="bg-primary-yellow text-black hover:bg-yellow-400 font-pixel"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GameChat;