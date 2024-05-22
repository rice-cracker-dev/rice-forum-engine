<script lang="ts">
  import GridBackground from '$lib/components/GridBackground.svelte';

  export let message: string | null = null;
</script>

<section
  class="
    flex w-full items-center justify-center
    md:min-h-screen md:justify-center"
>
  <GridBackground extraClasses="hidden md:block" />

  <div
    class="
      relative m-4 flex w-full flex-col items-stretch gap-4
      md:card md:w-[24rem] md:p-4 md:shadow-xl"
  >
    <slot name="header" />

    {#if message}
      <aside class="alert variant-ghost-error">
        <div class="alert-message">
          <p>{message}</p>
        </div>
      </aside>
    {/if}

    <slot />
  </div>
</section>
