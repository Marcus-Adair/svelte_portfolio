<script>
	import Button from "$lib/components/ui/button.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { GITHUB_URL, LINKED_IN_URL } from "$lib/config";
	import { CalendarDays, Github, LinkedinIcon, Mail } from "lucide-svelte";

</script>
<svelte:head>
  <title>About - Marcus Adair</title>
</svelte:head>

<div class="flex flex-col gap-6">

  <h1 class="text-2xl md:text-5xl font-bold mr-44 mt-8">Hi, I'm Marcus Adair.</h1>


  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

    <!-- Left Col -->
    <Card class="text-muted-foreground p-6">
      <span>I am .... TODO: put a bunch of stuff here to describe me </span>
    </Card>

    <!-- Right Col -->
    <div class="flex flex-col gap-6 text-left text-muted-foreground">
      <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
        onclick={() => window.open(GITHUB_URL)} 
        onkeydown={() => window.open(GITHUB_URL)} 
        role="button" tabindex={1}>
        <Github class="size-6"/>
        <span>Follow on GitHub</span>
      </div>
  
      <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
            onclick={() => window.open(LINKED_IN_URL)} 
            onkeydown={() => window.open(LINKED_IN_URL)} 
            role="button" tabindex={1}>
        <LinkedinIcon class="size-6"/>
        <span>Connect on LinkedIn</span>
      </div>
      
      <Separator />
      
      <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
            role="button" tabindex={1}>
        <CalendarDays class="size-6"/>
        <span>Schedule a Meeting</span>
      </div>
  
      <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
            onclick={() => window.open('mailto:marcus.a.adair@gmail.com')} 
            onkeydown={() => window.open('mailto:marcus.a.adair@gmail.com')} 
            role="button" tabindex={1}>
        <Mail class="size-6"/>
        <span>marcus.a.adair@gmail.com</span>
      </div>
    </div>

  </div>
</div>