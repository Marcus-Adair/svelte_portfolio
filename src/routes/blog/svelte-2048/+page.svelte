<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import BlogCard from "../_components/blogCard.svelte";
	import Paragraph from "../_components/paragraph.svelte";
	import PostHeader from "../_components/postHeader.svelte";
	import Signature from "../_components/signature.svelte";
    import svelte2048pic from '$lib/assets/svelte_2048_pic.png';

    // TODO
    const DATE = new Date("2025-12-30T04:37:55.000Z")
</script>

<svelte:head>
  <title>Blog - Svelte 2048 • Marcus Adair</title>
</svelte:head>

<!-- <Link href="https://marcus-adair.github.io/svelte_2048/">here</Link> -->
<div class="flex flex-col gap-4">
    <PostHeader date={DATE} postNum={3} title="2048 with with Svelte, Tailwind, and GSAP"/>

    <Paragraph>
        Recently as I have started to dive into learning about 2D and 3D animation JS libraries, I realized that GSAP would 
        be the perfect tool to help me implement animations for a 2048 game. A couple years back I built 2048 with Elm, a fully
        functional programming language, for a graduate level functional programming course (play it <Link href="https://marcus-adair.github.io/ELM_2048/">here</Link>).
        The game was a success but it lacked animations, thus I was inspired to build it again with TypeScript!
    </Paragraph>

    <Paragraph>
        So check out my new implementation of 2048, built with TypeScript, Svelte, Tailwind, GSAP, and more! Click below:
    </Paragraph>
    <BlogCard id="svelte-2048-game" title="Svelte 2048" about="Click to play!" href="https://marcus-adair.github.io/svelte_2048/" imgSrc={svelte2048pic} hoverTitle="Click to play!" openInNewTab/>

    <Paragraph>
        I implemented the game with minimal AI-assistance, writing the game logic and animation logic myself. It turned out well! I 
        still have some things I can polish up (including the merging logic potentially) at the time of writing this, but I was able to use my favorite web dev 
        stack to build one of my favorite classic iPhone games.
    </Paragraph>

    <Paragraph>
        Check out the code <Link href="https://github.com/Marcus-Adair/svelte_2048">here</Link>! A little bit about the implementation: So,
        the hardest part implementation was the sliding/merging logic. When first building the game I started to implement sliding (along with animations)
        one tile and one space at a time. After then adding tile spawning and merging logic, things became a mess and everything was also broke. At this point
        the animation was also breaking and tiles were sliding out of the board. I added a move lock where a move couldn't occur until a after a certain amount of time
        since the last run, enough to allow time for all the animations to finish and prevent the spamming of keys to break the game.
    </Paragraph>

    <Paragraph>
        For merging and sliding, the key was to come up with the right algorithm; this involved first sliding tiles, performing merge logic on the matching/touching 
        tiles according to the game rules, and then doing another slide to pack tiles after merging. After doing these slide/merge steps, I create a Record 
        that map tile IDs to the tiles' new positions on the board; I use this map to loop over my board tiles and animate them sliding into place and merging (and also perform style changes).
    </Paragraph>

    <Paragraph>
        The tiles that you see in the game are HTML Div elements that are styled with Tailwind (depending on the game state). I then perform position animations on the Div elements
        according to the width of the tiles in pixels (plus extra pixels for board-slot gaps) multiplied by the number of board slots that tiles move, in addition to scale and opacity
        animations for tile merging and spawning. I use 16 Div elements (as the board has a max of 16 slots) that are used and freed up while merging and spawning in tiles.
    </Paragraph>

    <Paragraph>
        Essentially the game listens for a arrow key press event, then it performs the sliding/merge logic, and then performs the animations given the new game state
        on every move. I also added themes and an animated popover menu for switching themes!
    </Paragraph>

    <Paragraph>
        Overall, I had a blast building this! I was definitely an improvement over my last 2048 implementation. 2048 is actually well-suited for
        Elm's state-driven UI rendering, but I think building the game with TypeScript was easier - and GSAP was perfect for adding animations. If 
        you are reading this thank you for reading and playing!
    </Paragraph>

    <Signature
        name="- Marcus,"
        date="Dec. 29th, 2025"
    />
</div>