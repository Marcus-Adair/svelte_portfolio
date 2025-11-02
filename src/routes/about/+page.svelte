<script lang="ts">
	import Card from "$lib/components/ui/card/card.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { CAL_EMAIL, EMAIL, EMAIL_URL, GITHUB_URL, LINKED_IN_URL } from "$lib/consts/config";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { cn } from "$lib/utils";
	import { CalendarDays, Check, Copy, Github, LinkedinIcon, Mail } from "lucide-svelte";
  import snowboard_photo from "$lib/assets/snowboard_photo.jpg"
  import nasa_photo from "$lib/assets/nasa_photo.jpg"
  import masters_photo from "$lib/assets/masters_photo.jpg"
	import Link from "$lib/components/link.svelte";

  let changingIcon = $state(false);
  
  function copyEmail() {
    navigator.clipboard.writeText(EMAIL)
    changingIcon = true;
    setTimeout(() => { changingIcon = false; }, 1800);
  }
</script>


<svelte:head>
  <title>About - Marcus Adair</title>
</svelte:head>


<div class="grid grid-cols-1 md:grid-cols-[55%_45%] gap-16">

  <!-- Left Col -->
    <div class="flex flex-col gap-6">
      <div class="flex flex-row gap-4 items-center">
        <h1 class="text-2xl md:text-5xl font-bold mt-4 font-[Space_Grotesk]">Hi, I'm Marcus Adair <span class="text-xl md:text-4xl wave">👋🏻</span></h1>
      </div>


    <Card class={cn("text-card-foreground p-6 mt-0.5", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>I was born and raised in Utah. I grew up primarily in Davis County (north of Salt Lake City) where I went to K-12 and graduated from Viewmont Highschool in 2017. </span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>I began studying Computer Science at the University of Utah (U of U) in Fall 2017. Before my senior year I started working as an undergraduate research assistant at the Scientific Computing and Imaging (SCI) Instite at the U of U.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>Doing research at SCI was life-changing, and I learned alot. In my undergrad. research I developed a high throughput workflow to accelerate earthquake simulations, collaborated with scientists from Oregon and Spain, went on a work trip to the University of Oregon, and wrote a paper that was eventually accepted by an SC23 workshop and <Link href="https://dl.acm.org/doi/10.1145/3624062.3624276">published by the ACM</Link>.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>I graduated with my BS in Computer Science in Spring 2023. I continued to do research over the summer and then entered graduate school at the U of U and becoming a graduate research assistant at SCI. During the first year I explored using machine learning to synthesize volcanic geodata.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <span>In Summer 2024 I did an internship at the University of Oregon, where I began development on On-Demand Fakequakes, an iteration on previous work. I then turned this into my masters project, continued devopment on it for a year, and created a full-stack app with a Python front-end and back-end, an AWS workflow with Python Infrastructure-as-Code, and a CI/CD pipeline using GitHub Actions. The project was targeted towards NASA scientists and other geoscientists and was a pleasure to work on.</span>
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      In May 2025 I graduated with my MS in Computer Science, entered the industry, and I now work at SafeStreets as a software engineer. I am helping build TypeScript applications with React and Svelte for managing installation orders and appointments, inventory, and more for the company. Its been amazing so far and I've already grown so much as a developer!
    </Card>

    <Card class={cn("text-card-foreground p-6", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      Besides software-related things, I am a proud Utahn and Finnish man. My mother is from Finland and I am lucky to be a Finnish citizen myself; I've taken many trips there and it is amazing. I love the Utah nature, I love snowboarding, hiking, and more. I also have an interest in electronic music production, DJing, comic books, video games, and more! I have a black cat named Wiz, who I love. I have an amazing girlfriend Kinley, who I love. And I am passionate about developing software!
    </Card>
  </div>

  
  <!-- Right Col -->
  <div class="flex flex-col gap-6 md:text-left text-center items-center md:items-start text-muted-foreground md:mt-24">

    <a 
      class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
      href={CAL_EMAIL}
      title="Schedule a Meeting">
        <CalendarDays class="size-6"/>
        <span>Schedule a Meeting</span>
    </a>

    <div class="flex flex-row items-center gap-4">
      <a 
        class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
        href={EMAIL_URL}
        title="My Email"
      >
        <Mail class="size-6"/>
        <span>marcus.a.adair@gmail.com</span>
      </a>
      
      <div class="transition-all" title="Copy" onclick={copyEmail} onkeydown={copyEmail} role="button" tabindex={1}>
        {#if changingIcon}
          <Check class="size-4 hover:text-ring" />
        {:else}
          <Copy class="size-4 hover:text-ring cursor-pointer" />
        {/if}
      </div>
    </div>

    <Separator />

    <a
      class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
      href={LINKED_IN_URL}
      title="LinkedIn"
    >
      <LinkedinIcon class="size-6"/>
      <span>LinkedIn</span>
    </a>

    <a
      class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
      href={GITHUB_URL}
      title="GitHub"
    >
      <Github class="size-6"/>
      <span>GitHub</span>
    </a>

    <Separator />

    <div class="flex flex-col">
      <img src={snowboard_photo} alt="snowboard_photo" class={cn("rounded-md -rotate-2 mt-8", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <img src={masters_photo} alt="graduation_photo" class={cn("rounded-md rotate-2 mt-24", HOVER_EXPAND_TAILWIND_ANIMATION)}>
      <img src={nasa_photo} alt="nasa_photo" class="rounded-md -rotate-2 scale-75 transition-transform duration-200 hover:scale-78">
  </div>
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