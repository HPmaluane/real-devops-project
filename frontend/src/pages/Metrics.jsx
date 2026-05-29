import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, Server, Cpu, Container, Image, 
  RefreshCw, AlertTriangle 
} from "lucide-react";

export default function Metrics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  const [metrics, setMetrics] = useState({});
  const [pods, setPods] = useState([]);
  const [namespaces, setNamespaces] = useState([]);
  const [dockerContainers, setDockerContainers] = useState([]);
  const [dockerImages, setDockerImages] = useState([]);

  // Buscar todos os dados
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [mRes, pRes, nRes, dcRes, diRes] = await Promise.all([
        fetch("http://localhost:3000/api/metrics"),
        fetch("http://localhost:3000/api/pods"),
        fetch("http://localhost:3000/api/namespaces"),
        fetch("http://localhost:3000/api/docker/containers"),
        fetch("http://localhost:3000/api/docker/images")
      ]);

      setMetrics(await mRes.json());
      setPods(await pRes.json());
      setNamespaces(await nRes.json());
      setDockerContainers(await dcRes.json());
      setDockerImages(await diRes.json());
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 15000); // Atualiza a cada 15s
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    if (status === "Running") return "bg-emerald-500/20 text-emerald-400";
    if (status === "Warning") return "bg-amber-500/20 text-amber-400";
    return "bg-red-500/20 text-red-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2">
              ← Voltar
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Activity className="text-cyan-400" /> Metrics Dashboard
            </h1>
          </div>
          <button
            onClick={fetchAllData}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition"
          >
            <RefreshCw className="w-4 h-4" /> Atualizar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-8">
          {["overview", "pods", "namespaces", "docker-containers", "docker-images"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium transition-all border-b-2 ${
                activeTab === tab 
                  ? "border-cyan-400 text-cyan-400" 
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === "overview" && "Overview"}
              {tab === "pods" && "Kubernetes Pods"}
              {tab === "namespaces" && "Namespaces"}
              {tab === "docker-containers" && "Docker Containers"}
              {tab === "docker-images" && "Docker Images"}
            </button>
          ))}
        </div>

        {loading && <p className="text-center py-10">Carregando dados reais...</p>}

        {/* ==================== OVERVIEW ==================== */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
              <p className="text-slate-400">Cluster Status</p>
              <p className="text-4xl font-bold text-emerald-400 mt-2">{metrics.clusterStatus || "N/A"}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
              <p className="text-slate-400">Pods Running</p>
              <p className="text-4xl font-bold mt-2">{metrics.podsRunning || 0}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
              <p className="text-slate-400">Docker Containers</p>
              <p className="text-4xl font-bold mt-2">{dockerContainers.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
              <p className="text-slate-400">Docker Images</p>
              <p className="text-4xl font-bold mt-2">{dockerImages.length}</p>
            </div>
          </div>
        )}

        {/* ==================== K8s PODS ==================== */}
        {activeTab === "pods" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Kubernetes Pods ({pods.length})</h2>
            {pods.map((pod, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-bold text-lg">{pod.name}</h3>
                  <p className="text-slate-400">Namespace: {pod.namespace} • Node: {pod.node}</p>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <div className={`px-4 py-1 rounded-full text-sm ${getStatusBadge(pod.status)}`}>
                    {pod.status}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Restarts</p>
                    <p className="font-mono">{pod.restarts}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== NAMESPACES ==================== */}
        {activeTab === "namespaces" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {namespaces.map((ns, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
                <h3 className="font-semibold text-lg">{ns.name}</h3>
                <p className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getStatusBadge(ns.status)}`}>
                  {ns.status}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ==================== DOCKER CONTAINERS ==================== */}
        {activeTab === "docker-containers" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Docker Containers ({dockerContainers.length})</h2>
            <div className="space-y-4">
              {dockerContainers.map((container, i) => (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-3xl p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-mono font-bold">{container.name}</h3>
                    <p className="text-slate-400 text-sm">{container.image}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-4 py-1 rounded-full text-sm ${container.running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {container.status}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{container.ports}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== DOCKER IMAGES ==================== */}
        {activeTab === "docker-images" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Docker Images ({dockerImages.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dockerImages.map((img, i) => (
                <div key={i} className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
                  <p className="font-mono text-sm break-all">{img.repository}:{img.tag}</p>
                  <p className="text-slate-400 text-sm mt-2">Size: {img.size}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
