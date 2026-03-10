<script lang="ts">
	import Link from "$lib/components/link.svelte";
	import BlogCard from "../_components/blogCard.svelte";
	import Paragraph from "../_components/paragraph.svelte";
	import PostHeader from "../_components/postHeader.svelte";
	import Signature from "../_components/signature.svelte";
	import easyScrumPic from '$lib/assets/easy-scrum_pic.png';

	const DATE = new Date("2026-03-08T06:00:00.000Z")
</script>

<svelte:head>
  <title>Blog - Easy-Scrum • Marcus Adair</title>
</svelte:head>

<div class="flex flex-col gap-4">
	<PostHeader date={DATE} postNum={4} title="I Made a Simple, Collaborative Scrum App"/>

	<Paragraph>
		I recently was inspired to build a simple scrum board app for writing notes and moving them between statuses. 
		I wanted to make something simple that could be used quickly, and an app that included collaboration features.
		I was inspired by <Link href="https://www.when2meet.com/">when2meet.com</Link>, an awesome site that I've used
		a lot in the past to coordinate meeting times with remote people. So, I created Easy-Scrum; it is essentially 
		a simple scrum board app, or a more advanced TODO app, with the ability to send scrum session links to people
		to collaborate on notes and make comments.
	</Paragraph>

	<Paragraph>
		Check out the app here:
	</Paragraph>
	<BlogCard id="easy-scrum-app" title="Easy-Scrum" about="Click to try it!" href="https://easyscrum.net" imgSrc={easyScrumPic} hoverTitle="Visit Easy-Scrum" openInNewTab/>


	<Paragraph>
		<span class="font-semibold">How It Works:</span> Easy-Scrum lets you create a scrum session, add topics
		(boards), and post notes under each topic. Notes can have categories for color-coding, and you can add comments
		for discussion. There's a simple sign-in system - just pick a name and optionally set a password.
		You can reorder/recolor topics and notes, and everything persists in the database.
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">The Tech Stack:</span> I went for Svelte, Tailwind CSS, and shadcn-svelte for the front-end.
		For the backend, I used PostgreSQL with Drizzle ORM. To deploy I simply bought a domain through GoDaddy, deployed through
		Railway (and configured DNS records there), and set up a production database through Supabase. The domain cost around 15$,
		and will continue to cost money every year, but other than that I believe I won't surpass the free tier on Railway or Supabase
	</Paragraph>

	<Paragraph>
		<span class="font-semibold">Claude Code for Rapid Development:</span> I've been using Claude Code for aiding my development, and it is incredible
		powerful. It is so amazing to have AI live in my terminal and be able to read/write files. After setting up the database schematics, and 
		building out a lot of the front-end by hand (to get it looking right), and wiring up just 2 buttons to the back-end, I told Claude Code to finish the 
		rest of the app and wire up all the buttons - and it did. I love using Claude Code to write code for me following existing patterns that I've
		established. Web development is so easy these days and it will be interesting to see where things go!
	</Paragraph>

	<Signature
		name="- Marcus,"
		date="Mar. 8th, 2026"
	/>
</div>
