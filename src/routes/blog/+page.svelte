<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
  import coffee_gif from '$lib/assets/hot-coffee.gif';
	import BlogCard from "./_components/blogCard.svelte";
  import helloWorldPic from "$lib/assets/hello_world.png"
  import gsapPic from '$lib/assets/gsap_pic.png'
  import gsap from "gsap";
  import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
  gsap.registerPlugin(ScrambleTextPlugin);
	import { onMount } from 'svelte';
	import AnimatedSeparator from "$lib/components/animatedSeparator.svelte";

  // Date/time of the post
  const firstPostDate = new Date("2025-10-21T05:51:55.000Z")
  const secondPostDate = new Date("2025-12-01T03:51:00Z")

  let coffee: HTMLImageElement;
  let quote: HTMLSpanElement;
  onMount(() => {
    gsap.fromTo(
      ".swipe-in",
      { x: -350},
      { x: 0, duration: 0.3, ease: "power1.out" }
    );

    gsap.fromTo(
      ".animated-card",
      { x: -550},
      { x: 0, duration: 0.35, ease: "power1.out", delay: 0.05 }
    );

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

    animateQuote();
  });

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
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="flex flex-col gap-6">
  <h1 class="text-4xl md:text-5xl mt-4 swipe-in">The Marcus Adair Blog.</h1>

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
    <span class="text-xs text-muted-foreground">LATEST POSTS</span>
    <AnimatedSeparator />
  </div>

  <!-- TODO: add loop when more posts added? -->
  <BlogCard id="gsap" title="Web Animations w/ GSAP" date={secondPostDate} about="GSAP is an awsome library" href="/blog/gsap" imgSrc={gsapPic}/>

  <AnimatedSeparator />

  <BlogCard id="hello_world" title="Hello world!!" date={firstPostDate} about="My first ever blog post" href="/blog/hello-world" imgSrc={helloWorldPic}/>

  <AnimatedSeparator />
</div>
