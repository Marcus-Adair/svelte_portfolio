<script lang="ts">
    import headshot from '$lib/assets/marcus_headshot_small.jpeg';
    import coffee from '$lib/assets/hot-coffee.gif';
    import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Separator from '$lib/components/ui/separator.svelte';
	import { EMAIL_URL, GITHUB_URL, LINKED_IN_URL } from '$lib/config';
	import { CalendarDays,  Download, Github, History, LinkedinIcon, Mail } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
</script>

<svelte:head>
  <title>Home - Marcus Adair</title>
</svelte:head>

<div class="flex flex-col gap-6">
    <img src={headshot} alt="" class="w-24 h-24 rounded-full object-cover" />

    <div class="flex flex-row">
        <h1 class="text-4xl md:text-5xl font-bold mr-44 font-[Space_Grotesk]">Software engineer, computer scientist, and creative.</h1>

        <img src={coffee} alt="" class="w-24 h-24 " />
    </div>

    
    <Accordion type="single" class="w-full flex flex-row justify-end sm:mt-8 " value="intro">
        <Card class="text-card-foreground px-6 py-2 w-full">
       
            <AccordionItem value="intro">
                <AccordionTrigger>
                    <span class="text-lg text-primary">Hello world!</span>
                </AccordionTrigger>

                <AccordionContent class="flex flex-col gap-6">
                    <div>
                        <span>I am Marcus Adair, a software engineer based in Lehi, Utah. I work at  </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://www.safestreets.com/")} onkeydown={() => window.open("https://www.safestreets.com/")}>Safestreets</span>
                        <span>, a nationwide ADT equipment sales/installation company, building TypeScript-based web and mobile applications to support in-house business operations.</span>
                    </div>

                    <div>
                        <span>I earned my BS in Computer Science from the </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://www.utah.edu/")} onkeydown={() => window.open("https://www.utah.edu/")}>University of Utah</span>
                        <span>  in Spring 2023, and my MS in Computer Science in Spring 2025.</span>
                    </div>
                
                    <div>
                        <span>During the last year of my BS and throughout grad school, I worked as a research scientist at the </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://sci.utah.edu/")} onkeydown={() => window.open("https://sci.utah.edu/")}>Scientific Computing and Imaging (SCI) Institute</span>
                        <span> at the U of U, focusing on scientific workflows and full-stack applications.</span>
                    </div>

                    <span>I am passionate about building high-quality software!</span>
                </AccordionContent>

       
            </AccordionItem>
        </Card>
    </Accordion>
        
    <Separator class="mt-2"/>

    <div class="flex flex-row justify-between items-end">
    <!-- Right Col -->
    <div class="flex flex-row gap-6 text-muted-foreground ">
        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
              onclick={() => window.open(LINKED_IN_URL)} 
              onkeydown={() => window.open(LINKED_IN_URL)} 
              role="button" tabindex={1}
              title="LinkedIn"
        >
          <LinkedinIcon class="size-8"/>
        </div>

        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
          onclick={() => window.open(GITHUB_URL)} 
          onkeydown={() => window.open(GITHUB_URL)} 
          role="button" tabindex={1}
          title="GitHub"
        >
          <Github class="size-8"/>
        </div>
                
        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
              role="button" tabindex={1}
              title="Calendar"
        >
          <CalendarDays class="size-8"/>
        </div>
    
        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
              onclick={() => window.open('mailto:marcus.a.adair@gmail.com')} 
              onkeydown={() => window.open('mailto:marcus.a.adair@gmail.com')} 
              role="button" tabindex={1}
              title="Email"
        >
          <Mail class="size-8"/>
        </div>
      </div>

        <Button variant="outline" size="lg"  title="My Resume">
           Download Resume
           <Download></Download>
        </Button>    
    </div>



        <Accordion type="single" class="w-full flex flex-row justify-end mt-8 " value="false">
            <Card class="lg:w-[60%] w-[550px] px-6  py-2 ">
                <AccordionItem value="history">
                    <AccordionTrigger class="font-bold">
                        <div class="flex flex-row items-center gap-2 ">
                            <History/>
                            <span>History</span>                  
                        </div>
                    </AccordionTrigger>
                    <AccordionContent class="flex flex-col gap-2">
                        <Separator/>
                        <div class="flex flex-col gap-2">
                            {@render HistoryItem("SafeStreets", "Working as a Junior Sofware Engineer", "May 2025 - Present")}
            
                            {@render HistoryItem("Graduate with Masters", "Earn MS in Computer Science - 3.7/4.0 GPA", "May 2025")}
            
                            {@render HistoryItem("University of Oregon", "Internship as a Full-stack Developer", "May 2024 - Aug. 2024")}
            
                            {@render HistoryItem("Begin Graduate School", "Enrolled at the University of Utah", "Aug. 2023")}
            
                            {@render HistoryItem("Graduate with Bachelors", "Earn BS in Computer Science - 3.7/4.0 GPA", "May 2023")}
            
                            {@render HistoryItem("SCI Institute at the U of U", "Hired as an Undergraduate Research Assistant", "May 2022")}
            
                            {@render HistoryItem("Work various part-time jobs while studying", "Telesales Rep. & Fast-food Worker", "2017 - May 2022")}
            
                            {@render HistoryItem("Begin studying computer science at the U of U", "Student", "2017")}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Card>
        </Accordion>
</div>

{#snippet HistoryItem(title: string, subtitle: string, timeStr: string)}
<Accordion type="single" class="w-full" value={title}>
    <AccordionItem value={title}>
        <AccordionTrigger class="font-bold">{title}</AccordionTrigger>
        <AccordionContent class="flex flex-col gap-2">
            <span class="text-muted-foreground">{timeStr}</span>
            <span >{subtitle}</span>
            <Separator/>
        </AccordionContent>
    </AccordionItem>
</Accordion>
{/snippet}