<script lang="ts">
  export let width = 32;
  export let height = 32;
  export let color = 'rgb(255, 255, 255, 0.10)';
  export let extraClasses: string | null = null;
</script>

<svg
  width="100%"
  height="100%"
  xmlns="http://www.w3.org/2000/svg"
  class="pointer-events-none absolute inset-0 select-none {extraClasses}"
>
  <defs>
    <pattern id="grid" {width} {height} patternUnits="userSpaceOnUse">
      <path d="M {width} 0 L 0 0 0 {height}" fill="none" stroke={color} stroke-width="1" />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
