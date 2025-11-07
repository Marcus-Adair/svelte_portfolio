<script lang="ts">
    import spidermanMeme  from "$lib/assets/spiderman_meme.png"
	import Paragraph from "../_components/paragraph.svelte";
	import PostHeader from "../_components/postHeader.svelte";

    const DATE = new Date("2025-10-21T05:51:55.000Z")
</script>

<svelte:head>
  <title>Blog - Hello World!!</title>
</svelte:head>


<div class="flex flex-col gap-4">
    <PostHeader date={DATE} postNum={1} title="Hello World!!"/>
    
    <Paragraph>
        Hello World! ... or so they say. My name is Marcus. This is the first post in what is my attempt at a blog. 
        Hopefully this isn't the only post that actually end up being made. I am developing a brand new portfolio website! In the past I have used prebuilt templates to build sites, but now I have the skills
        to build something from scratch that is even better.
    </Paragraph>

    <Paragraph>
        With this project I have chosen a front-end framework that I enjoy using - Svelte. It has been fun to dive into Svelte, which is a framework that I wasn't aware of earlier this year. The technology behind Svelte is super
        cool in that it uses a custom compiler to convert custom Svelte syntax into optimized JavaScript that runs on the browser.
        Svelte is able to abstract a lot of complexities from React and define simple ways of doing common web dev patterns. For example, a code pattern I enjoy is how it provides
        a great await-then-catch block syntax that allows one to await a promise of data, render a spinner on the client while waiting, and then 
        do something with that data when it is fetched or else handle an error.
    </Paragraph>

    <Paragraph>Here's an example.</Paragraph>

    <!-- Terminal Writing -->
    <div class="py-4 lg:mx-20">
        <div class="bg-[#2f2f2f] text-white px-4 py-3 border border-slate-600 rounded-tl-md rounded-tr-md">
            <span class="text-lg">svelte</span>
        </div>
        <div class="bg-[#222222] text-white font-mono p-4 rounded-br-md rounded-bl-md border-slate-600 border-r border-l border-b">
            <span class="whitespace-pre-wrap leading-7">
          {`{#await data.someValue}
    <Spinner />
{:then someValue}
    <span>{someValue}</span>
{:catch error}
    <span class="text-red-400">Error: {error.message}</span>
{/await}`}
            </span>
        </div>
    </div>

    <Paragraph>
        In React, a developer has a ton of options for how they might implement something like this - this because React is quite non-opinionated; I think this could cause beginners to make mistakes.
        Svelte's opinions on how to cleanly do different things provides an awesome experience through their language that is easy to follow, simple to implement, and powerful.
    </Paragraph>


    <Paragraph>
        Ya' know, I never really sit down and wrote on my free time much, but this is actually a great way to use my brain and express some creativity. But yeaaahhh... here's a funny programming meme:
    </Paragraph>

    <div class="flex flex-row items-center justify-center pb-10 pt-2">
        <img src={spidermanMeme} alt="spiderman" class="w-96 h-auto">
    </div>
    

    <Paragraph>
        If you are reading this then THANK YOU!!. Please reach out to me if you are interested in working or collaborating on anything.
        And like I said earlier, I hope that I actually update this blog. This site can be an outlet for me to not only showcase my resume, but
        to highlight some things that I think are cool and to show off a bit of my personality.
    </Paragraph>

    <Paragraph>Thanks again, cheers!</Paragraph>

    <span class="text-right text-4xl font-[Space_Grotesk] lg:mr-14 mt-2"> - Marcus,</span>
    <span class="text-right text-lg font-[Space_Grotesk] lg:mr-14">Oct. 20th and 21st, 2025</span>
</div>