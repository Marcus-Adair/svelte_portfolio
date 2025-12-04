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
  import gsap from "gsap";
	import { onMount } from "svelte";
	import AnimatedCard from "$lib/components/animatedCard.svelte";
	import AnimatedImg from "$lib/components/animatedImg.svelte";

  let changingIcon = $state(false);
  
  function copyEmail() {
    navigator.clipboard.writeText(EMAIL)
    changingIcon = true;
    setTimeout(() => { changingIcon = false; }, 1800);
  }

  onMount(() => {
    gsap.fromTo(
        "h1",
        { x: -300},
        { x: 0, duration: 0.3, ease: "power1.out" }
    );
  });
</script>


<svelte:head>
  <title>About</title>
</svelte:head>

<div class="grid grid-cols-1 md:grid-cols-[55%_45%] gap-16">

  <!-- Left Col -->
    <div class="flex flex-col gap-6">
      <div class="flex flex-row gap-4 items-center mb-2">
        <h1 class="text-2xl md:text-5xl mt-4">Hi, I'm Marcus Adair <span class="text-xl md:text-4xl wave">👋🏻</span></h1>
      </div>

      <AnimatedCard>
        <span>I was born and raised in Utah. I grew up in Davis County (north of Salt Lake City) where I went to K-12 school and graduated from Viewmont Highschool in 2017. </span>
      </AnimatedCard>


      <AnimatedCard>
        <span>I began studying Computer Science at the University of Utah (U of U) in Fall 2017. Before my senior year I started working as an undergraduate research assistant at the U of U's Scientific Computing and Imaging (SCI) Institute.</span>
      </AnimatedCard>

      <AnimatedCard>
        <span>Doing research at SCI was life-changing, and I learned a lot. In my undergraduate research I developed a high throughput workflow to accelerate earthquake simulations, collaborated with scientists from Oregon and other places - including a a work trip to the University of Oregon, and wrote a paper that was eventually accepted by an SC23 workshop and <Link href="https://dl.acm.org/doi/10.1145/3624062.3624276">published by the ACM</Link>.</span>
      </AnimatedCard>

      <AnimatedCard>
        <span>I graduated with my BS in Computer Science in Spring 2023. I continued to do research over the summer and then entered graduate school at the U of U and becoming a graduate research assistant at SCI. During the first year I explored using machine learning to synthesize volcanic geo-data.</span>
      </AnimatedCard>

      <AnimatedCard>
        <span>In Summer 2024 I did an internship at the University of Oregon, where I began development on On-Demand FakeQuakes, an iteration on previous work. I then turned this into my master's project and work research, continued development on it for a year, and created a full-stack app with a Python-based front-end, an AWS workflow (with Infrastructure-as-Code built in Python), and a CI/CD pipeline using GitHub Actions to automate AWS resource deployments, front-end updates, docker image builds and more. The project was targeted towards NASA scientists and other geoscientists.</span>
      </AnimatedCard>

      <AnimatedCard>
        In May 2025 I graduated with my MS in Computer Science, entered the industry, and I now work at SafeStreets as a software engineer. I am helping build TypeScript applications in the front-end with React and Svelte, and also working in the back-end with a Hono API and Drizzle database. The apps serve to manage security installation orders and appointments, inventory, and more for the business.
      </AnimatedCard>

      <AnimatedCard>
        Aside from software-related things, I enjoy snowboarding, hiking, the outdoors, film, electronic music production and DJing, video games, and more! I am passionate about developing software and continuing to learn!
      </AnimatedCard>
  </div>

  
  <!-- Right Col -->
  <div class="flex flex-col gap-6 md:text-left text-center items-center md:items-start text-muted-foreground md:mt-24">

    <a 
      class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
      href={CAL_EMAIL}
      title="Schedule a Meeting"
      target="_blank"
      rel="noreferrer"
    >
        <CalendarDays class="size-6"/>
        <span>Schedule a Meeting</span>
    </a>

    <div class="flex flex-row items-center gap-4">
      <a 
        class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
        href={EMAIL_URL}
        title="My Email"
        target="_blank"
        rel="noreferrer"
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
      target="_blank"
      rel="noreferrer"
    >
      <LinkedinIcon class="size-6"/>
      <span>LinkedIn</span>
    </a>

    <a
      class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
      href={GITHUB_URL}
      title="GitHub"
      target="_blank"
      rel="noreferrer"
    >
      <Github class="size-6"/>
      <span>GitHub</span>
    </a>

    <Separator />

    <div class="flex flex-col">
      <AnimatedImg src={snowboard_photo} alt="snowboard_photo" class="-rotate-2 mt-8" />
      <AnimatedImg src={masters_photo} alt="grad_phot" class="rotate-2 mt-24" />
      <AnimatedImg src={nasa_photo} alt="nasa_photo" class="-rotate-2 mt-16" />
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

