<script lang="ts">
	import odfDashPic from '$lib/assets/ODF_dash_pic_2.png';
	import elm2048pic from '$lib/assets/ELM_2048_pic.png';
	import fqsPaperPic from '$lib/assets/ODF_git_paper_2.png';
	import sedePic from '$lib/assets/SEDE_screenshot.png';
	import alpsPic from '$lib/assets/alps_git_repo_screenshot.png';
	import portfolioPicV2 from '$lib/assets/portfolio_pic_v2.png';
	import svelte2048pic from '$lib/assets/svelte_2048_pic.png';
	import tweakcnClonePic from '$lib/assets/tweakcn_clone_pic.png'
	import Link from '$lib/components/link.svelte';
	import ProjectCard from './components/projectCard.svelte';
	import gsap from "gsap";
	import { onMount } from 'svelte';
	import AnimatedSeparator from '$lib/components/animatedSeparator.svelte';


	let tweakcnCloneDiv: HTMLDivElement;
	let svelte2048Div: HTMLDivElement;
	let portfolioDiv: HTMLDivElement;
	let odfDiv: HTMLDivElement;
	let elm2048Div: HTMLDivElement;
	let alpsDiv: HTMLDivElement;
	let fdwDiv: HTMLDivElement;
	let sedeDiv: HTMLDivElement;
	onMount(() => {
		gsap.fromTo(
			".animate-text-in",
			{ x: -350},
			{ x: 0, duration: 0.26, ease: "power1.out" }
		);

		const ANIM = { y: 40, duration:0.2, opacity: 0,  ease: "power1.out" };
		const OVERLAP = "-=0.12"; 

		const tl = gsap.timeline();
		tl.from(tweakcnCloneDiv, ANIM);
		tl.from(svelte2048Div, ANIM, OVERLAP);
		tl.from(portfolioDiv, ANIM, OVERLAP);
		tl.from(odfDiv, ANIM, OVERLAP);
		tl.from(elm2048Div, ANIM, OVERLAP);
		tl.from(alpsDiv, ANIM, OVERLAP);
		tl.from(fdwDiv, ANIM, OVERLAP);
		tl.from(sedeDiv, ANIM, OVERLAP);
	});
</script>

<svelte:head>
  <title>Projects • Marcus Adair</title>
</svelte:head>

<div class="flex flex-col gap-6">
	<h1 class="mr-44 text-4xl md:text-5xl animate-text-in">Projects</h1>

	<div class="flex flex-col gap-2">
		<span class="text-sm text-muted-foreground animate-text-in tracking-widest font-light">Notable projects:</span>
		<AnimatedSeparator />
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">

		<ProjectCard
			bind:divElt={tweakcnCloneDiv}
			title='tweakcn_clone'
			url="https://marcus-adair.github.io/tweakcn_clone/#theme-presets"
			src={tweakcnClonePic}
			alt="tweakcn_clone_pic"
			description="I built a clone of the front-end dashboard for tweakcn.com using TypeScript, Svelte, shadcn-svelte, TailWind CSS, and GSAP. Challenges included the various animations and advanced, animated theme switcher."
		/>

		<ProjectCard
			bind:divElt={svelte2048Div}
			title='Svelte 2048'
			url="https://marcus-adair.github.io/svelte_2048/"
			src={svelte2048pic}
			alt="svelte_2048_pic"
			description="I recreated the 2048 sliding tile game using TypeScript, Svelte, Tailwind CSS, and GSAP. The app is fully animated, includes themes, and is deployed using GitHub Pages."
		/>

		<ProjectCard
			bind:divElt={portfolioDiv}
			title='My Portfolio (marcusadair.com)'
			url="https://github.com/Marcus-Adair/svelte_portfolio"
			src={portfolioPicV2}
			alt="portfolio_visual"
			description="My evolving personal website and dev portfolio. This site serves to showcase my skills and experience and to also be a playground for me to program fun stuff. Built with TypeScript, SvelteKit, Tailwind, GSAP, and more."
		/>

		<ProjectCard
			bind:divElt={odfDiv}
			title='On-Demand FakeQuakes'
			url='/projects/odf'
			src={odfDashPic}
			alt="odf_pic"
			description="For my MS project, and while working at the SCI Institute, I developed On-Demand FakeQuakes - a Python-based, full-stack web application (Python Plotly Dash, Flask) featuring an AWS Cloud workflow, a complex front-end map interface, a CI/CD pipeline using GitHub actions, and more."
		/>

		<ProjectCard
			bind:divElt={elm2048Div}
			title='ELM 2048'
			url='https://marcus-adair.github.io/ELM_2048/'
			src={elm2048pic}
			alt='elm_2048_pic'
			description='For a Functional Programming graduate-level course in Spring 2024, I recreated the classic game 2048 using ELM, a fully-functional programming language (similar to Haskell) that compiles to JavaScript for creating UIs.'
		/>

		<ProjectCard
			bind:divElt={alpsDiv}
			title='ALPS'
			url='https://github.com/Marcus-Adair/alps_project'
			src={alpsPic}
			alt='alps_pic'
			description='I developed a Python CLI tool called ALPS (Automatic Least-Privilege Policy "Suggester") for a graduate Software & Systems Security course. ALPS parses AWS infrastructure code, identifies insecure IAM policies, and suggests alternatives.'
		/>

		<ProjectCard
			bind:divElt={fdwDiv}
			title='FakeQuakes DAGMan Workflow (FDW)'
			url="https://github.com/Marcus-Adair/Accelerating-Data-Intensive-Seismic-Research-Through-Parallel-Workflow-Optimization-and-Federated-CI"
			src={fqsPaperPic}
			alt='fdw_pic'
			description={FdwDescription}
		/>

		<ProjectCard
			bind:divElt={sedeDiv}
			title='Spatial Enrichment Data Engine (SEDE)'
			url='https://drive.google.com/drive/folders/1p6R3zL03XLPOm3x2jNea5T9apxR6reDN?usp=sharing'
			src={sedePic}
			alt='sede_pic'
			description='I served as the front-end lead on a geocoding web application developed for my BS senior capstone project in collaboration with Idaho National Laboratory. I developed web components, harnessed an API to create a custom map interface, and more. The front-end was built with TypeScript, Angular, HTML, and CSS, and the back-end was .NET-based and written in C#.'
		/>
	</div>
</div>

{#snippet FdwDescription()}
	<span class="text-sm">While serving as an undergraduate research assistant, I developed FDW, a high-throughput workflow utilizing Bash, Python, Singularity (containerization), and more. FDW significantly accelerated premier earthquake simulation software using the <Link href="https://osg-htc.org/">Open Science Grid</Link>. The work resulted in a paper accepted at an SC23 workshop and published by the ACM.</span>
{/snippet}