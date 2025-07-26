import React, { useState } from "react";
import { Globe, Brain, Send, ArrowLeft, MoveRight } from "lucide-react";

interface ScenesData {
  polarPosition: {
    radius: number;
    angle: number;
  };
  description: string;
}

interface MotivesData {
  text: string;
}

interface MovementData {
  userId: string;
  command: string;
}

export function ApiTestPage() {
  const [activeTab, setActiveTab] = useState<"scenes" | "motives" | "movement">(
    "scenes"
  );
  const [scenesData, setScenesData] = useState<ScenesData>({
    polarPosition: { radius: 10, angle: 45 },
    description: "test scene",
  });
  const [motivesData, setMotivesData] = useState<MotivesData>({
    text: "The hero saved the village because he wanted to protect his loved ones.",
  });
  const [scenesLoading, setScenesLoading] = useState(false);
  const [motivesLoading, setMotivesLoading] = useState(false);
  const [scenesResponse, setScenesResponse] = useState<any>(null);
  const [motivesResponse, setMotivesResponse] = useState<any>(null);
  const [scenesError, setScenesError] = useState<string | null>(null);
  const [motivesError, setMotivesError] = useState<string | null>(null);

  const [movementData, setMovementData] = useState<MovementData>({
    userId: localStorage.getItem("accountId") || "",
    command: "",
  });
  const [movementLoading, setMovementLoading] = useState(false);
  const [movementResponse, setMovementResponse] = useState<any>(null);
  const [movementError, setMovementError] = useState<string | null>(null);

  const handleScenesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScenesLoading(true);
    setScenesError(null);
    setScenesResponse(null);

    try {
      const response = await fetch("/api/scenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scenesData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${data.message || "Request failed"}`
        );
      }

      setScenesResponse(data);
    } catch (error) {
      setScenesError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setScenesLoading(false);
    }
  };

  const handleMotivesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMotivesLoading(true);
    setMotivesError(null);
    setMotivesResponse(null);

    try {
      const response = await fetch("/api/motives/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(motivesData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${data.message || "Request failed"}`
        );
      }

      setMotivesResponse(data);
    } catch (error) {
      setMotivesError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setMotivesLoading(false);
    }
  };

  const handleMovementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMovementLoading(true);
    setMovementError(null);
    setMovementResponse(null);

    try {
      const response = await fetch("/api/movement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movementData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${data.message || "Request failed"}`
        );
      }

      setMovementResponse(data);
    } catch (error) {
      setMovementError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setMovementLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/90 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
            <h1 className="text-2xl font-bold">API Test Center</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-900/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("scenes")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "scenes"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Scenes API</span>
          </button>
          <button
            onClick={() => setActiveTab("motives")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "motives"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Motives API</span>
          </button>

          <button
            onClick={() => setActiveTab("movement")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "movement"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <MoveRight className="w-4 h-4" />
            <span>Movement API</span>
          </button>
        </div>

        {/* Scenes API Tab */}
        {activeTab === "scenes" && (
          <div className="space-y-8">
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Scenes API Test</span>
              </h2>

              <form onSubmit={handleScenesSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Radius
                    </label>
                    <input
                      type="number"
                      value={scenesData.polarPosition.radius}
                      onChange={(e) =>
                        setScenesData({
                          ...scenesData,
                          polarPosition: {
                            ...scenesData.polarPosition,
                            radius: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Angle
                    </label>
                    <input
                      type="number"
                      value={scenesData.polarPosition.angle}
                      onChange={(e) =>
                        setScenesData({
                          ...scenesData,
                          polarPosition: {
                            ...scenesData.polarPosition,
                            angle: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={scenesData.description}
                    onChange={(e) =>
                      setScenesData({
                        ...scenesData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={scenesLoading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {scenesLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>
                    {scenesLoading ? "Sending..." : "Test Scenes API"}
                  </span>
                </button>
              </form>

              {/* Request Preview */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Request Preview:
                </h3>
                <pre className="bg-gray-900/50 border border-gray-700 rounded-md p-3 text-sm text-gray-300 overflow-x-auto">
                  {JSON.stringify(scenesData, null, 2)}
                </pre>
              </div>

              {/* Response */}
              {scenesResponse && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-green-400 mb-2">
                    ✅ Success Response:
                  </h3>
                  <pre className="bg-gray-900/50 border border-green-500/30 rounded-md p-3 text-sm text-green-300 overflow-x-auto">
                    {JSON.stringify(scenesResponse, null, 2)}
                  </pre>
                </div>
              )}

              {/* Error */}
              {scenesError && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-red-400 mb-2">
                    ❌ Error:
                  </h3>
                  <div className="bg-gray-900/50 border border-red-500/30 rounded-md p-3 text-sm text-red-300">
                    {scenesError}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Motives API Tab */}
        {activeTab === "motives" && (
          <div className="space-y-8">
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Motives API Test</span>
              </h2>

              <form onSubmit={handleMotivesSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Text to Analyze
                  </label>
                  <textarea
                    value={motivesData.text}
                    onChange={(e) =>
                      setMotivesData({
                        ...motivesData,
                        text: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600 resize-vertical"
                    placeholder="Enter text to extract motives from..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={motivesLoading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {motivesLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>
                    {motivesLoading ? "Analyzing..." : "Extract Motives"}
                  </span>
                </button>
              </form>

              {/* Request Preview */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Request Preview:
                </h3>
                <pre className="bg-gray-900/50 border border-gray-700 rounded-md p-3 text-sm text-gray-300 overflow-x-auto">
                  {JSON.stringify(motivesData, null, 2)}
                </pre>
              </div>

              {/* Response */}
              {motivesResponse && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-green-400 mb-2">
                    ✅ Success Response:
                  </h3>
                  <pre className="bg-gray-900/50 border border-green-500/30 rounded-md p-3 text-sm text-green-300 overflow-x-auto">
                    {JSON.stringify(motivesResponse, null, 2)}
                  </pre>
                </div>
              )}

              {/* Error */}
              {motivesError && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-red-400 mb-2">
                    ❌ Error:
                  </h3>
                  <div className="bg-gray-900/50 border border-red-500/30 rounded-md p-3 text-sm text-red-300">
                    {motivesError}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "movement" && (
          <div className="space-y-8">
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <MoveRight className="w-5 h-5" />
                <span>Movement API Test</span>
              </h2>

              <form onSubmit={handleMovementSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={movementData.userId}
                    onChange={(e) =>
                      setMovementData({
                        ...movementData,
                        userId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Command
                  </label>
                  <textarea
                    value={movementData.command}
                    onChange={(e) =>
                      setMovementData({
                        ...movementData,
                        command: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600 resize-vertical"
                    placeholder="Enter movement command..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={movementLoading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {movementLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>
                    {movementLoading ? "Sending..." : "Send Movement"}
                  </span>
                </button>
              </form>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Request Preview:
                </h3>
                <pre className="bg-gray-900/50 border border-gray-700 rounded-md p-3 text-sm text-gray-300 overflow-x-auto">
                  {JSON.stringify(movementData, null, 2)}
                </pre>
              </div>

              {movementResponse && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-green-400 mb-2">
                    ✅ Success Response:
                  </h3>
                  <pre className="bg-gray-900/50 border border-green-500/30 rounded-md p-3 text-sm text-green-300 overflow-x-auto">
                    {JSON.stringify(movementResponse, null, 2)}
                  </pre>
                </div>
              )}

              {movementError && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-red-400 mb-2">
                    ❌ Error:
                  </h3>
                  <div className="bg-gray-900/50 border border-red-500/30 rounded-md p-3 text-sm text-red-300">
                    {movementError}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
