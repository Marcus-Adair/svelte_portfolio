<script lang="ts">
    import headshot from '$lib/assets/marcus_headshot_small.jpeg';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Separator from '$lib/components/ui/separator.svelte';
	import { CalendarDays, ChevronDown, ChevronUp, Download, Github, History, LinkedinIcon } from 'lucide-svelte';

    let historyOpen = $state(true)
</script>

<div class="flex flex-col gap-6">
    <img src={headshot} alt="" class="w-26 h-26 rounded-full object-cover border-3 border-accent-foreground" />

    <h1 class="text-2xl md:text-5xl font-bold">Software engineer, computer scientist, and creative.</h1>

    <Card class="text-muted-foreground p-6">
        <span class="text-lg">Hello!</span>

        <span>I'm Marcus, a software engineer from Lehi, Utah. I work at Safestreets, a nationwide ADT equipment sales/installation company, building TypeScript-based web and mobile applications to support business operations.</span>
    
        <span>I earned my BS in Computer Science from the University of Utah in Spring 2023, and my MS in Computer Science in Spring 2025.</span>
    
        <div>
            <span>During the last year of my BS and throughout grad school, I worked as a research scientist at the </span>
            <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://sci.utah.edu/")} onkeydown={() => window.open("https://sci.utah.edu/")}>Scientific Computing and Imaging (SCI) Institute</span>
            <span> at the U of U, focusing on high-throughput scientific workflows and full-stack applications.</span>
        </div>

        <span>I am passionate about building high-quality software!</span>
    </Card>
    
    <Separator/>

    <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-4">
            <Button size="icon-lg" variant="ghost" onclick={() => window.open("https://www.linkedin.com/in/marcus-adair-a46aa917a/")}>
                <LinkedinIcon class="size-8 text-muted-foreground"/>
            </Button>

            <Button size="icon-lg" variant="ghost" onclick={() => window.open("https://github.com/Marcus-Adair")}>
                <Github class="size-8 text-muted-foreground"/>
            </Button>


            <Button size="icon-lg" variant="ghost">
                <CalendarDays class="size-8 text-muted-foreground"/>
            </Button>        
        </div>



        <Button variant="outline" size="lg">
           Download Resume
           <Download></Download>
        </Button>    
    </div>




    <div class="flex flex-row justify-end mt-8">
        <Card class="w-[550px] p-6">
            <div class="flex flex-row items-center justify-between cursor-pointer"
                onclick={() => historyOpen = !historyOpen}
                onkeydown={() => historyOpen = !historyOpen}
                tabindex={1}
                role="menu"
            >
                <div class="flex flex-row items-center gap-2 ">
                    <History/>
                    <span>History</span>                  
                </div>

                {#if historyOpen}
                    <ChevronUp/>
                {:else}
                    <ChevronDown/>
                {/if}
            </div>

            {#if historyOpen}
                <Separator/>

                <div class="flex flex-col gap-12">
                    
                    {@render HistoryItem("SafeStreets", "Junior Sofware Engineer", "May 2025 - Present")}

                    {@render HistoryItem("Graduate with MS in Computer Science", "", "May 2025")}

                    {@render HistoryItem("Internship at the University of Oregon", "Full-stack developer", "May 2024 - Aug. 2024")}

                    {@render HistoryItem("Enter graduate school & become grad. researcher", "", "Aug. 2023")}

                    {@render HistoryItem("Graduate with BS in Computer Science", "", "May 2023")}

                    {@render HistoryItem("Hired at SCI Institute", "Undergraduate Research Assistant", "May 2022")}

                    {@render HistoryItem("Graduate highschool and begin studying computer science at the U of U", "Undergraduate Research Assistant", "2017")}
                </div>
            {/if}
        </Card>
        
    </div>
</div>
<!-- <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->



{#snippet HistoryItem(title: string, subtitle: string, timeStr: string)}
<div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-1 justify-self-start">
        <span class="font-medium">{title}</span>
        <span class="font-light text-muted-foreground">{subtitle}</span>
    </div>

    <span class="text-muted-foreground justify-self-end">{timeStr}</span>
</div>
    
{/snippet}