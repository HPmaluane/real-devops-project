const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000; // Alterado para evitar conflito com frontend

// ======================
// HELPER: Executa comando com Promise
// ======================
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        return reject({ error: error.message, stderr });
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        resolve(stdout);
      }
    });
  });
};

// ======================
// API HEALTH
// ======================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ======================
// METRICS GERAIS
// ======================
app.get("/api/metrics", async (req, res) => {
  try {
    const nodes = await runCommand("kubectl get nodes -o json");
    const pods = await runCommand("kubectl get pods -A -o json");

    const totalPods = pods.items.length;
    const runningPods = pods.items.filter(p => p.status.phase === "Running").length;

    res.json({
      clusterStatus: "Healthy",
      nodesCount: nodes.items.length,
      podsRunning: runningPods,
      totalPods: totalPods,
      cpuUsage: "47%",      // Pode melhorar com `kubectl top nodes`
      memoryUsage: "61%",
      lastUpdated: new Date().toISOString()
    });
  } catch (err) {
    res.json({
      clusterStatus: "Warning",
      podsRunning: 0,
      error: "Kubernetes não detectado ou sem permissão"
    });
  }
});

// ======================
// NAMESPACES
// ======================
app.get("/api/namespaces", async (req, res) => {
  try {
    const data = await runCommand("kubectl get namespaces -o json");
    const namespaces = data.items.map(ns => ({
      name: ns.metadata.name,
      status: ns.status.phase,
      age: ns.metadata.creationTimestamp,
      labels: ns.metadata.labels || {}
    }));
    res.json(namespaces);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar namespaces" });
  }
});

// ======================
// PODS (Melhorado)
// ======================
app.get("/api/pods", async (req, res) => {
  const namespace = req.query.namespace || "all";

  try {
    const cmd = namespace === "all" 
      ? "kubectl get pods -A -o json"
      : `kubectl get pods -n ${namespace} -o json`;

    const data = await runCommand(cmd);

    const pods = data.items.map(pod => ({
      name: pod.metadata.name,
      namespace: pod.metadata.namespace,
      status: pod.status.phase,
      node: pod.spec.nodeName,
      restarts: pod.status.containerStatuses?.reduce((acc, c) => acc + (c.restartCount || 0), 0) || 0,
      age: pod.metadata.creationTimestamp,
      containers: pod.spec.containers.map(container => ({
        name: container.name,
        image: container.image,
        ready: pod.status.containerStatuses?.find(cs => cs.name === container.name)?.ready || false,
        restartCount: pod.status.containerStatuses?.find(cs => cs.name === container.name)?.restartCount || 0
      }))
    }));

    res.json(pods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================
// DOCKER CONTAINERS (Local)
// ======================
app.get("/api/docker/containers", async (req, res) => {
  try {
    const data = await runCommand("docker ps --format '{{json .}}' -a");
    const containers = Array.isArray(data) ? data : data.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
    
    res.json(containers.map(c => ({
      id: c.ID,
      name: c.Names,
      image: c.Image,
      status: c.Status,
      state: c.State,
      running: c.State === "running",
      ports: c.Ports
    })));
  } catch (error) {
    res.json([]); // Retorna vazio se Docker não estiver rodando
  }
});

// ======================
// DOCKER IMAGES
// ======================
app.get("/api/docker/images", async (req, res) => {
  try {
    const data = await runCommand("docker images --format '{{json .}}'");
    const images = Array.isArray(data) ? data : data.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
    
    res.json(images);
  } catch (error) {
    res.json([]);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend DevOps rodando em http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponíveis:`);
  console.log(`   → /api/metrics`);
  console.log(`   → /api/namespaces`);
  console.log(`   → /api/pods`);
  console.log(`   → /api/docker/containers`);
  console.log(`   → /api/docker/images`);
});

app.get("/api/prometheus/cpu", async (req, res) => {

  try {

    const response = await axios.get(
      "http://localhost:9090/api/v1/query?query=sum(rate(container_cpu_usage_seconds_total[5m]))"
    )

    res.json(response.data)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

});


app.get("/api/prometheus/memory", async (req, res) => {

  try {

    const response = await axios.get(
      "http://localhost:9090/api/v1/query?query=sum(container_memory_usage_bytes)"
    )

    res.json(response.data)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

});
