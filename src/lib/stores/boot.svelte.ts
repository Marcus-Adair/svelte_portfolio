let showBootAnimation = $state(true);
  
export function endBootAnimation(): void {
    showBootAnimation = false;
}
export function showingBootAnimation(): boolean {
    return showBootAnimation
}