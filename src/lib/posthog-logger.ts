import posthog from "posthog-js";

export function posthogLog(message: string, attributes: Record<string, string | number | boolean>) {
  posthog.logger.info(message, attributes);
}
