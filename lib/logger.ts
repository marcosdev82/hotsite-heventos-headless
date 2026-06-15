/**
 * Logger utility for structured logging
 * Integrates with production monitoring services
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
  error?: Error;
  tags?: string[];
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isProduction = process.env.NODE_ENV === "production";

  /**
   * Log debug message (development only)
   */
  debug(message: string, context?: Record<string, unknown>) {
    if (this.isDevelopment) {
      console.debug(
        `[DEBUG] ${message}`,
        context ? JSON.stringify(context, null, 2) : ""
      );
    }
  }

  /**
   * Log info message
   */
  info(message: string, context?: Record<string, unknown>) {
    const logData = {
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    console.log(`[INFO] ${message}`, context ? context : "");

    if (this.isProduction) {
      this.sendToMonitoring(logData);
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, unknown>) {
    const logData = {
      level: "warn",
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    console.warn(`[WARN] ${message}`, context ? context : "");

    if (this.isProduction) {
      this.sendToMonitoring(logData);
    }
  }

  /**
   * Log error with stack trace
   */
  error(message: string, error?: Error, context?: Record<string, unknown>) {
    const logData = {
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      context,
      error: {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
      },
    };

    console.error(`[ERROR] ${message}`, error, context ? context : "");

    this.sendToMonitoring(logData);
  }

  /**
   * Log GraphQL operation
   */
  graphql(
    operationName: string,
    status: "start" | "success" | "error",
    duration?: number,
    error?: Error
  ) {
    const context = {
      operationName,
      status,
      duration,
    };

    if (status === "error") {
      this.error(`GraphQL operation failed: ${operationName}`, error, context);
    } else if (status === "success") {
      this.debug(`GraphQL operation completed: ${operationName}`, context);
    } else {
      this.debug(`GraphQL operation started: ${operationName}`, context);
    }
  }

  /**
   * Log API operation
   */
  api(
    method: string,
    path: string,
    status: number,
    duration?: number,
    error?: Error
  ) {
    const context = {
      method,
      path,
      status,
      duration,
    };

    if (status >= 400) {
      this.warn(`API request failed: ${method} ${path} (${status})`, {
        ...context,
        errorMessage: error?.message,
      });
    } else if (status >= 200 && status < 300) {
      this.debug(`API request successful: ${method} ${path}`, context);
    }
  }

  /**
   * Send log to monitoring service
   */
  private sendToMonitoring(logData: unknown) {
    // TODO: Integrate with external monitoring service
    // Example: Sentry, DataDog, LogRocket, etc.
    if (typeof window !== "undefined" && window.__SEND_LOG) {
      window.__SEND_LOG(logData);
    }
  }
}

export const logger = new Logger();

declare global {
  interface Window {
    __SEND_LOG?: (data: unknown) => void;
  }
}
