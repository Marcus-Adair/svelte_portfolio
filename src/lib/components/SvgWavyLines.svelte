<script lang="ts">
    import { onMount } from 'svelte';

    // Config
    const LINE_COUNT = 20;
    const POINTS_PER_LINE = 50;
    const REPEL_RADIUS = 150;
    const REPEL_STRENGTH = 40;
    const RETURN_SPEED = 0.06;
    const WAVE_AMPLITUDE = 7;
    const WAVE_SPEED = 0.003;

    interface Props {
        containerRef?: HTMLElement; // Reference element for mouse position calculations
        paths?: string[]; // Bindable: exposes computed paths for external use
    }

    let {
        containerRef = $bindable(),
        paths = $bindable([]),
    }: Props = $props();

    let svgElement: SVGSVGElement;
    let width = $state(0);
    let height = $state(0);
    let mouseX = -1000;
    let mouseY = -1000;
    let animationId: number;
    let time = 0;

    interface Point {
        baseX: number;
        baseY: number;
        x: number;
        y: number;
    }

    let lines = $state<Point[][]>([]);

    function initLines() {
        const newLines: Point[][] = [];
        const lineSpacing = width / (LINE_COUNT + 1);

        for (let i = 0; i < LINE_COUNT; i++) {
            const x = lineSpacing * (i + 1);
            const points: Point[] = [];

            for (let j = 0; j < POINTS_PER_LINE; j++) {
                const y = (height / (POINTS_PER_LINE - 1)) * j;
                points.push({
                    baseX: x,
                    baseY: y,
                    x: x,
                    y: y
                });
            }

            newLines.push(points);
        }

        lines = newLines;
    }

    function updatePoints() {
        time += WAVE_SPEED;

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            // Each line gets a slightly different speed (0.8x to 1.2x)
            const speedVariation = 0.8 + (lineIndex / lines.length) * 0.4;

            for (let i = 0; i < line.length; i++) {
                const point = line[i];

                // Idle wave animation with per-line speed variation
                const waveOffset = Math.sin(time * speedVariation + point.baseY * 0.02) * WAVE_AMPLITUDE;
                let targetX = point.baseX + waveOffset;
                let targetY = point.baseY;

                // Cursor repulsion
                const dx = point.x - mouseX;
                const dy = point.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < REPEL_RADIUS && distance > 0) {
                    const force = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH;
                    const angle = Math.atan2(dy, dx);
                    targetX += Math.cos(angle) * force;
                    targetY += Math.sin(angle) * force;
                }

                // Smooth interpolation toward target
                point.x += (targetX - point.x) * RETURN_SPEED;
                point.y += (targetY - point.y) * RETURN_SPEED;
            }
        }
    }

    function buildPath(points: Point[]): string {
        if (points.length < 2) return '';

        let d = `M ${points[0].x} ${points[0].y}`;

        // Quadratic bezier through points
        for (let i = 1; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const midX = (current.x + next.x) / 2;
            const midY = (current.y + next.y) / 2;
            d += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
        }

        // Final segment
        const last = points[points.length - 1];
        d += ` L ${last.x} ${last.y}`;

        return d;
    }

    function animate() {
        updatePoints();
        // Trigger reactivity + export paths
        lines = [...lines];
        paths = lines.map(buildPath);
        animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
        const ref = containerRef ?? svgElement;
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }

    function handleResize() {
        const ref = containerRef ?? svgElement?.parentElement;
        if (!ref) return;
        width = ref.clientWidth;
        height = ref.clientHeight;
        initLines();
    }

    onMount(() => {
        handleResize();
        animate();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });

</script>

<svg
    bind:this={svgElement}
    {width}
    {height}
    class="w-full h-full pointer-events-none"
>
    {#each paths as d, i (i)}
        <path
            {d}
            fill="none"
            class="stroke-muted-foreground/10"
            stroke-width="1.5"
        />
    {/each}
</svg>
