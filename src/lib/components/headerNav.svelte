<script lang="ts">
    import { page } from "$app/state";
    import { HOVER_EXPAND_TAILWIND_ANIMATION } from "$lib/consts/style";
    import { pageOptions } from "$lib/types/pageOptions";
    import { cn } from "$lib/utils";
    import { BookOpen, CodeXml, Laptop } from "lucide-svelte";
    import Coffee from "./icons/Coffee.svelte";
    import gsap from "gsap";
	import { onMount } from "svelte";

    interface Props {
        navClass?: string;
    }
    let { navClass }: Props = $props();

    const navItems = [
        { 
            href: "/", 
            title: "Home", 
            label: pageOptions.home, 
            icon: Coffee,
            iconProps: { className: "h-[24px] w-auto -translate-y-[1px]" },
            exactMatch: true 
        },
        { 
            href: "/about", 
            title: "About", 
            label: pageOptions.about, 
            icon: BookOpen,
            iconProps: { size: 19 },
            exactMatch: false 
        },
        { 
            href: "/projects", 
            title: "Projects", 
            label: pageOptions.projects, 
            icon: CodeXml,
            iconProps: { size: 21 },
            exactMatch: false 
        },
        { 
            href: "/blog", 
            title: "Blog", 
            label: pageOptions.blog, 
            icon: Laptop,
            iconProps: { size: 21 },
            exactMatch: false 
        },
    ];

    const isActive = (href: string, exactMatch: boolean) => {
        return exactMatch 
            ? page.url.pathname === href
            : page.url.pathname.includes(href.slice(1));
    };


  // Underline animation ----- //
  const ANIMATION_EASE = "power1.inOut";
  const ANIMATION_DURATION = 0.225;
  function animateUnderlineEnter(anchorClass: string) {
    gsap.fromTo(
      `.${anchorClass}`,
      { width: 0 },
      {
        width: "100%",
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        onStart: () => {
          gsap.to(`.${anchorClass}`, { opacity: 1 });
        },
      }
    );
  }
  function animateUnderlineLeave(anchorClass: string) {
    gsap.to(`.${anchorClass}`, {
      width: 0,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
      onComplete: () => {
        gsap.to(`.${anchorClass}`, { opacity: 0 });
      },
    });
  } 

  onMount(() => {
    const tl = gsap.timeline();

    const DURATION = 0.4;
    const EASE = "power1.out";
    const OVERLAP = "-=0.325";
    const Y = -35;
    tl.from(".home-move", {
        y: Y,
        duration: DURATION,
        opacity: 0,
        ease: EASE,
      });
      tl.from(
        ".about-move",
        { y: Y, duration: DURATION, opacity: 0, ease: EASE },
        OVERLAP
      );
      tl.from(
        ".projects-move",
        { y: Y, duration: DURATION, opacity: 0, ease: EASE },
        OVERLAP
      );
      tl.from(
        ".blog-move",
        { y: Y, duration: DURATION, opacity: 0, ease: EASE },
        OVERLAP
      );
  });
</script>

<nav class={cn("flex flex-row justify-center", navClass)}>
    <ol class="flex flex-row items-center gap-8 transition-all font-[Space_Grotesk] text-xl font-bold">
        {#each navItems as item}
            {@render navItem(item)}
        {/each}
    </ol>
</nav>

{#snippet navItem(item: typeof navItems[0])}
    {@const itemTitle = item.title.toLowerCase()}
    {@const moveClass = `${itemTitle}-move`}    
    {@const underlineClass = `${itemTitle}-underline`}

    <li class={moveClass}>
        <a 
            href={item.href} 
            title={item.title} 
            class={cn(
                "transition-all duration-300 ease-out hover:text-primary/80",
                isActive(item.href, item.exactMatch)
                    ? "text-primary"
                    : "text-header-foreground"
            )}
            onmouseenter={() => animateUnderlineEnter(underlineClass)}
            onmouseleave={() => animateUnderlineLeave(underlineClass)}
        >
            <div class={cn("flex flex-row gap-2 items-center", HOVER_EXPAND_TAILWIND_ANIMATION)}>
                <item.icon {...item.iconProps} />
                <span>{item.label}</span>
            </div>
        </a>

        {@render Underline(underlineClass)}
    </li>
{/snippet}

{#snippet Underline(anchorClass: string)}
    <div class={`${anchorClass} w-full h-[1px] mt-[1px] bg-primary opacity-0`}></div>
{/snippet}