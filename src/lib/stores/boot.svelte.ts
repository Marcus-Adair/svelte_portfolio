// Tracks whether the initial boot/curtain animation has completed
// Persists across client-side navigations
let bootComplete = $state(false);

export function isBootComplete() {
    return bootComplete;
}

export function markBootComplete() {
    bootComplete = true;
}
