<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
  import coffee_gif from '$lib/assets/hot-coffee.gif';
	import BlogCard from "./_components/blogCard.svelte";
  import helloWorldPic from "$lib/assets/hello_world.png"
  import gsapPic from '$lib/assets/gsap_pic.png'
  import gsap from "gsap";
  import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
	import { onMount } from 'svelte';
	import AnimatedSeparator from "$lib/components/animatedSeparator.svelte";
  import svelte2048pic from '$lib/assets/svelte_2048_pic.png';
  import easyScrumPic from '$lib/assets/easy-scrum_pic.png';
  import lucyPic from '$lib/assets/lucy_pic.png';
	import { ChevronDown, ChevronUp } from "lucide-svelte";
	import Button from "$lib/components/ui/button.svelte";
	import { showingBootAnimation } from "$lib/stores/boot.svelte";

  let showingAllPosts = $state(false);

  let coffee: HTMLImageElement;
  let quote: HTMLSpanElement;
  let post1: HTMLDivElement;
  let post2: HTMLDivElement;
  // svelte-ignore non_reactive_update
  let post3: HTMLDivElement;
  let post4: HTMLDivElement;
  let post5: HTMLDivElement;

  function spinCoffee() {
    gsap.fromTo(
      coffee,
      { rotate: 0 },
      {
        rotate: 360,
        duration: 0.42,
      }
    );
  }
  function animateQuote() {
      gsap.timeline({ repeat: -1, repeatDelay: 3 })
        .to(quote, { 
          duration: 3, 
          scrambleText: {text: "- I turn coffee into algorithms", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890!@#$%^&*"},
          ease: "elastic.inOut" 
        })
        .to(quote, {
          duration: 3, 
          scrambleText: { text: "- Welcome to my blog", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890!@#$%^&*"}, 
          ease: "elastic.inOut", 
          delay: 3
        });
    }
  onMount(() => {
    gsap.registerPlugin(ScrambleTextPlugin);
  });
  $effect(() => {
    if (!showingBootAnimation()) {  
      gsap.fromTo(
        ".swipe-in",
        { x: -350},
        { x: 0, duration: 0.3, ease: "power1.out" }
      );

      gsap.fromTo(
        ".animated-card",
        { x: -550},
        { x: 0, duration: 0.04, ease: "power1.out", delay: 0.05 }
      );


      animateQuote();

      const postsAnimIn = {
        y: 40,
        opacity: 0,
        ease: "power1.out",
        duration: 0.1,
      };
      const overlap = "-=0.0.8"; 

      const tl = gsap.timeline();
      tl.from(post5, postsAnimIn);
      tl.from(post4, postsAnimIn, overlap);
      tl.from(post1, postsAnimIn, overlap);
      tl.from(post2, postsAnimIn, overlap);
      tl.from(post3, postsAnimIn, overlap);
    }
  });
</script>

<svelte:head>
  <title>Blog • Marcus Adair</title>
</svelte:head>

{#if !showingBootAnimation()}
<div class="flex flex-col gap-6">
  <h1 class="text-4xl md:text-5xl md:mt-4 swipe-in">The Marcus Adair Blog.</h1>

  <div class="flex flex-col gap-3.5">
    <div class="flex flex-row gap-4 h-5 font-[Space_Grotesk] swipe-in">
      <div class="flex gap-4 quote">
        <span bind:this={quote}>- I turn coffee into algorithms</span>
        <Separator orientation="vertical"/>
      </div>
      <button onclick={spinCoffee} class="flex-none cursor-pointer">
        <img src={coffee_gif} bind:this={coffee} alt="coffee_gif" class="size-12 -translate-y-5.25 -translate-x-1" />
      </button>
    </div>
    <span class="text-muted-foreground text-xs font-light tracking-wider">A collection of my sporadic and genius thoughts on software, some memes, and more.</span>
  </div>

  <div class="flex flex-col gap-1.25 mt-2">
    <span class="text-xs text-muted-foreground">{showingAllPosts ? "ALL" : "HIGHLIGHTED"} POSTS</span>
    <AnimatedSeparator />
  </div>

  <div bind:this={post5}>
    <BlogCard id="lucy" title="Meet Lucy" date={new Date("2026-04-08T04:10:00.000Z")} about="An AI writing about itself — the Lucy experiment" href="/blog/lucy" imgSrc={lucyPic}/>
    <AnimatedSeparator />
  </div>

  {#if showingAllPosts}
    <div bind:this={post4}>
      <BlogCard id="easy-scrum" title="I Made a Simple, Collaborative Scrum App" date={new Date("2026-03-08T06:00:00.000Z")} about="Shipping a scrum board app fast with SvelteKit, Drizzle, Railway, Claude Code, and more" href="/blog/easy-scrum" imgSrc={easyScrumPic}/>
      <AnimatedSeparator />
    </div>
  {/if}

  <div bind:this={post1}>
    <BlogCard id="svelte-2048" title="2048 with Svelte, Tailwind, and GSAP" date={new Date("2025-12-30T04:37:55.000Z")} about="Details on how I implemented 2048" href="/blog/svelte-2048" imgSrc={svelte2048pic}/>
    <AnimatedSeparator />
  </div>

  <div bind:this={post2}>
    <BlogCard id="gsap" title="Web Animations w/ GSAP" date={new Date("2025-12-01T03:51:00Z")} about="GSAP is an awesome library" href="/blog/gsap" imgSrc={gsapPic}/>
    <AnimatedSeparator />
  </div>

  {#if showingAllPosts}
    <div bind:this={post3}>
      <BlogCard id="hello_world" title="Hello world!!" date={new Date("2025-10-21T05:51:55.000Z")} about="My first ever blog post" href="/blog/hello-world" imgSrc={helloWorldPic}/>
      <AnimatedSeparator />
    </div>
  {/if}

  <div class="flex gap-2 justify-end">
    <Button
      variant="ghost"
      size="sm"
      onclick={() => showingAllPosts = !showingAllPosts}
      title={showingAllPosts ? "Show Highlighted Posts" : "See All Posts"}
    >
      <span>
        { !showingAllPosts ? "SEE ALL" : "SHOW HIGHLIGHTED" } POSTS
      </span>
      {#if showingAllPosts}
        <ChevronUp class="size-4"/>
      {:else}
        <ChevronDown class="size-4"/>
      {/if}
    </Button>
  </div>
</div>
{/if}
