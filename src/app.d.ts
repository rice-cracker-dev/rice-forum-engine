// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    interface Locals {
      user: import('lucia').User | null;
      session: import('lucia').Session | null;
    }

    interface PageData {
      user: import('lucia').User | null;
      navbarPageStyle?: string | null;
    }
  }
}

export {};
