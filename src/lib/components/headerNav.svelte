<script lang="ts">
  import { page } from "$app/state";
  import { HOVER_EXPAND_LARGE_TAILWIND_ANIMATION } from "$lib/consts/style";
  import { pageOptions } from "$lib/types/pageOptions";
  import { cn } from "$lib/utils";
  import { BookOpen, CodeXml, Coffee, Laptop } from "lucide-svelte";
  import gsap from "gsap";
  import { onMount } from "svelte";

  interface Props {
      homeSpan: HTMLSpanElement;
      aboutSpan: HTMLSpanElement;
      projectsSpan: HTMLSpanElement;
      blogSpan: HTMLSpanElement;
  }
  let { homeSpan = $bindable(), aboutSpan = $bindable(), projectsSpan = $bindable(), blogSpan = $bindable() }: Props = $props();

  const isActive = (href: string, exactMatch: boolean) => {
      return exactMatch 
          ? page.url.pathname === href
          : page.url.pathname.includes(href.slice(1));
  };

  onMount(() => {
      const tl = gsap.timeline();

      const ANIM = { y: -35, duration: 0.4, opacity: 0, ease: "power1.out" };
      const OVERLAP = "-=0.325";

      tl.from(".home-move", ANIM);
      tl.from(".about-move", ANIM, OVERLAP);
      tl.from(".projects-move", ANIM, OVERLAP);
      tl.from(".blog-move", ANIM, OVERLAP);
  });
</script>

<!-- hidden md: -->
<nav class="flex flex-row justify-center">
  <ol class="flex flex-row items-center gap-8 transition-all font-[Space_Grotesk] text-xl font-bold">
      <li class="home-move">
          <a 
              href="/" 
              title="Home" 
              class={cn(
                  "transition-all duration-300 ease-out hover:text-primary/80",
                  isActive("/", true) ? "text-primary" : "text-header-foreground"
              )}
          >
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <!-- <Coffee className="h-[36px] w-auto -translate-y-[2px]" /> -->

                  <Coffee size={30} />
                  <span bind:this={homeSpan} class="text-base md:text-lg">
                      {pageOptions.home}
                  </span>
              </div>
          </a>
      </li>

      <li class="about-move">
          <a 
              href="/about" 
              title="About" 
              class={cn(
                  "transition-all duration-300 ease-out hover:text-primary/80",
                  isActive("/about", false) ? "text-primary" : "text-header-foreground"
              )}
          >
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <BookOpen size={30} />
                  <span bind:this={aboutSpan} class="text-base md:text-lg">
                      {pageOptions.about}
                  </span>
              </div>
          </a>
      </li>

      <li class="projects-move">
          <a 
              href="/projects" 
              title="Projects" 
              class={cn(
                  "transition-all duration-300 ease-out hover:text-primary/80",
                  isActive("/projects", false) ? "text-primary" : "text-header-foreground"
              )}
          >
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <CodeXml size={30} />
                  <span bind:this={projectsSpan} class="text-base md:text-lg">
                      {pageOptions.projects}
                  </span>
              </div>
          </a>
      </li>

      <li class="blog-move">
          <a 
              href="/blog" 
              title="Blog" 
              class={cn(
                  "transition-all duration-300 ease-out hover:text-primary/80",
                  isActive("/blog", false) ? "text-primary" : "text-header-foreground"
              )}
          >
              <div class={cn("flex flex-col gap-0 items-center", HOVER_EXPAND_LARGE_TAILWIND_ANIMATION)}>
                  <Laptop size={30} />
                  <span bind:this={blogSpan} class="text-base md:text-lg">
                      {pageOptions.blog}
                  </span>
              </div>
          </a>
      </li>
  </ol>
</nav>