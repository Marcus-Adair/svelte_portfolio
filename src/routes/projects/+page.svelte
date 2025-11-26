<script lang="ts">
	import Separator from '$lib/components/ui/separator.svelte';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
	import { cn } from '$lib/utils';
	import odfDashPic from '$lib/assets/ODF_dash_pic_2.png';
	import elm2048pic from '$lib/assets/ELM_2048_pic.png';
	import fqsPaperPic from '$lib/assets/ODF_git_paper_2.png';
	import sedePic from '$lib/assets/SEDE_screenshot.png';
	import alpsPic from '$lib/assets/alps_git_repo_screenshot.png';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Link from '$lib/components/link.svelte';
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>


<div class="flex flex-col gap-6">
	<h1 class="mr-44 text-4xl md:text-5xl">Projects</h1>

	<div class="flex flex-col gap-2">
		<span class="text-sm text-muted-foreground">Noteable projects I've worked on:</span>
		<Separator />
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- TODO: add this website -->
		{@render ProjectCard(
			'On-Demand Fakequakes',
			'/projects/odf',
			odfDashPic,
			"For my MS project, and while working at the SCI Institute, I developed On-Demand Fakequakes - a Python-based, full-stack web application (Python Plotly Dash, Flask) featuring an AWS Cloud workflow, a complex front-end map interface, a CI/CD pipeline using GitHub actions, and more."
		)}
		{@render ProjectCard(
			'ELM 2048',
			'https://marcus-adair.github.io/ELM_2048/',
			elm2048pic,
			'For a Functional Programming graduate-level course in Spring 2024, I recreated the classic game 2048 using ELM, a fully-functional programming language (similar to Haskell) that compiles to JavaScript for creating UIs.'
		)}
		{@render ProjectCard(
			'ALPS',
			'https://github.com/Marcus-Adair/alps_project',
			alpsPic,
			'I developed a Python CLI tool called ALPS (Automatic Least-Privilege Policy Suggestor) for a graduate Software & Systems Security course. ALPS parses AWS infrastructure code, identifies insecure IAM policies, and suggests alternatives.'
		)}
		<div>
			<a href="https://github.com/Marcus-Adair/Accelerating-Data-Intensive-Seismic-Research-Through-Parallel-Workflow-Optimization-and-Federated-CI" target="_blank" rel="noreferrer" class="flex flex-col gap-2 text-center">
				<Card class={cn('p-1.5', HOVER_EXPAND_TAILWIND_ANIMATION)}>
					<img
						src={fqsPaperPic}
						alt="fdw_pic"
						class="border-card aspect-video w-full cursor-pointer overflow-hidden rounded-md border"
					/>
				</Card>
			</a>
			<Accordion type="single" class="w-full" value="fdw">
				<AccordionItem value="fdw">
					<AccordionTrigger class="text-lg font-bold">Fakequakes DAGMan Workflow (FDW)</AccordionTrigger>
					<AccordionContent>
						<div class="flex flex-col gap-3">
							<span>While serving as an undergraduate research assistant, I developed FDW, a high-throughput workflow utilizing Bash, Python, Singularity (containerization), and more. FDW significantly accelerated premier earthquake simulation software using the <Link href="https://osg-htc.org/">Open Science Grid</Link>. The work resulted in a paper accepted at an SC23 workshop and published by the ACM.</span>
							<Separator />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
		{@render ProjectCard(
			'Spatial Enrichment Data Engine (SEDE)',
			'https://drive.google.com/drive/folders/1p6R3zL03XLPOm3x2jNea5T9apxR6reDN?usp=sharing',
			sedePic,
			'I served as the front-end lead on a geocoding web application developed for my BS senior capstone project in collaboration with Idaho National Laboratory. I developed web components, harnessed an API to create a custom map interface, and more. The front-end was built with TypeScript, Angular, HTML, and CSS, and the back-end was .NET-based and written in C#.'
		)}
	</div>
</div>

{#snippet ProjectCard(title: string, url: string, imgSrc: any, description?: string)}
	<div>
		<a href={url} target={url.startsWith("/") ? "" : "_blank"} rel={url.startsWith("/") ? "" : "noreferrer"} class="flex flex-col gap-2 text-center">
			<Card class={cn('p-1.5', HOVER_EXPAND_TAILWIND_ANIMATION)}>
				<img
					src={imgSrc}
					alt={title}
					class="border-card aspect-video w-full cursor-pointer overflow-hidden rounded-md border"
				/>
			</Card>
		</a>
		<Accordion type="single" class="w-full" value={title}>
			<AccordionItem value={title}>
				<AccordionTrigger class="text-lg font-bold">{title}</AccordionTrigger>
				<AccordionContent>
					<div class="flex flex-col gap-3">
						<span>{description}</span>
						<Separator />
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
{/snippet}
