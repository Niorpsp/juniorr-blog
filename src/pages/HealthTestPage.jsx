import { useState } from "react";
import axios from "axios";

const HealthTestPage = () => {
  const [healthResult, setHealthResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

  const handleHealthCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${apiBaseUrl}/health`);
      setHealthResult(response.data);
    } catch (err) {
      setError(err.message || "Health check failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${apiBaseUrl}/posts`, {
        title: "Frontend test post",
        content: "Created from React health test page",
        author: "React User",
        category: "General",
        description: "Test from frontend",
      });
      setPostResult(response.data);
    } catch (err) {
      setError(err.message || "Create post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">
          Health Check Test
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Use this page to verify the frontend can call the backend health
          endpoint.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleHealthCheck}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            {loading ? "Checking..." : "Test /health"}
          </button>

          <button
            onClick={handleCreatePost}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            {loading ? "Creating..." : "Test POST /posts"}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {healthResult && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              /health response
            </h2>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
              {JSON.stringify(healthResult, null, 2)}
            </pre>
          </div>
        )}
        {postResult && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              /posts response
            </h2>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
              {JSON.stringify(postResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthTestPage;
