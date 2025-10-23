<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
  import coffee from '$lib/assets/hot-coffee.gif';
	import BlogCard from "./_components/blogCard.svelte";
  import helloWorldPic from "$lib/assets/hello_world.png"


  //  const nowInSLC = new Date().toLocaleString("en-US", { timeZone: "America/Denver" });
  // console.log(nowInSLC); // e.g. "10/20/2025, 11:43:00 PM"

  // // Convert back to Date:
  // const dateInSLC = new Date(nowInSLC);
  // console.log(dateInSLC.toISOString());

  const firstPostDate = new Date("2025-10-21T05:51:55.000Z")
  

</script>

<svelte:head>
  <title>Blog - Marcus Adair</title>
</svelte:head>


<div class="flex flex-col gap-6">
  <h1 class="text-4xl md:text-5xl font-bold mr-44 font-[Space_Grotesk] mt-4">The Marcus Adair Blog.</h1>

  <div class="flex flex-col gap-3.5">
    <div class="flex flex-row items center gap-4 h-5 font-[Space_Grotesk]">
      <span>- I turn coffee into algorithms</span>
      <Separator orientation="vertical"/>
      <img src={coffee} alt="" class="size-12 -translate-y-5.25 -translate-x-1" />
    </div>
    <span class="text-muted-foreground text-sm">A collection of my sporadic and genius thoughts on software, some memes, etc.</span>
  </div>


  <div class="flex flex-col gap-1.25 mt-2">
    <span class="text-xs text-muted-foreground">LATEST POSTS</span>
    <Separator />
  </div>

  <!-- TODO: add loop? -->

  <BlogCard title="Hello world!!" date={firstPostDate} about="My first ever blog post" href="/blog/hello-world" imgSrc={helloWorldPic}/>

</div>



