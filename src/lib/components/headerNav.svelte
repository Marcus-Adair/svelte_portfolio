<script lang="ts">
    import { page } from "$app/state";
    import { HOVER_EXPAND_LARGE_TAILWIND_ANIMATION } from "$lib/consts/style";
    import { pageOptions } from "$lib/types/pageOptions";
    import { cn } from "$lib/utils";
    import { BookOpen, CodeXml, Coffee, Laptop } from "lucide-svelte";
    import gsap from "gsap";
    import { onMount } from "svelte";
    import { resolve } from "$app/paths";
	import SplitText from "gsap/SplitText";

    interface Props {
        homeDiv: HTMLDivElement;
        aboutDiv: HTMLDivElement;
        projectsDiv: HTMLDivElement;
        blogDiv: HTMLDivElement;
    }
    let { homeDiv = $bindable(), aboutDiv = $bindable(), projectsDiv = $bindable(), blogDiv = $bindable() }: Props = $props();

    const isActive = (href: string, exactMatch: boolean) => {
        return exactMatch 
            ? page.url.pathname === href
            : page.url.pathname.includes(href.slice(1));
    };

    const navOptions = Object.keys(pageOptions);
    const splitTextTLs: Record<string, gsap.core.Timeline> = {};

    onMount(() => {
        gsap.registerPlugin(SplitText);

        const SPLIT_ANIM = { y: -25, duration: 0.2, stagger: 0.03, ease: "power1.out" };
        (navOptions).forEach(name => {
            const split1 = SplitText.create(`.split-text-${name}`, { type: "chars" });
            const split2 = SplitText.create(`.split-text-${name}-2`, { type: "chars" });
            splitTextTLs[name] = gsap.timeline({ paused: true })
                .to(split1.chars, SPLIT_ANIM)
                .to(split2.chars, SPLIT_ANIM, 0);
        });

        // Page load fall-in animation
        const fallTl = gsap.timeline();
        const ANIM = { y: -35, duration: 0.4, opacity: 0, ease: "power1.out" };
        const OVERLAP = "-=0.325";

        navOptions.forEach((name, i) => {
            fallTl.from(`.${name}-move`, ANIM, i === 0 ? undefined : OVERLAP);
        });
    });
</script>

<nav class="flex flex-row justify-center">
  <ol class="flex flex-row items-center gap-8 transition-all font-[Space_Grotesk] text-xl font-bold">
      <li class="home-move">
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
            <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <Coffee size={30} />
                  <div bind:this={homeDiv} class="relative text-base md:text-lg overflow-clip">
                    <span class="split-text-home">
                        {pageOptions.home}
                    </span>
                    <span class="absolute inset-0 translate-y-[25px] split-text-home-2">{pageOptions.home}</span>
                  </div>
            </div>
          </a>
      </li>

      <li class="about-move">
          <a
              href={resolve("/about")}
              title="About"
              class={cn(
                  "transition-all duration-300 ease-out hover:text-primary/80",
                  isActive("/about", false) ? "text-primary" : "text-header-foreground"
              )}
              onmouseenter={() => splitTextTLs.about.play()}
              onmouseleave={() => splitTextTLs.about.reverse()}
          >
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <BookOpen size={30} />
                  <div bind:this={aboutDiv} class="relative text-base md:text-lg overflow-clip">
                    <span class="split-text-about">
                        {pageOptions.about}
                    </span>
                    <span class="absolute inset-0 translate-y-[25px] split-text-about-2">{pageOptions.about}</span>
                  </div>
              </div>
          </a>
      </li>

      <li class="projects-move">
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
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <CodeXml size={30} />
                  <div bind:this={projectsDiv} class="relative text-base md:text-lg overflow-clip">
                    <span class="split-text-projects">
                        {pageOptions.projects}
                    </span>
                    <span class="absolute inset-0 translate-y-[25px] split-text-projects-2">{pageOptions.projects}</span>
                  </div>
              </div>
          </a>
      </li>

      <li class="blog-move">
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
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <Laptop size={30} />
                  <div bind:this={blogDiv} class="relative text-base md:text-lg overflow-clip">
                    <span class="split-text-blog">
                        {pageOptions.blog}
                    </span>
                    <span class="absolute inset-0 translate-y-[25px] split-text-blog-2">{pageOptions.blog}</span>
                  </div>
              </div>
          </a>
      </li>
  </ol>
</nav>