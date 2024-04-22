<!-- +page.svelte -->
<script>
  import PersonalData from "$lib/components/forms/PersonalData.svelte";
  import ShippingAddress from '$lib/components/forms/ShippingAddress.svelte';
  import Dealer from '$lib/components/forms/Dealer.svelte';
  import Cats from '$lib/components/forms/Cats.svelte';
  import { formCount } from '$lib/stores'
  import Dogs from "$lib/components/forms/Dogs.svelte";
  import Professional from "$lib/components/forms/Professional.svelte";

  export let data
  export let form
</script>

<div>
    {#if !data?.user?.formfilled}

      {#if $formCount === 0}
      <PersonalData {data} {form} />
      {:else if $formCount === 1}
        <ShippingAddress {data} {form} />
      {:else if $formCount === 2}
        <Dealer {data} {form} />
      {:else if $formCount === 3}
        <Cats {data} {form} />
      {:else if $formCount === 4}
        <Dogs {data} {form} />
      {:else if $formCount === 5}
        <Professional {data} {form} />
      {/if}

    {:else}

      <div class="flex-col">
        <PersonalData {data} {form} />
        <ShippingAddress {data} {form} />
        <Dealer {data} {form} />
        <Cats {data} {form} />
        <Dogs {data} {form} />
        <Professional {data} {form} />
      </div>

      {/if}
</div>


<style>
  .flex-col{
    display: flex;
    flex-direction: column;
    gap: 70px;
  }
</style>