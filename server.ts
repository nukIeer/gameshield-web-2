import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API endpoints
  app.get("/api/download/:slug", async (req, res) => {
    const slug = req.params.slug;
    try {
      // Fetch the games feed to resolve the latest APK link
      const response = await fetch("https://cdn.jsdelivr.net/gh/nukIeer/gameshieldcdn@master/games.json");
      if (!response.ok) {
        return res.status(500).send("Error fetching games feed");
      }
      const data = await response.json();
      const game = data.games?.find((g: any) => g.id === slug || g.package === slug);
      
      if (!game) {
        return res.status(404).send("Game not found");
      }

      // Resolve priority: apk1 -> apk2 -> mirrors[0] -> fallback URL (Play Store / Galaxy Store)
      let targetUrl = game.downloadLinks?.apk1 || game.downloadLinks?.apk2 || game.downloadLinks?.mirrors?.[0];

      if (!targetUrl) {
        targetUrl = game.downloadLinks?.playStoreUrl || game.downloadLinks?.galaxyStoreUrl;
      }

      if (targetUrl) {
        return res.redirect(302, targetUrl);
      } else {
        return res.status(404).send("No download link available");
      }
    } catch (error) {
      console.error("Download resolution error:", error);
      res.status(500).send("Internal server error resolving download");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
