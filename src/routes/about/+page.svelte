<script>
	import Card from "$lib/components/ui/card/card.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { GITHUB_URL, LINKED_IN_URL } from "$lib/config";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { cn } from "$lib/utils";
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


    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>I was born and raised in Utah. After living in Sugar House, SLC until I was about 2 years old, my family moved to Davis County - there I went to elementary school through highschool, graduating from Viewmont Highschool in 2017. </span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>I then began studying Computer Science at the University of Utah (U of U) in Fall 2017. During the first few years of school I worked as fast food worker and a telesales rep. After a brief 2 semesters off during COVID. I returned to school and then shortly start working at the Scientific Computing and Imaging (SCI) Instite at the U of U.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>Doing research at SCI was great, and I learned alot. During my undergrad. I developed a high throughput workflow to accelerate earthquake simulations, collaborated with scientists from Oregon and Spain, went on a work trip to the University of Oregon, and wrote a paper that was eventually published by the ACM.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>I graduated with my BS in Computer Science in Spring 2023. I continued to do research over the summer and then entered grad. school, becoming a grad. research assistant at SCI. During the first year I explored using machine learning to synthesize volcanic geodata.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>In Summer 2024 I did an internship at the University of Oregon, where I began development on On Demand Fakequakes, an iteration on my previous work. I turned this into my masters project, worked on it for a year, and developed a full-stack app with a Python front-end and back-end, an AWS workflow with Python infrastructure-as-code. The project was targeted towards NASA scientists and other geoscientists and was a pleasure to work on.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      In May 2025 I graduated with my MS in Computer Science and I now work at SafeStreets as a software engineer. I am helping build TypeScript and Svelte applications for managing inventory, sales, installations, etc. for the company. Its been amazing so far and I've already grown so much as a developer! I'm excited to continue my journey of learning!
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      Besides software-related things, I am a proud Utahn and Finnish man. My mother is from Finland and I am lucky to be a Finnish citizen myself; I've taken many trips there and it is amazing. I love the Utah nature, I love snowboarding, hiking, and more. I also have an interest in electronic music production, DJing, comic books, video games, and more! I have a black cat named Wiz, who I love. I have an amazing girlfriend Kinley, who I love. And I love to develop software and pay attention to the small things!
    </Card>


  </div>



  <!-- Right Col -->
  <div class="flex flex-col gap-6 sm:text-left text-center items-center md:items-start text-muted-foreground mt-24">

    <div class={cn("flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
          role="button" tabindex={1}
          title="Schedule a Meeting"
    >
      <CalendarDays class="size-6"/>
      <span>Schedule a Meeting</span>
    </div>

    <div class="flex flex-row items-center gap-4">
      <div class={cn("flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
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

    <div class={cn("flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
          onclick={() => window.open(LINKED_IN_URL)} 
          onkeydown={() => window.open(LINKED_IN_URL)} 
          role="button" tabindex={1}
          title="LinkedIn"
    >
      <LinkedinIcon class="size-6"/>
      <span>LinkedIn</span>
    </div>

    <div class={cn("flex flex-row gap-4 items-center hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
      onclick={() => window.open(GITHUB_URL)} 
      onkeydown={() => window.open(GITHUB_URL)} 
      role="button" tabindex={1}
      title="GitHub"
    >
      <Github class="size-6"/>
      <span>GitHub</span>
    </div>

    <Separator />

    <span class="text-foreground">Connect with me on socials. I'll help build your website/app!</span>

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