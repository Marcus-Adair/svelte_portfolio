<script lang="ts">
	import Separator from "$lib/components/ui/separator.svelte";
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
	import { cn } from "$lib/utils";
	import odfDashPic from "$lib/assets/ODF_dash_pic_2.png";
	import elm2048pic from "$lib/assets/ELM_2048_pic.png";
	import fqsPaperPic from "$lib/assets/ODF_git_paper_2.png";
	import sedePic from "$lib/assets/SEDE_screenshot.png";
	import alpsPic from "$lib/assets/alps_git_repo_screenshot.png";
	import Accordion from "$lib/components/ui/accordion/accordion.svelte";
	import AccordionItem from "$lib/components/ui/accordion/accordion-item.svelte";
	import AccordionTrigger from "$lib/components/ui/accordion/accordion-trigger.svelte";
	import AccordionContent from "$lib/components/ui/accordion/accordion-content.svelte";
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col gap-4">
		<h1 class="text-4xl md:text-5xl font-bold mr-44 font-[Space_Grotesk]">Projects</h1>
		<span>Projects I've worked on:</span>
		<Separator />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		{@render ProjectCard("On-Demand Fakequakes", "https://ondemandfakequakes.org", odfDashPic, "TODO")}
		{@render ProjectCard("ELM 2048", "https://marcus-adair.github.io/ELM_2048/", elm2048pic, "TODO")}
		{@render ProjectCard("ALPS", "https://github.com/Marcus-Adair/alps_project", alpsPic, "TODO")}
		{@render ProjectCard(
			"Spatial Enrichment Data Engine (SEDE)",
			"https://drive.google.com/drive/folders/1p6R3zL03XLPOm3x2jNea5T9apxR6reDN?usp=sharing",
			sedePic, "TODO"
		)}
		{@render ProjectCard(
			"Fakequakes DAGMan Workflow",
			"https://github.com/Marcus-Adair/Accelerating-Data-Intensive-Seismic-Research-Through-Parallel-Workflow-Optimization-and-Federated-CI",
			fqsPaperPic, "TODO"
		)}
	</div>
</div>

{#snippet ProjectCard(title: string, url: string, imgSrc: any, description?: string)}
	<div>
		<a
			href={url}
			target="_blank"
			rel="noreferrer"
			class="flex flex-col gap-2 text-center"
		>
			<img src={imgSrc} alt={title}
			class={cn(
				"rounded-md w-full aspect-[16/10] cursor-pointer overflow-hidden",
				HOVER_EXPAND_TAILWIND_ANIMATION
			)}
			/>
		</a>
		<Accordion type="single" class="w-full" value={title} >
			<AccordionItem value={title}>
				<AccordionTrigger class="font-bold text-lg">{title}</AccordionTrigger>
				<AccordionContent>
					<span>{description}</span>
					<Separator/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>

{/snippet}
