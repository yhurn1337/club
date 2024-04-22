<script>
    import Input from "$lib/components/Input.svelte";
    import { fade } from "svelte/transition";
    import { formCount } from '$lib/stores';
    import { enhance } from '$app/forms';
    import { onMount } from "svelte";
  import toast from "svelte-french-toast";


    export let data;
    export let form

    onMount(() => {
        if(data?.user?.dealer){
            $formCount++
        }
    });

    const handleEnhance = () => {
        console.log(form)
        return async ({ result, update }) =>{
            switch (result.type) {
                case 'success':
                    $formCount++
                    break;
                case 'fail':
                    toast.error('Проверьте вводы на ошибки')
                    break;
                default:
                    break;
            }
            await update()
        }
    }
</script>

<div class="data" in:fade={{ duration: 500 }} >
    <h2>Поставщик кормов</h2>
    <form action="?/dealer" method="POST" use:enhance={handleEnhance}>
        <div class="grid">
            <Input name="dealer" value={data?.user?.dealer} placeholder="ООО 'ЗООКОНТАКТ'" label="Поставщик кормов" required="true" errors={form?.errors?.dealer} disabled={data?.user?.formfilled ? true : false} />
        </div>
        {#if !data?.user?.formfilled}
        <button type="submit" class="btn-primary">Далее</button>
        {/if}
    </form>
</div>

<style lang="scss">
    .data{
        display: flex;
        flex-direction: column;
        gap: 25px;
        form{
            margin-top: 10px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            .grid{
                grid-column: 1/4;
            }
            button{
                margin-top: 20px;
                grid-column: 3/4;
            }
        }
        h2{
            font-size: 25px;
        }
    }
    .grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 20px;
        row-gap: 25px;

        @media (max-width: 1024px) {
            display: flex;
            flex-direction: column;
        }
    }
</style>

