<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
	import { CAL_EMAIL, EMAIL, EMAIL_URL, GITHUB_URL, LINKED_IN_URL } from "$lib/consts/config";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { cn } from "$lib/utils";
	import { CalendarDays, Check, Copy, Github, LinkedinIcon, Mail } from "lucide-svelte";
  import snowboard_photo from "$lib/assets/snowboard_photo.jpg"
  import masters_photo from "$lib/assets/masters_photo.jpg"
	import Link from "$lib/components/link.svelte";
  import gsap from "gsap";
	import SplitText from "gsap/SplitText";
	import { onMount } from "svelte";
	import AnimatedCard from "$lib/components/animatedCard.svelte";
	import AnimatedImg from "$lib/components/animatedImg.svelte";
	import { showingBootAnimation } from "$lib/stores/boot.svelte";

  let MeetingElt: HTMLAnchorElement;
  let EmailElt: HTMLDivElement;
  let LinkedInElt: HTMLAnchorElement;
  let GithubElt: HTMLAnchorElement;
  let copyIcon: HTMLElement;
  let checkIcon: HTMLElement;

  const splitKeys = ['schedule', 'email', 'linked-in', 'git-hub'];
  const splitTextTLs: Record<string, gsap.core.Timeline> = {};
  onMount(() => {
    gsap.registerPlugin(SplitText);

    const SPLIT_ANIM = { y: -25, duration: 0.175, stagger: 0.02, ease: "power1.out" };
    (splitKeys).forEach(key => {
        const split1 = SplitText.create(`.split-text-${key}`, { type: "chars" });
        const split2 = SplitText.create(`.split-text-${key}-2`, { type: "chars" });
        splitTextTLs[key] = gsap.timeline({ paused: true })
            .to(split1.chars, SPLIT_ANIM)
            .to(split2.chars, SPLIT_ANIM, 0);
    });

    // TODO: make this look better ... use a x/y trans .. i think i tried but it didn't work
    // const OVERLAP = "-=0.32"; 
    // const ANIM_FROM =  {opacity: 0};
    // const ANIM_TO =  {opacity: 1, duration: 0.45, ease: "power1.inOut"};
    // const linksTimeline = gsap.timeline();
    // linksTimeline.fromTo(LinkedInElt, ANIM_FROM, ANIM_TO, OVERLAP);    
    // linksTimeline.fromTo(GithubElt, ANIM_FROM, ANIM_TO, OVERLAP );
    // linksTimeline.fromTo(MeetingElt, ANIM_FROM, ANIM_TO, OVERLAP );
    // linksTimeline.fromTo(EmailElt, ANIM_FROM, ANIM_TO, OVERLAP);   
  });
  $effect(() => {
    if (!showingBootAnimation()) {  
      // Animate after boot sequence
      const ABOUT_ANIM = { y: 40, duration:0.2, opacity: 0,  ease: "power1.out" };
      const tl = gsap.timeline();
      [1,2,3,4,5].forEach((i) => {
        tl.from(`.about-anim-${i}`, ABOUT_ANIM, i * 0.1);
      });

      gsap.from(
          ".about-title",
          { x: -300, duration: 0.4, ease: "power1.out"}
      );
    }
  });

	const EASE = "power2.out";
	const DURATION = 0.22;
	function transCopyIcon() {
		gsap.fromTo(copyIcon, { y: 0}, { y: 20, duration: DURATION, ease: EASE });
		gsap.fromTo(checkIcon, {y: -20 }, { y: 0, duration: DURATION, ease: EASE });
	}

  function copyEmail() {
    transCopyIcon();
    navigator.clipboard.writeText(EMAIL);

    setTimeout(() => { 
      gsap.fromTo(copyIcon, { y: 20}, { y: 0, duration: DURATION, ease: EASE });
      gsap.fromTo(checkIcon, {y: 0 }, { y: -20, duration: DURATION, ease: EASE });
    }, 1800);
  }
</script>

<svelte:head>
  <title>About • Marcus Adair</title>
</svelte:head>

{#if !showingBootAnimation()}
  <div class="grid grid-cols-1 md:grid-cols-[55%_45%] gap-16">
    <!-- Left Col -->
      <div class="flex flex-col gap-6">
        <div class="flex flex-row gap-4 items-center mb-2">
          <h1 class="about-title text-3xl sm:text-4xl md:text-5xl mt-4">Hi, I'm Marcus Adair <span class="text-xl md:text-4xl wave">👋🏻</span></h1>
        </div>

        <AnimatedCard aboutNum={1}>
          <span>I was born and raised in Utah, primarily in Davis County. I studied Computer Science at the University of Utah (U of U) starting in Fall 2017. During the Summer before my final undergrad. year, in 2022, I began working as an undergraduate research assistant at the Scientific Computing and Imaging (SCI) Institute.</span>
        </AnimatedCard>

        <AnimatedCard aboutNum={2}>
          <span>At SCI, I developed a high-throughput workflow to accelerate earthquake simulations and collaborated with scientists across institutions. This work led to a paper <Link href="https://dl.acm.org/doi/10.1145/3624062.3624276">published by the ACM</Link> at an SC23 workshop.</span>
        </AnimatedCard>

        <AnimatedCard aboutNum={3}>
          <span>
            I earned my BS in Computer Science in 2023, then pursued my MS at the U of U, working as a graduate research assistant at SCI. At the start of grad. school I explored using machine learning to synthesize volcanic geo-data.
            Then I transitioned and for my master's project, I iterated on previous work involving earthquake simulations and built a full-stack application including a Python front-end user interface, an AWS workflow build with Python and, AWS Infrastructure-as-Code in Python, a CI/CD pipeline with GitHub Actions for automated deployments and Docker builds, and more.</span>
        </AnimatedCard>

        <AnimatedImg src={masters_photo} alt="grad_phot" class="rotate-2 my-1 md:hidden" />

        <AnimatedCard aboutNum={4}>
          <span>I graduated with my MS in Computer Science in May 2025 and now work at SafeStreets as a software engineer, building modern TypeScript applications with Svelte, React-Native, and more to support business operations.</span>
        </AnimatedCard>


        <AnimatedCard aboutNum={5}>
          <span>Outside of work, I enjoy snowboarding, hiking, electronic music production, animation, web development, and always learning something new!</span>
        </AnimatedCard>

        <AnimatedImg src={snowboard_photo} alt="snowboard_photo" class="-rotate-2 my-1 md:hidden" />
    </div>

    <!-- Right Col -->
    <div class="flex flex-col gap-6 md:text-left text-center items-center md:items-start text-muted-foreground md:mt-24">
      <a
        bind:this={LinkedInElt}
        class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
        href={LINKED_IN_URL}
        rel="external"
        title="LinkedIn"
        target="_blank"
        onmouseenter={() => splitTextTLs[splitKeys[2]].play()}
        onmouseleave={() => splitTextTLs[splitKeys[2]].reverse()}
      >
        <LinkedinIcon class="size-6"/>
        <div class="relative overflow-clip">
          <span class={`split-text-${splitKeys[2]}`}>LinkedIn</span>
          <span class={cn("absolute inset-0 translate-y-[25px]", `split-text-${splitKeys[2]}-2`)}>LinkedIn</span>
        </div>
      </a>

      <a
        bind:this={GithubElt}
        class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
        href={GITHUB_URL}
        title="GitHub"
        target="_blank"
        rel="external"
        onmouseenter={() => splitTextTLs[splitKeys[3]].play()}
        onmouseleave={() => splitTextTLs[splitKeys[3]].reverse()}   
      >
        <Github class="size-6"/>
        <div class="relative overflow-clip">
          <span class={`split-text-${splitKeys[3]}`}>GitHub</span>
          <span class={cn("absolute inset-0 translate-y-[25px]", `split-text-${splitKeys[3]}-2`)}>GitHub</span>
        </div>
      </a>

      <Separator />

      <a 
        bind:this={MeetingElt}
        class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
        href={CAL_EMAIL}
        title="Schedule a Meeting"
        target="_blank"
        rel="external"
        onmouseenter={() => splitTextTLs[splitKeys[0]].play()}
        onmouseleave={() => splitTextTLs[splitKeys[0]].reverse()}
      >
          <CalendarDays class="size-6"/>
          <div class="relative overflow-clip">
            <span class={`split-text-${splitKeys[0]}`}>Schedule a Meeting</span>
            <span class={cn("absolute inset-0 translate-y-[25px]", `split-text-${splitKeys[0]}-2`)}>Schedule a Meeting</span>
          </div>
      </a>

      <div class="flex flex-row items-center gap-4" bind:this={EmailElt}>
        <a 
          class={cn("hover:text-ring transition-colors flex flex-row gap-4 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}
          href={EMAIL_URL}
          title="My Email"
          target="_blank"
          rel="external"
          onmouseenter={() => splitTextTLs[splitKeys[1]].play()}
          onmouseleave={() => splitTextTLs[splitKeys[1]].reverse()}
        >
          <Mail class="size-6"/>
          <div class="relative overflow-clip">
            <span class={`split-text-${splitKeys[1]}`}>marcus.a.adair@gmail.com</span>
            <span class={cn("absolute inset-0 translate-y-[25px]", `split-text-${splitKeys[1]}-2`)}>marcus.a.adair@gmail.com</span>
          </div>
        </a>
        
        <button class="transition-colors relative w-fit h-fit overflow-clip" title="Copy" onclick={copyEmail}>
          <div bind:this={copyIcon}>
            <Copy class="size-4.5 hover:text-ring cursor-pointer" />
          </div>
          <div bind:this={checkIcon}>
            <Check class="size-4.5 hover:text-ring absolute top-0 left-0 -translate-y-[20px] text-green-600" />
          </div>
        </button>
      </div>

      <Separator />

      <div class="hidden md:flex flex-col">
        <AnimatedImg src={snowboard_photo} alt="snowboard_photo" class="-rotate-2 mt-8" />
        <AnimatedImg src={masters_photo} alt="grad_phot" class="rotate-2 mt-24" />
      </div>
    </div>
  </div>
{/if}

<!-- Wave animation -->
<style>
  @keyframes wave {
    0%, 12% { transform: rotate(0deg); }
    20% { transform: rotate(20deg); }
    30% { transform: rotate(-15deg); }
    40% { transform: rotate(15deg); }
    50% { transform: rotate(-10deg); }
    60% { transform: rotate(10deg); }
    70% { transform: rotate(-5deg); }
    80% { transform: rotate(5deg); }
    90%, 100% { transform: rotate(0deg); }
  }

  .wave {
    display: inline-block;
    animation: wave 2.5s ease-in-out infinite;
    transform-origin: 70% 70%;
  }
</style>

