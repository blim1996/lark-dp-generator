// Simple in-memory rate limiter for API requests
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequestsPerMinute = 15;
  private readonly windowMs = 60 * 1000; // 1 minute

  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove requests older than 1 minute
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    return this.requests.length < this.maxRequestsPerMinute;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  getTimeUntilNextSlot(): number {
    if (this.requests.length < this.maxRequestsPerMinute) {
      return 0;
    }

    const now = Date.now();
    const oldestRequest = this.requests[0];
    const timeUntilExpiry = this.windowMs - (now - oldestRequest);
    return Math.max(0, timeUntilExpiry);
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(
      (timestamp) => now - timestamp < this.windowMs
    );
    return Math.max(0, this.maxRequestsPerMinute - this.requests.length);
  }
}

export const rateLimiter = new RateLimiter();
