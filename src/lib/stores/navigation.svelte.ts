// Tracks pending navigation path during page transitions
// Used to update nav styling immediately before navigation completes
let pendingPath = $state<string | null>(null);

export function setPendingPath(path: string | null) {
    pendingPath = path;
}

export function getPendingPath() {
    return pendingPath;
}
