<script>
    import Input from "$lib/components/Input.svelte";
    import { fade } from "svelte/transition";
    import { formCount } from '$lib/stores';
    import { enhance } from '$app/forms';
    import { onMount } from "svelte";
    import AddBreedDogs from "$lib/components/forms/AddBreedDogs.svelte";
    import KennelDogs from "$lib/components/forms/KennelDogs.svelte";
  import toast from "svelte-french-toast";
    
    export let data;
    export let form;

    onMount(() => {
        if(data?.user?.dogs_breeder_type){
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
                    toast.error('Проверьте вводы на ошибки')
                    break;
            }
            await update()
        }
    }
    
    $: selectedType = 'none'
</script>

<div class="data" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }} >
    <h2>Кинология (Собаки)</h2>
    
    {#if !data?.user?.formfilled}
        <form action="?/dogs" method="POST" use:enhance={handleEnhance} enctype="multipart/form-data">
            <div class="flex-col">
                <div class="radio">
                    <Input name="dogs_breeder_type" value="none" checked={data?.user?.dogs_breeder_type === "none" ? true : false} label="Нет собак – у меня вообще нет собак" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} />
                    <Input name="dogs_breeder_type" value="owner" checked={data?.user?.dogs_breeder_type === "owner" ? true : false} label="Владелец – я содержу животных, но не занимаюсь разведением" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail}  />
                    <Input name="dogs_breeder_type" value="breeder" checked={data?.user?.dogs_breeder_type === "breeder" ? true : false} label="Заводчик – я занимаюсь разведением породных животных и оформляю пометы через клубы или дружественные питомники" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail}  />
                    <Input name="dogs_breeder_type" value="kennel" checked={data?.user?.dogs_breeder_type === "kennel" ? true : false} label="Владелец питомника – я являюсь владельцем питомника и свидетельство о регистрации выписано на мое имя" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail}  />
                </div>
                {#if selectedType === 'owner'}
                    <AddBreedDogs />
                {:else if selectedType === 'breeder' || selectedType === 'kennel'}
                    <KennelDogs {form} />
                {/if}
            </div>
            <button type="submit" class="btn-primary">Далее</button>
        </form>
    {:else}
        <form action="?/dogs" method="POST" use:enhance={handleEnhance} enctype="multipart/form-data">
            <div class="flex-col">
                <div class="radio">
                    <Input name="dogs_breeder_type" value="none" checked={data?.user?.dogs_breeder_type === "none" ? true : false} label="Нет собак – у меня вообще нет собак" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false} />
                    <Input name="dogs_breeder_type" value="owner" checked={data?.user?.dogs_breeder_type === "owner" ? true : false} label="Владелец – я содержу животных, но не занимаюсь разведением" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false} />
                    <Input name="dogs_breeder_type" value="breeder" checked={data?.user?.dogs_breeder_type === "breeder" ? true : false} label="Заводчик – я занимаюсь разведением породных животных и оформляю пометы через клубы или дружественные питомники" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false} />
                    <Input name="dogs_breeder_type" value="kennel" checked={data?.user?.dogs_breeder_type === "kennel" ? true : false} label="Владелец питомника – я являюсь владельцем питомника и свидетельство о регистрации выписано на мое имя" type="radio" radioLabel="true" on:radioChanged={(e) => selectedType = e.detail} disabled={data?.user?.formfilled ? true : false} />
                </div>
                {#if data?.user?.dogs_breeder_type === 'owner'}
                    <AddBreedDogs {data} />
                {:else if data?.user?.dogs_breeder_type === 'breeder' || data?.user?.dogs_breeder_type === 'kennel'}
                    <KennelDogs {form} {data} />
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


