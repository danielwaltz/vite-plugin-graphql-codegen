const RESET = '\x1b[0m';
const BRIGHT = '\x1b[1m';
const DIM = '\x1b[2m';
const FG_CYAN = '\x1b[36m';

const LOG_PREFIX =
  `${FG_CYAN}${BRIGHT}VITE PLUGIN GRAPHQL CODEGEN${RESET} ` as const;

export function debugLog(...args: unknown[]) {
  console.log(LOG_PREFIX, DIM, ...args, RESET);
}
