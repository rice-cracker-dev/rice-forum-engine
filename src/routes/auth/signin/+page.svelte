<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';
  import AuthLayout from '../AuthLayout.svelte';

  export let form: ActionData;

  let username = '';
  let password = '';

  $: isFormValid = username.length > 0 && password.length > 0;
</script>

<AuthLayout message={form?.message}>
  <div slot="header">
    <h1 class="h4 font-semibold">Sign in</h1>
    <p>
      <span class="opacity-75">Don't have an account?</span>
      <a href="/auth/signup" class="anchor">Sign up</a>
    </p>
  </div>

  <form method="post" class="flex flex-col items-stretch gap-4" use:enhance>
    <label class="label">
      <span>Username</span>
      <input name="username" type="text" class="input" bind:value={username} />
    </label>
    <label class="label">
      <span>Password</span>
      <input name="password" type="password" class="input" bind:value={password} />
    </label>
    <button type="submit" class="variant-filled-surface btn" disabled={!isFormValid}>
      Sign in
    </button>
  </form>
</AuthLayout>
