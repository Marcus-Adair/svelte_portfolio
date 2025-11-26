<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
  import coffee_gif from '$lib/assets/hot-coffee.gif';
	import BlogCard from "./_components/blogCard.svelte";
  import helloWorldPic from "$lib/assets/hello_world.png"
  import gsap from "gsap";
	import { onMount } from 'svelte';

  // Date/time of the post
  const firstPostDate = new Date("2025-10-21T05:51:55.000Z")

  let coffee: HTMLImageElement;
  onMount(() => {
    gsap.fromTo(
            "h1",
            { x: -350},
            { x: 0, duration: 0.35, ease: "power1.out" }
    );
    gsap.fromTo(
      ".coffee-quote",
      { x: -350},
      { x: 0, duration: 0.29, ease: "power2.out", delay: 0.05 }
    );


    gsap.fromTo(
            ".animated-card",
            { x: -550},
            { x: 0, duration: 0.35, ease: "power1.out", delay: 0.05 }
    );
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
  <h1 class="text-4xl md:text-5xl mt-4">The Marcus Adair Blog.</h1>

  <div class="flex flex-col gap-3.5">
    <div class="flex flex-row gap-4 h-5 font-[Space_Grotesk] coffee-quote">
      <div class="flex gap-4 quote">
        <span >- I turn coffee into algorithms</span>
        <Separator orientation="vertical"/>
      </div>
      <button onclick={spinCoffee} class="flex-none cursor-pointer">
        <img src={coffee_gif} bind:this={coffee} alt="coffee_gif" class="size-12 -translate-y-5.25 -translate-x-1" />
      </button>
    </div>
    <span class="text-muted-foreground text-sm font-light">A collection of my sporadic and genius thoughts on software, some memes, etc.</span>
  </div>


  <div class="flex flex-col gap-1.25 mt-2">
    <span class="text-xs text-muted-foreground">LATEST POSTS</span>
    <Separator />
  </div>

  <!-- TODO: add loop when more posts added? -->
    <div class="animated-card"><BlogCard title="Hello world!!"  date={firstPostDate} about="My first ever blog post" href="/blog/hello-world" imgSrc={helloWorldPic}/></div>

  <Separator/>   
</div>



