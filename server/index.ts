// 参考 https://qiita.com/tetsutaroendo/items/31300a5e475688a2f4ec#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%82%B5%E3%83%BC%E3%83%90%E3%82%92%E4%BD%9C%E3%82%8B
// 参考 https://qiita.com/ukyoda/items/a043f999132b05b79525
import express from "express";
import next from "next";
import { pool } from "./db";
import session from "express-session";
// 1 - importing dependencies
import passport, { Profile } from "passport";
import Auth0Strategy, { ExtraVerificationParams } from "passport-auth0";
import uid from "uid-safe";
import authRoutes from "./auth-routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT ?? 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: 86400 * 1000,
      },
      resave: false,
      saveUninitialized: true,
    };
    server.use(session(sessionConfig));

    const validateEnv = (envName: string) => {
      const env = process.env[envName];
      if (!env) {
        console.error(`env ${envName} does not exist`);
        process.exit(1);
      }
      return env;
    };

    const auth0StrategyOptions: Auth0Strategy.StrategyOption = {
      domain: validateEnv("AUTH0_DOMAIN"),
      clientID: validateEnv("AUTH0_CLIENT_ID"),
      clientSecret: validateEnv("AUTH0_CLIENT_SECRET"),
      callbackURL: validateEnv("AUTH0_CALLBACK_URL"),
    };

    const auth0Strategy = new Auth0Strategy(
      auth0StrategyOptions,
      (
        _accessToken: string,
        _refreshToken: string,
        _extraParams: ExtraVerificationParams,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        return done(null, profile);
      }
    );
    passport.use(auth0Strategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    server.use(passport.initialize());
    server.use(passport.session());
    server.use(authRoutes);

    server.use("/api/private", (req, res, next) => {
      if (!req.isAuthenticated()) return res.redirect("/login");
      // can use req.user
      next();
    });

    server.get("/api/db", async (_req, res) => {
      try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM test_table");
        const test = result?.rows ?? [];
        client.release();
        res.json({
          test,
        });
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
