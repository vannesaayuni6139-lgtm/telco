import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Lightbulb, TrendingUp, Users, AlertCircle, Trash2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Suggestion {
  icon: any;
  title: string;
  description: string;
  query: string;
}

const suggestions: Suggestion[] = [
  {
    icon: TrendingUp,
    title: 'Analyze Churn Trends',
    description: 'Get insights on customer churn patterns',
    query: 'Show me the current churn trends and what factors are contributing most to customer churn',
  },
  {
    icon: Users,
    title: 'Customer Segmentation',
    description: 'Understand customer segments better',
    query: 'Analyze our customer segments and recommend actions for each segment',
  },
  {
    icon: Sparkles,
    title: 'Product Recommendations',
    description: 'Optimize product offerings',
    query: 'Which products should we recommend to our at-risk customers?',
  },
  {
    icon: AlertCircle,
    title: 'Risk Assessment',
    description: 'Identify high-risk customers',
    query: 'List the top 10 customers with highest churn risk and suggest retention strategies',
  },
];

// Mock AI responses
const getAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('churn')) {
    return `Based on current data analysis:

📊 **Churn Trend Analysis:**
- Overall churn rate: 3.2% (↓ 0.8% vs last month)
- High-risk customers: 1,247 (5% of total)
- Primary contributing factors:
  1. Low usage (32%)
  2. High complaints (24%)
  3. Plan dissatisfaction (18%)

💡 **Recommendations:**
• Implement proactive retention campaigns for low-usage customers
• Address top complaint categories within 24 hours
• Offer personalized plan upgrades to dissatisfied customers

The ML model predicts a further decrease to 2.7% next month if recommendations are implemented.`;
  }
  
  if (lowerQuery.includes('segment')) {
    return `Customer Segmentation Analysis:

👥 **Segment Breakdown:**
• Premium Users: 32% (high value, low churn risk)
• Regular Users: 48% (stable, moderate engagement)
• Low Usage Users: 15% (at risk, needs engagement)
• At Risk Users: 5% (critical, immediate action needed)

🎯 **Action Plan:**
1. **Premium** - Maintain satisfaction with exclusive perks
2. **Regular** - Upsell opportunities to premium tier
3. **Low Usage** - Re-engagement campaigns
4. **At Risk** - Immediate retention offers

Would you like detailed strategies for any specific segment?`;
  }
  
  if (lowerQuery.includes('product') || lowerQuery.includes('recommend')) {
    return `Product Recommendation Insights:

📦 **Top Performing Offers:**
1. Unlimited Data Pro - 95% ML match score
2. Premium Voice Package - 88% satisfaction
3. Family Bundle - 82% retention boost

🎯 **For At-Risk Customers:**
• Special retention discount: -20% for 3 months
• Free upgrade to next tier for 1 month trial
• Personalized plan based on usage patterns

The ML model shows 68% success rate in retention when these products are offered to at-risk segments.`;
  }
  
  if (lowerQuery.includes('risk') || lowerQuery.includes('high')) {
    return `High-Risk Customer Assessment:

⚠️ **Top 5 Critical Cases:**
1. Emma Davis (C001236) - Risk Score: 92/100
   → Low usage + 5 complaints
   
2. Robert Martinez (C001289) - Risk Score: 87/100
   → Plan dissatisfaction + price sensitivity
   
3. Jennifer Wong (C001312) - Risk Score: 85/100
   → Competition offers + low usage

🛡️ **Retention Strategies:**
• Immediate personal outreach (within 24h)
• Special loyalty discount offers
• Free service upgrade trial
• Priority customer support

Expected retention rate: 68% with immediate action.`;
  }
  
  return `I understand you're asking about "${query}". 

I can help you with:
• Churn analysis and predictions
• Customer segmentation insights  
• Product recommendation strategies
• Risk assessment and retention
• Revenue optimization
• Usage pattern analysis

What specific aspect would you like me to analyze?`;
};

export function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Analytics Assistant. I can help you analyze customer data, predict churn, recommend products, and provide strategic insights. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (query: string) => {
    setInputValue(query);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI Analytics Assistant. I can help you analyze customer data, predict churn, recommend products, and provide strategic insights. How can I assist you today?',
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-lg">
              <Bot className="w-5 h-5" />
            </div>
            <h1>AI Analytics Assistant</h1>
          </div>
          <p className="text-gray-500">Get instant insights and recommendations from your data</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleClearChat}>
          <Trash2 className="w-4 h-4" />
          Clear Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-black text-white'
                            : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`flex-1 max-w-[80%] ${
                          message.role === 'user' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                        <div className="text-gray-400 mt-1 px-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your analytics..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-black hover:bg-gray-800 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((suggestion, idx) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion.query)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="w-4 h-4 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 mb-1">{suggestion.title}</div>
                        <div className="text-gray-500">{suggestion.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Assistant Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle>What I Can Help With</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2"></div>
                  <div>
                    <div className="text-gray-900">Data Analysis</div>
                    <div className="text-gray-500">Analyze customer patterns and trends</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2"></div>
                  <div>
                    <div className="text-gray-900">Risk Assessment</div>
                    <div className="text-gray-500">Identify churn risks early</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2"></div>
                  <div>
                    <div className="text-gray-900">Product Insights</div>
                    <div className="text-gray-500">Recommend optimal products</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2"></div>
                  <div>
                    <div className="text-gray-900">Strategy Planning</div>
                    <div className="text-gray-500">Actionable business recommendations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
