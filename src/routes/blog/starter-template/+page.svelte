<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import BlogCard from "../_components/blogCard.svelte";
	import Paragraph from "../_components/paragraph.svelte";
	import PostHeader from "../_components/postHeader.svelte";
	import Signature from "../_components/signature.svelte";
	import starterPic from '$lib/assets/starter_template_svelte_screenshot.png';

	const DATE = new Date("2026-10-13T04:10:00.000Z")
</script>

<svelte:head>
  <title>Blog - My Starter Template for Creative Dev • Marcus Adair</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<PostHeader date={DATE} postNum={6} title="My Starter Template for Creative Dev"/>

	<Paragraph>
		I made what I think is my coolest personal project yet - something that I will use and that
		other people can really use and benefit from too! I made a starter template, but not just any
		web starter template, one that is crafted specifically for doing creative dev work; this includes
		the ability to create pixel-perfect front-end websites that match designs to the tee. A problem
		with standard HTML/CSS is that it can be hard to make websites scale well across devices and look
		good on resize. What looks good on one device may look bad on another. And when a design is built
		in one screen size, how should that translate to others?
	</Paragraph>

	<Paragraph>
		I recently started a new job at <Link href="https://reformcollective.com/">Reform Collective</Link>,
		a digital design agency where we build polished marketing websites that feature advanced animations
		and pixel-perfect designs. Discovering Reform Co. is what got me interested in the niche of creative
		dev. At Reform Co. I learned the technique of responsive scaling of UI elements based on viewport width.
	</Paragraph>

	<Paragraph>
		To answer the questions I posed earlier: the answer is responsive scaling. My starter template comes
		with an opt-in system that scales CSS px values by a ratio based on viewport width. As viewport gets
		wider than the design size, elements grow; as it gets narrower, elements scale down. This keeps text,
		gaps, and everything else consistent - text elements aren't fighting for screen space as sizes shrink.
		There's a limit to upward scaling where gutters activate on wide screens.
	</Paragraph>

	<Paragraph>
		Check out the live demo - resize your browser to see the responsive scaling in action:
	</Paragraph>
	<BlogCard id="starter-template-demo" title="Starter Template" about="Click to view the live demo" href="https://marcus-adair.github.io/starter_template_svelte/" imgSrc={starterPic} hoverTitle="View Live Demo" openInNewTab/>

	<Paragraph>
		<span class="font-semibold">The Preprocessor:</span> I built a custom Svelte preprocessor that transforms
		CSS at build time. Wrap styles in <span class="italic">@responsive</span> and px values become <span class="italic">calc()</span>
		expressions that scale with viewport width. It uses CSS custom properties as breakpoint toggles - no runtime
		JS overhead. Use <span class="italic">@small</span> blocks for mobile-only styles below the 700px threshold.
	</Paragraph>

	<Paragraph>
		The other key piece is Capsize CSS. Fonts have built-in line-height and ascender/descender space that
		throws off alignment. Capsize trims that invisible space so text sits exactly where you expect. My
		template includes a custom <span class="italic">@text</span> directive that applies Capsize automatically.
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">GSAP + Page Transitions:</span> <Link href="https://gsap.com/">GSAP</Link> is
		installed with a custom <span class="italic">useGSAP()</span> hook that handles cleanup automatically and
		lets animations wait for custom preloader/page transitions to finish. The template includes Lenis for smooth
		scrolling and a preloader system - all configurable.
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">Spacing and Tailwind:</span> Responsive spacing variables (<span class="italic">--space-sm</span>,
		<span class="italic">--space-md</span>, etc.) are wired to Tailwind, so <span class="italic">gap-sm</span> and
		<span class="italic">rounded-md</span> scale automatically. The preprocessor requires regular CSS syntax, but
		Tailwind is available for quick utility work. Svelte keeps things close to vanilla HTML/CSS/JS.
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">Typography and Theming:</span> Complete type system (h1-h10, p1-p4) with Capsize
		metrics. Two-tier color system: primitive colors and semantic tokens (<span class="italic">--primary</span>,
		<span class="italic">--background</span>, etc.) for easy theming. Dark mode is stubbed out and ready.
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">Component Library:</span> UI primitives inspired by <Link href="https://shadcn-svelte.com/">shadcn-svelte</Link> -
		Button, Input, Textarea, Checkbox, Radio, Card, Badge, Separator. All responsive with shared CSS variables. Custom additions included
        like built-in labels on form fields, the Input component contains an optional clear button, tuning for Capsize control, etc.
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">Grid System:</span> N-column responsive grid (default 8) with scaling gaps and
		gutters that allow for defining if content lies on the grid and on which columns/gaps. Essential for matching Figma layouts.
	</Paragraph>

    <Paragraph>
		So, yeah - that is an intro to the template! I plan to use this in the future to built my own projects, and I want to
        do freelance work on the side to build sites for artists and small businesses. At the time of writing this I have not converted
        THIS website to use the template, but I plan to!
	</Paragraph>

	<Paragraph>
		It's on <Link href="https://github.com/Marcus-Adair/starter_template_svelte">GitHub</Link> as a template
		repo - click "Use this template" to start. The README covers everything in detail, so go read that for more
        info on the full set features in starter. If you're building a website give it a try!
	</Paragraph>
    
	<Signature
		name="Marcus"
		date="Oct. 13th, 2026"
	/>
</div>