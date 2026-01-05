<script lang="ts">
  import { toggleMode } from "mode-watcher";
	import { Moon, Sun } from 'lucide-svelte';
	import Button from "./ui/button.svelte";
</script>

<Button onclick={toggleMode} variant="outline" size="icon" title="Toggle theme" class="p-4">
  <Sun class="size-4.5 dark:hidden" />
  <Moon class="absolute size-4.5 hidden dark:flex" />
</Button>
