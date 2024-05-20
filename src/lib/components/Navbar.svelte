<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  $: user = $page.data.user;
  $: navbarPageStyle = $page.data.navbarPageStyle ?? 'fixed';
</script>

<nav class="{navbarPageStyle} inset-x-0 top-0 grid grid-cols-2 items-center gap-4 p-2">
  <div class="flex items-center gap-2">
    {#if user}
      <p>Hello, {user.username}!</p>
      <form method="POST" use:enhance>
        <button
          type="submit"
          formaction="/auth/signout?no-redirect=true"
          class="variant-filled-surface btn"
        >
          sign out
        </button>
      </form>
    {:else}
      <a href="/auth/signin" class="variant-filled-surface btn">sign in</a>
      <a href="/auth/signup" class="variant-filled-surface btn">sign up</a>
    {/if}
  </div>
</nav>
