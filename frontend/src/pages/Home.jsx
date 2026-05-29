import { Link } from "react-router-dom";
import { 
  Activity, 
  Server, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="fixed top-0 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="font-bold text-xl">☁︎</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">CloudOps</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-cyan-400 transition">Funcionalidades</a>
            <a href="#tech" className="hover:text-cyan-400 transition">Stack Técnico</a>
            <a href="#status" className="hover:text-cyan-400 transition">Status</a>
          </nav>

          <Link
            to="/metrics"
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-2.5 rounded-2xl transition-all active:scale-95"
          >
            Acessar Dashboard
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-cyan-900 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-cyan-400">Production Ready • Real-time Observability</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Observability &amp;<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Infrastructure Control
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Monitore, analise e otimize sua infraestrutura com métricas em tempo real, 
            logs centralizados, tracing distribuído e alertas inteligentes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/metrics"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-4 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              Entrar no Dashboard
              <Activity className="w-5 h-5" />
            </Link>
            
            <a href="#features" 
               className="border border-slate-600 hover:border-slate-400 px-8 py-4 rounded-2xl text-lg transition">
              Conhecer Funcionalidades
            </a>
          </div>

          <div className="mt-10 text-sm text-slate-500 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Tempo real
            </div>
            <div>Kubernetes Ready</div>
            <div>Prometheus + Grafana</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Plataforma Técnica Completa</h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Projetada para SREs, DevOps Engineers e Platform Teams
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <Server className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Cluster &amp; Service Monitoring</h3>
              <p className="text-slate-400">Visibilidade completa de Pods, Deployments, Services e Nodes no Kubernetes.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <TrendingUp className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Métricas em Tempo Real</h3>
              <p className="text-slate-400">CPU, Memória, Rede, Latência, Throughput e custom metrics via Prometheus.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <Zap className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Alerting Inteligente</h3>
              <p className="text-slate-400">Regras avançadas, thresholds dinâmicos e integração com Slack, Teams e PagerDuty.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <Shield className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Logs &amp; Distributed Tracing</h3>
              <p className="text-slate-400">Centralização de logs + Jaeger/OpenTelemetry tracing para microservices.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <Activity className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Health Checks &amp; Status</h3>
              <p className="text-slate-400">Monitoramento de readiness, liveness e SLOs com visualizações claras.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <TrendingUp className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-slate-400">Análise histórica, tendências e relatórios automáticos de performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Integrações Nativas</h2>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 text-center">
            {["Kubernetes", "Docker", "Prometheus", "Grafana", "OpenTelemetry", "Jaeger", "AWS", "Azure", "Elasticsearch", "RabbitMQ", "PostgreSQL", "Redis"].map((tech) => (
              <div key={tech} className="bg-slate-900 border border-slate-800 py-6 rounded-2xl hover:border-cyan-500/30 transition">
                <p className="font-medium text-slate-300">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Pronto para elevar sua observabilidade?</h2>
          <p className="text-slate-400 mb-8">
            Acesse o dashboard completo e comece a monitorar sua infraestrutura agora.
          </p>
          
          <Link
            to="/metrics"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-10 py-4 rounded-2xl text-lg transition-all active:scale-95"
          >
            Entrar no Metrics Dashboard →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        CloudOps Demo • Built for DevOps Excellence • 2026
      </footer>
    </div>
  );
}
