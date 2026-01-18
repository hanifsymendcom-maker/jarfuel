import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory store for waitlist (fallback when Supabase not configured)
// In production, you should use Supabase or another persistent database
interface WaitlistEntry {
  id: string;
  email: string;
  flavor: 'vanilla' | 'chocolate';
  with_coffee: boolean;
  created_at: string;
}

const waitlistStore: WaitlistEntry[] = [];
const emailSet = new Set<string>();

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // Enable CORS for development (Vite dev server runs on different port)
  if (process.env.NODE_ENV !== "production") {
    app.use((_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
  }

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // API Routes for Waitlist

  // Get waitlist count
  app.get("/api/waitlist/count", (_req, res) => {
    // Return count + baseline (simulating existing signups)
    const baselineCount = 147;
    res.json({ count: waitlistStore.length + baselineCount });
  });

  // Add to waitlist
  app.post("/api/waitlist", (req, res) => {
    const { email, flavor, with_coffee } = req.body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Invalid email address" });
    }

    // Validate flavor
    if (!flavor || !["vanilla", "chocolate"].includes(flavor)) {
      return res.status(400).json({ success: false, error: "Invalid flavor selection" });
    }

    // Check for duplicate
    const normalizedEmail = email.toLowerCase().trim();
    if (emailSet.has(normalizedEmail)) {
      return res.status(400).json({ success: false, error: "This email is already on the waitlist!" });
    }

    // Add to store
    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      flavor,
      with_coffee: !!with_coffee,
      created_at: new Date().toISOString(),
    };

    waitlistStore.push(entry);
    emailSet.add(normalizedEmail);

    console.log(`New waitlist signup: ${normalizedEmail} - ${flavor} ${with_coffee ? 'with coffee' : 'without coffee'}`);

    // In a real app, you would:
    // 1. Store in Supabase
    // 2. Trigger welcome email via Supabase Edge Functions or external service
    // 3. Add to email campaign service (e.g., Resend, SendGrid, Mailchimp)

    res.json({ success: true });
  });

  // Get all waitlist entries (admin endpoint - should be protected in production)
  app.get("/api/waitlist", (_req, res) => {
    // In production, protect this endpoint with authentication
    res.json({ entries: waitlistStore, count: waitlistStore.length });
  });

  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // In dev mode (when Vite proxy is used), run on 3001. In production, use PORT or 3000.
  const port = process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Waitlist API endpoints:`);
    console.log(`  GET  /api/waitlist/count - Get signup count`);
    console.log(`  POST /api/waitlist - Add email to waitlist`);
    console.log(`  GET  /api/waitlist - List all entries (admin)`);
  });
}

startServer().catch(console.error);
