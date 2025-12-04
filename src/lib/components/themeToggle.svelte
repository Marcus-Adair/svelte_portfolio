<script lang="ts">
  import { toggleMode } from "mode-watcher";
	import { Moon, Sun } from 'lucide-svelte';
	import Button from "./ui/button.svelte";
</script>

<Button onclick={toggleMode} variant="outline" size="icon" title="Toggle theme" class="p-4">
    <Sun
      class="size-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute size-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
</Button>
