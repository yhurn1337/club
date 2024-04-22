<script>
    import Input from "$lib/components/Input.svelte";
    import { fade } from "svelte/transition";
    import { formCount } from '$lib/stores';
    import { enhance } from '$app/forms';
    import { onMount } from "svelte";
    import AddBreedCats from "$lib/components/forms/AddBreedCats.svelte";
    import KennelCats from "$lib/components/forms/KennelCats.svelte";
    import toast from "svelte-french-toast";
    

    export let data;
    export let form;

    onMount(() => {
        if(data?.user?.cats_breeder_type){
            $formCount++
        }
    });

    const handleEnhance = () => {
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
    console.log(data?.user?.formfilled)
    $: selectedType = 'none'
</script>

<div class="data" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }} >
    <h2>Фелинология (Кошки)</h2>
    
    {#if !data?.user?.formfilled}
        <form action="?/cats" method="POST" use:enhance={handleEnhance} enctype="multipart/form-data">
            <div class="flex-col">
                <div class="radio">
                    <Input name="cats_breeder_type" value="none" checked={data?.user?.cats_breeder_type === "none" ? true : false} label="Нет кошек – у меня вообще нет кошек" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} />
                    <Input name="cats_breeder_type" value="owner" checked={data?.user?.cats_breeder_type === "owner" ? true : false} label="Владелец – я содержу животных, но не занимаюсь разведением" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail}  />
                    <Input name="cats_breeder_type" value="breeder" checked={data?.user?.cats_breeder_type === "breeder" ? true : false} label="Заводчик – я занимаюсь разведением породных животных и оформляю пометы через клубы или дружественные питомники" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail}  />
                    <Input name="cats_breeder_type" value="kennel" checked={data?.user?.cats_breeder_type === "kennel" ? true : false} label="Владелец питомника – я являюсь владельцем питомника и свидетельство о регистрации выписано на мое имя" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail}  />
                </div>
                {#if selectedType === 'owner'}
                    <AddBreedCats {data} />
                {:else if selectedType === 'breeder' || selectedType === 'kennel'}
                    <KennelCats {form} {data} />
                {/if}
            </div>
            <button type="submit" class="btn-primary">Далее</button>
        </form>
    {:else}
        <form action="?/cats" method="POST" use:enhance={handleEnhance} enctype="multipart/form-data">
            <div class="flex-col">
                <div class="radio">
                    <Input name="cats_breeder_type" value="none" checked={data?.user?.cats_breeder_type === "none" ? true : false} label="Нет кошек – у меня вообще нет кошек" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false} />
                    <Input name="cats_breeder_type" value="owner" checked={data?.user?.cats_breeder_type === "owner" ? true : false} label="Владелец – я содержу животных, но не занимаюсь разведением" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false}  />
                    <Input name="cats_breeder_type" value="breeder" checked={data?.user?.cats_breeder_type === "breeder" ? true : false} label="Заводчик – я занимаюсь разведением породных животных и оформляю пометы через клубы или дружественные питомники" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false}  />
                    <Input name="cats_breeder_type" value="kennel" checked={data?.user?.cats_breeder_type === "kennel" ? true : false} label="Владелец питомника – я являюсь владельцем питомника и свидетельство о регистрации выписано на мое имя" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false}  />
                </div>
                {#if data?.user?.cats_breeder_type === 'owner'}
                    <AddBreedCats {data}  />
                {:else if data?.user?.cats_breeder_type === 'breeder' || data?.user?.cats_breeder_type === 'kennel'}
                    <KennelCats {form} {data}  />
                {/if}
            </div>
        </form>
    {/if}
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

            @media (max-width: 1024px) {
                display: flex;
                flex-direction: column;
            }

            .flex-col{
                grid-column: 1/4;
            }
            button{
                grid-column: 3/4;
            }
        }
        h2{
            font-size: 25px;
        }
    }
    .flex-col{
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    .radio{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    h2{
        margin-top: 15px;
    }
</style>

