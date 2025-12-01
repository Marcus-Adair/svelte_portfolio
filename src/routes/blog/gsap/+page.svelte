<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import { onMount } from "svelte";
    import gsap from "gsap";
    import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
    gsap.registerPlugin(ScrambleTextPlugin);
import Paragraph from "../_components/paragraph.svelte";
	import PostHeader from "../_components/postHeader.svelte";
	import Card from "$lib/components/ui/card/card.svelte";

    const DATE = new Date("2025-12-01T03:51:00Z");

    let scrambleSpan: HTMLSpanElement;
    onMount(() => {
        function animateScrambleSpan() {
            gsap.timeline({ repeat: -1, repeatDelay: 3.5 })
                .to(scrambleSpan, { 
                duration: 3.5, 
                scrambleText: {text: "Here is an example of text that is scrambled", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890!@#$%^&*"},
                ease: "elastic.inOut" 
                })
                .to(scrambleSpan, {
                duration: 3.5, 
                scrambleText: { text: "See how it changes. I have defined the chars, duration, and ease properies.", chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890!@#$%^&*"}, 
                ease: "elastic.inOut", 
                delay: 3.5
            });
        }
        animateScrambleSpan();
    });

    let toElt: HTMLButtonElement;
    let fromElt: HTMLButtonElement;
    let fromToElt: HTMLButtonElement;
    function animateTo() {   
        const tl = gsap.timeline();
        tl.to(toElt, {x: 100, duration: 1, ease: "power1.inOut"});
        tl.to(toElt, {x: 0, duration: 0.2, delay: 1});
    } 
    function animateFromTo() {   
        const tl = gsap.timeline();
        tl.fromTo(fromToElt,  {x: -100, duration: 1, ease: "power1.inOut"}, {x: 100, duration: 1, ease: "power1.inOut"});
        tl.to(fromToElt, {x: 0, duration: 0.2, delay: 1});
    } 

</script>

<svelte:head>
  <title>Blog - GSAP</title>
</svelte:head>

<div class="flex flex-col gap-4">
    <PostHeader date={DATE} postNum={2} title="Web Animations w/ GSAP"/>

    <Paragraph>
        I have recently discovered <Link href="https://gsap.com/">GSAP</Link>, an amazing package then enables the implementation
        of seamless animation on the web. I wish I had discovered this earlier! I have been diving deeper lately into libraries 
        for doing 2D and 3D animation on the web lately. GSAP is a powerful one that enables you to animate HTML and CSS in simple and 
        powerful ways. At the time of writing this I am still a begginer but I have been able to catch on relatively fast. Another library
        I found was <Link href="https://threejs.org/">three.js</Link>, which allows one to render 3D models on the broswer (at the time of writing 
        this I am planning to do a post on three.js in the future).
    </Paragraph>

    <Paragraph>
        If you are reading this you have probably noticed that this website has non-trivial animations. For example, there are elements that, when 
        hovered over, will grow in scale and move in the direcetion of the cursor. This is done with GSAP! I use GSAP's <span class="italic">to()</span>
        function to move the position of an HTML element and scale it.
    </Paragraph>


    <Paragraph>
        GSAP has 3 core function that allow for creating custom animations: <span class="italic">to()</span>,  <span class="italic">from()</span>, and  <span class="italic">fromTo()</span>. The 
        first allow you to reference an HTML element and move it to state (from the current state). The different states can involve size, scale, opactiy, and more. The  <span class="italic">from()</span>
        function allows one to animate an element from some state to the element's current state, and the final function allows one to animate from some state to some other state. An example use case is when some
        component mounts, you can trigger some number of animations to occur; this is what happens in this website: when different pages load, elements swipe in from the sides of the sceen. GSAP also provides
        a simple timeline feature that allows one to trigger animations in a row at specificed times, and allows for loops and yoyoing.
    </Paragraph>

    <!-- TODO: show example of to(), from(), and fromTo() -->
    <Paragraph>Click on the shapes below to visulize the functions:</Paragraph>
    <div class="flex justify-center mb-8">
        <Card class="flex flex-col gap-6 items-center w-96">
            <button bind:this={toElt} onclick={animateTo} class="border-2 border-indigo-900 bg-indigo-600 text-white rounded-xl w-20 h-20 cursor-pointer " title="Click me">
                <span class="italic">to()</span>
            </button>
        
            <button  bind:this={fromElt} onclick={() => gsap.from(fromElt, {x: -100, duration: 1, ease: "power1.inOut"})} class="border-2 border-teal-700 bg-teal-600 text-white rounded-xl w-20 h-20 cursor-pointer" title="Click me">
                <span class="italic">from()</span>
            </button>
    
            <button  bind:this={fromToElt} onclick={animateFromTo} class="border-2 border-amber-700 bg-amber-600 text-white rounded-xl w-20 h-20 cursor-pointer" title="Click me">
                <span class="italic">fromTo()</span>
            </button>
        </Card>
    </div>

    <Paragraph>
        While the animations above could be done with pure CSS, GSAP provides an intuitive API. For example, a powerful property you can apply is <Link href="https://gsap.com/docs/v3/Eases/">Easing</Link>.
        Basically, there are different easing types that make animations smoother. For example you can apply a bounce ease to a movement, or an ease with a nice curve that starts fast and ends slow.
    </Paragraph>

    <Paragraph>
        GSAP provides some plugins for doing clean animations quickly. An example is one is <Link href="https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/">ScrambleText</Link>; you may
        have seen this one used in this site (e.g., the front page of the Blog). By tweaking the scrambled text, duration, and easing, this can be a very cool effect. Here is an example:
    </Paragraph>

    <div class='flex justify-center'>
        <span bind:this={scrambleSpan} class="text-center mb-8 border border-border p-3 rounded-md bg-card w-[800px]">Here is an example of text that is scrambled</span>
    </div>

    <Paragraph>
        So yeah! Give GSAP a try! It is totally free and there are a ton of examples. It should work with any JavaScript based UI. It is very simple to install with NPM,
        other package managers, or a CDN. The source code for my website is open, so feel free to check out how I implemented my animations!
    </Paragraph>

    

    <span class="text-right text-4xl font-[Space_Grotesk] lg:mr-14 mt-2"> - Marcus,</span>
    <span class="text-right text-lg font-[Space_Grotesk] lg:mr-14">Nov. 30th, 2025</span>

    <Paragraph>
        (P.S., Go to the <Link href="/">home page</Link> and try click on the coffee gif... 👀 ☕️)
    </Paragraph>
</div>

