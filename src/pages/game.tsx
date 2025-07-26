import React, { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Sparkles, ArrowLeft, Zap, Globe, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { extractIntent, performAction } from "../services/api";
// removed useAccount, reading accountId from localStorage instead
import { GraphEmbed } from "@/components/GraphEmbed";

interface Message {
  id: string;
  type: "user" | "system" | "narrative" | "status";
  content: string;
  timestamp: Date;
}

const CHAT_HISTORY_KEY = "chatHistory";

const TypewriterText: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 20,
}) => {
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <>{displayed}</>;
};

export function GamePage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();

    const stored = localStorage.getItem(CHAT_HISTORY_KEY);
    if (stored) {
      try {
        const parsed: Message[] = JSON.parse(stored).map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        if (parsed.length > 0) {
          setMessages(parsed);
          setIsInitialized(true);
          return;
        }
      } catch {}
    }

    if (!isInitialized && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome-1",
        type: "narrative",
        content:
          "Welcome to Berkeley World. You find yourself standing at the edge of reality, where the void meets infinite possibility. The air shimmers with potential, and you sense that your words have power here. What do you wish to do?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages, isInitialized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const trimmed = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const stepStart = Date.now();

      const extractingMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "status",
        content: "Extracting action type...",
        timestamp: new Date(),
      };
      const statusMsgId = extractingMsg.id;
      const updateStatus = (content: string) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === statusMsgId ? { ...m, content } : m))
        );

      setMessages((prev) => [...prev, extractingMsg]);

      const extractRes = await extractIntent({ text: trimmed });
      console.log("extractRes", extractRes);
      const actionType =
        extractRes.data[0]?.motive || extractRes.data?.motive || "unknown";
      const extractElapsed = ((Date.now() - stepStart) / 1000).toFixed(2);
      updateStatus(`Action type: ${actionType} (${extractElapsed}s)`);

      const actionStart = Date.now();
      updateStatus("Performing action...");

      const storedAccountId = localStorage.getItem("accountId");
      const payload: any = {
        text: trimmed,
        userId: storedAccountId,
      };

      if (actionType !== "movement") {
        payload.action = {
          target_relation: {
            subject: "",
            predicate: "",
            object: "",
          },
        };
      }

      const actionRes = await performAction(actionType, payload);
      const actionElapsed = ((Date.now() - actionStart) / 1000).toFixed(2);
      const narrativeContent =
        actionRes.data?.message ||
        actionRes.data?.outcome ||
        actionRes.data?.trace?.content ||
        "";

      const narrativeMessage: Message = {
        id: (Date.now() + 4).toString(),
        type: "narrative",
        content: narrativeContent,
        timestamp: new Date(),
      };
      const completedMsg: Message = {
        id: (Date.now() + 5).toString(),
        type: "status",
        content: `Action completed (${actionElapsed}s)`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, narrativeMessage, completedMsg]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 6).toString(),
        type: "system",
        content: error?.message || "Something went wrong",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case "user":
        return "bg-gradient-to-r from-brand/20 via-brand/10 to-brand/5 border-brand/30 text-brand-100 shadow-lg shadow-brand/10";
      case "system":
        return "bg-gradient-to-r from-red-500/10 to-red-400/10 border-red-400/20 text-red-100 shadow-lg shadow-red-500/10";
      case "status":
        return "bg-gradient-to-r from-blue-500/10 to-blue-400/10 border-blue-400/20 text-blue-100 shadow-lg shadow-blue-500/10";
      default:
        return "bg-gradient-to-r from-white/5 via-white/10 to-white/5 border-white/10 text-gray-100 shadow-lg shadow-gray-600/10 backdrop-brightness-110";
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "user":
        return (
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        );
      case "system":
        return (
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        );
      case "status":
        return (
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        );
      default:
        return <Sparkles className="w-4 h-4 text-gray-400" />;
    }
  };

  // Drawer component for world dynamics / graph
  const WorldDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-40 flex justify-end">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Panel */}
        <div className="relative w-full max-w-[450px] h-full bg-black border-l border-gray-800/50 overflow-hidden shadow-2xl animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <GraphEmbed />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Sparkles className="h-8 w-8 text-gray-300 animate-pulse" />
                  <div className="absolute inset-0 bg-gray-300/20 rounded-full blur-lg"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white font-title">
                    Berkeley World
                  </h1>
                  <p className="text-sm text-gray-400">
                    Reality awaits your command
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Stats */}
              <div className="hidden">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span>Online</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>1,247</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Zap className="w-4 h-4" />
                  <span>Active</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(true)}
                className="text-gray-400 hover:text-brand transition-colors"
              >
                <Globe className="w-5 h-5" />
              </Button>

              {/* Removed user-specific elements */}
            </div>
          </div>
        </div>
      </header>

      {/* Game area */}
      <div className="relative z-10 flex justify-center h-[calc(100vh-80px)] px-4">
        <div className="flex-1 w-full max-w-3xl xl:max-w-4xl flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent max-h-[calc(100vh-200px)]">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-400 text-lg">
                    Your adventure begins...
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`group relative rounded-2xl border p-6 ${getMessageStyle(
                  message.type
                )} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getMessageIcon(message.type)}
                    <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
                      {message.type === "user"
                        ? "You"
                        : message.type === "system"
                        ? "System"
                        : "World"}
                    </span>
                  </div>
                  <span className="text-xs opacity-60 bg-slate-800/30 px-2 py-1 rounded-full">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap text-base">
                  {message.type === "narrative" ? (
                    index === messages.length - 1 ? (
                      <TypewriterText text={message.content} speed={15} />
                    ) : (
                      message.content
                    )
                  ) : (
                    message.content
                  )}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
              </div>
            ))}

            {isLoading && (
              <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/30 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="relative">
                    <div className="animate-spin w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                    <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-sm"></div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">
                      The world contemplates your action...
                    </span>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-800/50 bg-black/90 backdrop-blur-xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your action... The universe is listening."
                  disabled={isLoading}
                  className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl pl-10 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all duration-200 backdrop-blur-sm shadow-lg"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-8 py-4 bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 animate-spinPulse" />
              </Button>
            </form>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-500">
                💡 Tip: Describe your actions naturally. The AI understands
                intent, not just commands.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{messages.length} messages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Graph panel removed in favor of drawer */}
      </div>
      {/* Drawer overlay */}
      <WorldDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
