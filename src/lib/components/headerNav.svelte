<script lang="ts">
    import { page } from "$app/state";
    import { HOVER_EXPAND_LARGE_TAILWIND_ANIMATION } from "$lib/consts/style";
    import { pageOptions } from "$lib/types/pageOptions";
    import { cn } from "$lib/utils";
    import { CodeXml, Coffee, Laptop } from "lucide-svelte";
    import gsap from "gsap";
    import { onMount } from "svelte";
    import { resolve } from "$app/paths";
	import SplitText from "gsap/SplitText";

    interface Props {
        homeDiv: HTMLDivElement;
        projectsDiv: HTMLDivElement;
        blogDiv: HTMLDivElement;
    }
    let { homeDiv = $bindable(), projectsDiv = $bindable(), blogDiv = $bindable() }: Props = $props();

    const isActive = (href: string, exactMatch: boolean) => {
        return exactMatch 
            ? page.url.pathname === href
            : page.url.pathname.includes(href.slice(1));
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
        <ol class="flex flex-row items-center gap-3.5 md:gap-4.5 transition-all font-bold">
            <li>
                <a 
                    href={resolve("/")} 
                    title="Home" 
                    class={cn(
                        "transition-all duration-300 ease-out hover:text-primary/80",
                        isActive("/", true) ? "text-primary" : "text-header-foreground"
                    )}
                    onmouseenter={() => splitTextTLs.home.play()}
                    onmouseleave={() => splitTextTLs.home.reverse()}
                >
                    <div class={cn("flex flex-col gap-1 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                        <Coffee size={28} />
                        <div bind:this={homeDiv} class="relative text-sm overflow-clip whitespace-nowrap">
                            <span class="split-text-home">
                                {pageOptions.home.toUpperCase()}
                            </span>
                            <span class="absolute inset-0 translate-y-[25px] split-text-home-2">{pageOptions.home.toUpperCase()}</span>
                        </div>
                    </div>
                </a>
            </li>

            <li>
                <a
                    href={resolve("/projects")}
                    title="Projects"
                    class={cn(
                        "transition-all duration-300 ease-out hover:text-primary/80",
                        isActive("/projects", false) ? "text-primary" : "text-header-foreground"
                    )}
                    onmouseenter={() => splitTextTLs.projects.play()}
                    onmouseleave={() => splitTextTLs.projects.reverse()}
                >
                    <div class={cn("flex flex-col gap-1 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                        <CodeXml size={28} />
                        <div bind:this={projectsDiv} class="relative text-sm overflow-clip whitespace-nowrap">
                            <span class="split-text-projects">
                                {pageOptions.projects.toUpperCase()}
                            </span>
                            <span class="absolute inset-0 translate-y-[25px] split-text-projects-2">{pageOptions.projects.toUpperCase()}</span>
                        </div>
                    </div>
                </a>
            </li>

            <li>
                <a
                    href={resolve("/blog")}
                    title="Blog"
                    class={cn(
                        "transition-all duration-300 ease-out hover:text-primary/80",
                        isActive("/blog", false) ? "text-primary" : "text-header-foreground"
                    )}
                    onmouseenter={() => splitTextTLs.blog.play()}
                    onmouseleave={() => splitTextTLs.blog.reverse()}
                >
                    <div class={cn("flex flex-col gap-1 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                        <Laptop size={28} />
                        <div bind:this={blogDiv} class="relative text-sm overflow-clip whitespace-nowrap">
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