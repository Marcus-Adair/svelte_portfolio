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
	import { CAL_EMAIL, EMAIL_URL, GITHUB_URL, LINKED_IN_URL } from '$lib/config';
	import { CalendarDays,  Download, Github, History, LinkedinIcon, Mail } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { HOVER_EXPAND_TAILWIND_ANIMATION } from '$lib/consts/style';
    // import safestreets_logo from "$lib/assets/safestreets_logo.png"
</script>

<svelte:head>
  <title>Home - Marcus Adair</title>
</svelte:head>

<div class="flex flex-col gap-6">
    <img src={headshot} alt="" class="w-24 h-24 rounded-full object-cover" />

    <div class="flex flex-row">
        <h1 class="text-4xl md:text-5xl font-bold lg:mr-44 font-[Space_Grotesk]">Software Engineer, Computer Scientist, and Creative.</h1>
        <img src={coffee} alt="coffee_image" class="w-24 h-24 " />
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
                        <span>- a nationwide ADT equipment sales/installation company, building TypeScript-based web and mobile applications supporting internal business operations.</span>
                    </div>

                    <div>
                        <span>I earned my BS in Computer Science from the </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://www.utah.edu/")} onkeydown={() => window.open("https://www.utah.edu/")}>University of Utah</span>
                        <span>(U of U) in Spring 2023, and my MS in Computer Science in Spring 2025.</span>
                    </div>
                
                    <div>
                        <span>During the last year of my BS and throughout grad. school, I worked as a research scientist at the </span>
                        <span class="font-semibold cursor-pointer text-primary" role="button" tabindex={1} onclick={() => window.open("https://sci.utah.edu/")} onkeydown={() => window.open("https://sci.utah.edu/")}>Scientific Computing and Imaging Institute</span>
                        <span> at the U of U, focusing on scientific workflows and full-stack applications.</span>
                    </div>
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
          <LinkedinIcon class="size-7"/>
        </div>

        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
          onclick={() => window.open(GITHUB_URL)} 
          onkeydown={() => window.open(GITHUB_URL)} 
          role="button" tabindex={1}
          title="GitHub"
        >
          <Github class="size-7"/>
        </div>
                
        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
              onclick={() => window.open(CAL_EMAIL)} 
              onkeydown={() => window.open(CAL_EMAIL)} 
              role="button" tabindex={1}
              title="Calendar"
        >
          <CalendarDays class="size-7"/>
        </div>
    
        <div class={cn("hover:text-ring cursor-pointer transition-colors", HOVER_EXPAND_TAILWIND_ANIMATION)}
              onclick={() => window.open(EMAIL_URL)} 
              onkeydown={() => window.open(EMAIL_URL)} 
              role="button" tabindex={1}
              title="Email"
        >
          <Mail class="size-7"/>
        </div>
      </div>

        <Button variant="outline" size="lg"  title="My Resume">
           <span class="hidden sm:flex">Download Resume</span>
           <Download/>
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
                            {@render HistoryItem("SafeStreets", "Junior Sofware Engineer", "May 2025 - Present")}
            
                            {@render HistoryItem("Graduate with Masters", "MS in Computer Science - 3.7/4.0 GPA", "May 2025")}
            
                            {@render HistoryItem("University of Oregon", "Internship as a Full-stack Developer", "May 2024 - Aug. 2024")}
            
                            {@render HistoryItem("Begin graduate school at the U of U", "Graduate Research Assistant at the SCI Institute", "Aug. 2023")}
            
                            {@render HistoryItem("Graduate with Bachelors", "BS in Computer Science - 3.7/4.0 GPA", "May 2023")}
            
                            {@render HistoryItem("SCI Institute at the U of U", "Undergraduate Research Assistant", "May 2022")}
            
                            {@render HistoryItem("Work various jobs while studying", "Telesales Rep. & Fast-food Worker", "2017 - May 2022")}
            
                            {@render HistoryItem("Begin studying Computer Science at the U of U", "Student", "2017")}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Card>
        </Accordion>
</div>

{#snippet HistoryItem(title: string, subtitle: string, timeStr: string, imagSrc?: any)}
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