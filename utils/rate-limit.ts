import { headers } from "next/headers";

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export class RateLimit {
  private interval: number;
  private maxRequests: number;

  constructor(maxRequests: number = 15, interval: number = 60 * 1000) {
    this.interval = interval; // Default 1 minute in milliseconds
    this.maxRequests = maxRequests; // Default 15 requests per interval
  }

  private getClientIp(): string {
    const headersList = headers();
    const xForwardedFor = headersList.get("x-forwarded-for");
    const ip = xForwardedFor?.split(",")[0] || "127.0.0.1";
    return ip;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const ip in store) {
      if (store[ip].resetTime < now) {
        delete store[ip];
      }
    }
  }

  public async check(): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const ip = this.getClientIp();
    const now = Date.now();

    // Clean up expired entries
    this.cleanup();

    // Initialize or reset if expired
    if (!store[ip] || store[ip].resetTime < now) {
      store[ip] = {
        count: 0,
        resetTime: now + this.interval,
      };
    }

    // Check if limit is exceeded
    if (store[ip].count >= this.maxRequests) {
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: Math.ceil((store[ip].resetTime - now) / 1000), // seconds until reset
      };
    }

    // Increment counter
    store[ip].count++;

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - store[ip].count,
      reset: Math.ceil((store[ip].resetTime - now) / 1000), // seconds until reset
    };
  }
} 