<script>
	import Card from "$lib/components/ui/card/card.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { GITHUB_URL, LINKED_IN_URL } from "$lib/config";
	import { CalendarDays, Check, Copy, Github, LinkedinIcon, Mail } from "lucide-svelte";

  let changingIcon = $state(false);
  function changeIconBriefly() {
    changingIcon = true;
    setTimeout(() => { changingIcon = false; }, 1800); // 2 seconds
  }

</script>


<svelte:head>
  <title>About - Marcus Adair</title>
</svelte:head>


<div class="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 md:gap-20">

  <!-- Left Col -->
    <div class="flex flex-col gap-6">
      <div class="flex flex-row gap-4 items-center">
        <h1 class="text-2xl md:text-5xl font-bold mt-4 font-[Space_Grotesk]">Hi, I'm Marcus Adair <span class="text-xl md:text-4xl wave">👋🏻</span></h1>
        
      </div>


    <Card class="text-card-foreground p-6">
      <span>I am .... TODO: i'm from utah, born and raised </span>
    </Card>

    <Card class="text-card-foreground p-6">
      <span>I am .... TODO: academic stuff fron the niversity of tuah </span>
    </Card>

    <Card class="text-card-foreground p-6">
      <span>I am .... TODO: I like snowboarding, ... other stuff</span>

    </Card>
  </div>





  <!-- Right Col -->
  <div class="flex flex-col gap-6 sm:text-left text-center items-center md:items-start text-muted-foreground ">

    <!-- <MessageMe/> -->



    <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors mt-28" 
          role="button" tabindex={1}
          title="Schedule a Meeting"
    >
      <CalendarDays class="size-6"/>
      <span>Schedule a Meeting</span>
    </div>

    <div class="flex flex-row items-center gap-4">
      <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
            onclick={() => window.open('mailto:marcus.a.adair@gmail.com')} 
            onkeydown={() => window.open('mailto:marcus.a.adair@gmail.com')} 
            role="button" tabindex={1}
            title="My Email"
      >
        <Mail class="size-6"/>
        <span>marcus.a.adair@gmail.com</span>
      </div>
      <div class="transition-all" title="Copy" onclick={changeIconBriefly} onkeydown={changeIconBriefly} role="button" tabindex={1}>
        {#if changingIcon}
          <Check class="size-4 hover:text-ring" />
        {:else}
          <Copy class="size-4 hover:text-ring cursor-pointer" />
        {/if}
      </div>
    </div>

    <Separator />

    <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
          onclick={() => window.open(LINKED_IN_URL)} 
          onkeydown={() => window.open(LINKED_IN_URL)} 
          role="button" tabindex={1}
          title="LinkedIn"
    >
      <LinkedinIcon class="size-6"/>
      <span>LinkedIn</span>
    </div>

    <div class="flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors" 
      onclick={() => window.open(GITHUB_URL)} 
      onkeydown={() => window.open(GITHUB_URL)} 
      role="button" tabindex={1}
      title="GitHub"
    >
      <Github class="size-6"/>
      <span>GitHub</span>
    </div>

    <Separator />

    <span class="text-foreground font-medium">Connect with me on socials. I'll help build your website/app!</span>

  </div>
</div>


<!-- Wave animation -->
<style>
  @keyframes wave {
    0%, 12% { transform: rotate(0deg); }       /* pause at start */
    20% { transform: rotate(20deg); }          /* quick lift */
    30% { transform: rotate(-15deg); }         /* swing back */
    40% { transform: rotate(15deg); }          /* swing forward */
    50% { transform: rotate(-10deg); }         /* smaller swing back */
    60% { transform: rotate(10deg); }          /* smaller swing forward */
    70% { transform: rotate(-5deg); }          /* tiny swing back */
    80% { transform: rotate(5deg); }           /* tiny swing forward */
    90%, 100% { transform: rotate(0deg); }     /* pause at end */
  }

  .wave {
    display: inline-block;
    animation: wave 2.5s ease-in-out infinite;
    transform-origin: 70% 70%;
  }
</style>