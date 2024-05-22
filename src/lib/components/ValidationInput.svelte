<script lang="ts">
  import type { ValidationResult } from '$lib/validations';
  import { createEventDispatcher } from 'svelte';

  export let value: string;
  export let name: string;
  export let type: 'text' | 'password' = 'text';
  export let validate: (v: unknown) => ValidationResult;

  const dispatch = createEventDispatcher<{ validated: ValidationResult }>();
  let result: ValidationResult = { validated: false };
  let isErrorVisible = false;

  $: {
    result = validate(value);
    dispatch('validated', result);
  }
</script>

<label class="label">
  <span><slot /></span>
  <input
    class="input"
    class:input-error={!result.validated && isErrorVisible}
    on:input={() => (isErrorVisible = true)}
    bind:value
    {name}
    {...{ type }}
  />
  {#if !result.validated && result.message && isErrorVisible}
    <p class="text-error-500-400-token">{result.message}</p>
  {/if}
</label>
