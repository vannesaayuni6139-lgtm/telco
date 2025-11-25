import { useState } from 'react';
import { MessageSquare, Send, Mic, Settings, HelpCircle, Plus, BarChart3 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Progress } from '../../ui/progress';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string | JSX.Element;
  timestamp: Date;
}

const quickActions = [
  'Find best package',
  'Check my usage',
  'How to save quota?',
];

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: "Hi, I'm your Recall Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      let responseContent: string | JSX.Element = "I'm here to help! Let me check that for you.";

      if (inputValue.toLowerCase().includes('usage')) {
        responseContent = (
          <div className="space-y-4">
            <p>Here is your current usage for this billing cycle.</p>
            <div className="bg-slate-800 rounded-xl p-4 space-y-4 mt-3">
              <h4 className="text-white">Usage Summary</h4>
              <p className="text-slate-400 text-sm">You are on the 'Unlimited Plus' plan.</p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Data</span>
                    <span className="text-white">15.2 GB / 50 GB Used</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Talk</span>
                    <span className="text-white">450 / 1000 Mins Used</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mt-3">Billing cycle ends in 12 days.</p>
            </div>
          </div>
        );
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Sidebar - Chat History */}
      <aside className="hidden md:block w-64 bg-slate-900 border-r border-slate-800">
        <div className="p-4 space-y-4">
          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
            <Avatar className="size-10">
              <AvatarFallback className="bg-blue-600 text-white">DM</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">David Miller</p>
              <p className="text-slate-400 text-xs truncate">david.miller@email.com</p>
            </div>
          </div>

          {/* New Chat Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl justify-between">
            New Chat
            <Plus className="size-4" />
          </Button>

          {/* Previous Chats */}
          <div className="space-y-1">
            <p className="text-slate-500 text-xs uppercase tracking-wider px-3 py-2">Previous Chats</p>
            
            <button className="w-full text-left px-3 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 flex-shrink-0" />
                <span className="text-sm truncate">Billing Questions</span>
              </div>
            </button>

            <button className="w-full text-left px-3 py-3 text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 flex-shrink-0" />
                <span className="text-sm truncate">Upgrade History</span>
              </div>
            </button>

            <button className="w-full text-left px-3 py-3 text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 flex-shrink-0" />
                <span className="text-sm truncate">Package Comparison</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900">
          <button className="w-full flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="size-5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <HelpCircle className="size-5" />
            <span>Help</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-2">
              <MessageSquare className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-white">Recall Assistant</h2>
              <p className="text-slate-400 text-sm">Always here to help</p>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.length === 1 && (
            <div className="text-center py-12">
              <div className="inline-flex bg-blue-600/20 rounded-full p-6 mb-6">
                <MessageSquare className="size-12 text-blue-500" />
              </div>
              <h2 className="text-white mb-2">Hi, I'm your Recall Assistant.</h2>
              <h2 className="text-white mb-6">How can I help you today?</h2>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    variant="outline"
                    className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-full"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.slice(1).map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && (
                <div className="bg-blue-600 rounded-full p-2 size-10 flex-shrink-0">
                  <MessageSquare className="size-6 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-2xl rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {typeof message.content === 'string' ? (
                  <p>{message.content}</p>
                ) : (
                  message.content
                )}
              </div>

              {message.sender === 'user' && (
                <Avatar className="size-10 flex-shrink-0">
                  <AvatarFallback className="bg-amber-200 text-slate-900">👤</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-800 bg-slate-900/50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Ask me anything about your account..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 pr-12 rounded-xl"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  <Mic className="size-5" />
                </button>
              </div>
              <Button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
              >
                <Send className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
