const RESET = "\u001B[0m";
const BRIGHT = "\u001B[1m";
const DIM = "\u001B[2m";
const FG_CYAN = "\u001B[36m";

const LOG_PREFIX =
  `${FG_CYAN}${BRIGHT}VITE PLUGIN GRAPHQL CODEGEN${RESET} ` as const;

export function debugLog(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(LOG_PREFIX, DIM, ...args, RESET);
}
