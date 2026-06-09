<script lang="ts">
    import { page } from "$app/state";
    import { pageOptions } from "$lib/types/pageOptions";
    import { cn } from "$lib/utils";
    import { CodeXml, Coffee, FileText, Laptop } from "lucide-svelte";
    import resume from "$lib/assets/Marcus_Adair_Portfolio_Resume.pdf";
    import gsap from "gsap";
    import { onMount } from "svelte";
    import { resolve } from "$app/paths";
	import SplitText from "gsap/SplitText";
    import { getPendingPath } from "$lib/stores/navigation.svelte";

    interface Props {
        homeDiv: HTMLDivElement;
        projectsDiv: HTMLDivElement;
        blogDiv: HTMLDivElement;
        resumeDiv: HTMLDivElement;
    }
    let {
        homeDiv = $bindable(),
        projectsDiv = $bindable(),
        blogDiv = $bindable(),
        resumeDiv = $bindable()
    }: Props = $props();

    const isActive = (href: string, exactMatch: boolean) => {
        const currentPath = getPendingPath() ?? page.url.pathname;
        return exactMatch
            ? currentPath === href
            : currentPath.includes(href.slice(1));
    };

    const navOptions = Object.keys(pageOptions);
    const splitTextTLs: Record<string, gsap.core.Timeline> = {};

    onMount(() => {
        gsap.registerPlugin(SplitText);

        // SplitText animations
        const SPLIT_ANIM = { y: -25, duration: 0.225, stagger: 0.04, ease: "power1.out" };
        (navOptions).forEach(name => {
            const split1 = SplitText.create(`.split-text-${name}`, { type: "chars" });
            const split2 = SplitText.create(`.split-text-${name}-2`, { type: "chars" });
            splitTextTLs[name] = gsap.timeline({ paused: true })
                .to(split1.chars, SPLIT_ANIM)
                .to(split2.chars, SPLIT_ANIM, 0);
        });
    });
</script>

<nav class="flex flex-row justify-center">
    <ol class="flex flex-row items-end gap-0 text-[0.85rem] tracking-wider font-bold">
        <li class="min-w-[5rem] flex justify-center">
            <a
                href={resolve("/")}
                title={pageOptions.home.toUpperCase()}
                class={cn(
                    "transition-colors duration-300 ease-out hover:text-primary active:text-primary-active",
                    isActive("/", true) ? "text-primary" : "text-header-foreground"
                )}
                onmouseenter={() => splitTextTLs.home.play()}
                onmouseleave={() => splitTextTLs.home.reverse()}
            >
                <div class={cn("flex flex-col gap-1 items-center")}>
                    <Coffee size={28} />
                    <div bind:this={homeDiv} class="relative overflow-clip whitespace-nowrap">
                        <span class="split-text-home">
                            {pageOptions.home.toUpperCase()}
                        </span>
                        <span class="absolute inset-0 translate-y-[25px] split-text-home-2">{pageOptions.home.toUpperCase()}</span>
                    </div>
                </div>
            </a>
        </li>

        <li class="min-w-[5rem] flex justify-center">
            <a
                href={resolve("/projects")}
                title={pageOptions.projects.toUpperCase()}
                class={cn(
                    "transition-colors duration-300 ease-out hover:text-primary active:text-primary-active",
                    isActive("/projects", false) ? "text-primary" : "text-header-foreground"
                )}
                onmouseenter={() => splitTextTLs.projects.play()}
                onmouseleave={() => splitTextTLs.projects.reverse()}
            >
                <div class={cn("flex flex-col gap-1 items-center")}>
                    <CodeXml size={28} />
                    <div bind:this={projectsDiv} class="relative overflow-clip whitespace-nowrap">
                        <span class="split-text-projects">
                            {pageOptions.projects.toUpperCase()}
                        </span>
                        <span class="absolute inset-0 translate-y-[25px] split-text-projects-2">{pageOptions.projects.toUpperCase()}</span>
                    </div>
                </div>
            </a>
        </li>

        <li class="min-w-[5rem] flex justify-center">
            <a
                href={resume}
                rel="external"
                target="_blank"
                title={pageOptions.resume.toUpperCase()}
                class={cn(
                    "transition-colors duration-300 ease-out hover:text-primary active:text-primary-active",
                    "text-header-foreground"
                )}
                onmouseenter={() => splitTextTLs.resume.play()}
                onmouseleave={() => splitTextTLs.resume.reverse()}
            >
                <div class={cn("flex flex-col gap-1 items-center")}>
                    <FileText size={24} class="-translate-y-[1.5px]" />
                    <div bind:this={resumeDiv} class="relative overflow-clip whitespace-nowrap">
                        <span class="split-text-resume">
                            {pageOptions.resume.toUpperCase()}
                        </span>
                        <span class="absolute inset-0 translate-y-[25px] split-text-resume-2">{pageOptions.resume.toUpperCase()}</span>
                    </div>
                </div>
            </a>
        </li>
        
        <li class="min-w-[5rem] flex justify-center">
            <a
                href={resolve("/blog")}
                title={pageOptions.blog.toUpperCase()}
                class={cn(
                    "transition-colors duration-300 ease-out hover:text-primary active:text-primary-active",
                    isActive("/blog", false) ? "text-primary" : "text-header-foreground"
                )}
                onmouseenter={() => splitTextTLs.blog.play()}
                onmouseleave={() => splitTextTLs.blog.reverse()}
            >
                <div class={cn("flex flex-col gap-1 items-center")}>
                    <Laptop size={28} />
                    <div bind:this={blogDiv} class="relative overflow-clip whitespace-nowrap">
                        <span class="split-text-blog">
                            {pageOptions.blog.toUpperCase()}
                        </span>
                        <span class="absolute inset-0 translate-y-[25px] split-text-blog-2">{pageOptions.blog.toUpperCase()}</span>
                    </div>
                </div>
            </a>
        </li>
    </ol>
</nav>