<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/ui/button.svelte";
    import Separator from "$lib/components/ui/separator.svelte";
	import { formatDate } from "$lib/utils/dates";
	import { ChevronLeft } from "lucide-svelte";
	import Paragraph from "../_components/paragraph.svelte";
    import spidermanMeme  from "$lib/assets/spiderman_meme.png"
	import PostHeader from "../_components/postHeader.svelte";

    const DATE = new Date("2025-10-21T05:51:55.000Z")
</script>


<div class="flex flex-col gap-4">
    <PostHeader date={DATE} postNum={1} title="Hello World!!"/>
    
    <Paragraph>
        Hello World! ... or so as they say. My name is Marcus. This is the first post in what is my attempt at a blog. 
        Hopefully this isn't the only post that actually end up being made. Hopefully this site actually ends up getting launched ... because 
        I am developing a brand new portfolio website! In the past I have used prebuilt templates to build sites, but now I have the skills
        to build something from scratch that is event better, even grander, and something that is more in my style.
    </Paragraph>

    <Paragraph>
        With this project I have chose a front-end framework that I enjoy using - Svelte. It has been fun to dive into Svelte, which is a framework I wasn't aware of earlier this year. The technology behind Svelte is super
        cool in that it uses a custom compiler to convert its own custom syntax into lightweight, optimized javascript that runs on the browser.
        They're able to abstract a lot of complexities from React and define simple ways of doing common web dev patterns. For example, they provide
        a greate await-then-catch block syntax that allows you await some data (which is a promise), provide a spinner while you're waiting, and then 
        do something with that data when it is fetched or else render something when an error happens.
    </Paragraph>

    <Paragraph>Here's an example.</Paragraph>

    <!-- Terminal Writing -->
    <div class="py-4 mx-20">
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
        In the above example, <span class="font-mono italic">data.someValue</span> is a Promise that is returned from the server. While that Promise is being awaited, a Spinner is rendered.
        When the Promise is resolved, <span class="font-mono italic">data.someValue</span> is rendered, or an error is caught and handled. In React, a developer has a ton of options for how they
        could implement this and beginners may make mistakes, but Svelte provides an awesome best practice pattern through their syntax that is easy to follow, simple to implement, and powerful.
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

    <Paragraph>Thanks again for reading this if you are! Cheers!</Paragraph>

    <span class="text-right text-4xl font-[Space_Grotesk] mr-18"> - Marcus,</span>
    <span class="text-right text-lg font-[Space_Grotesk] mr-18">Oct. 20th and 21st, 2025</span>
</div>