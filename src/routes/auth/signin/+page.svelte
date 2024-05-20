<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';

  export let form: ActionData;
</script>

<div>
  <h1 class="h4 font-semibold">Sign in</h1>
  <p>
    <span class="opacity-75">Don't have an account?</span>
    <a href="/auth/signup" class="anchor">Sign up</a>
  </p>
</div>

{#if form?.message}
  <p>{form.message}</p>
{/if}

<form method="post" class="flex flex-col items-stretch gap-4" use:enhance>
  <label class="label">
    <span>Username</span>
    <input name="username" class="input" />
  </label>
  <label class="label">
    <span>Password</span>
    <input name="password" class="input" />
  </label>
  <button type="submit" class="variant-filled-surface btn">Sign in</button>
</form>
