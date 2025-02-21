// Errors
import { BaseError } from "@/core/errors/base";

export const mapper: Record<BaseError["code"], number> = {
  "resource-not-found": 404,
};
