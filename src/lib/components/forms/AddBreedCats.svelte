<script>
    import { fade } from "svelte/transition";
    import Input from "../Input.svelte";
    import { writable } from "svelte/store";


    export let type;
    export let data;
    

    let uid = 1;
    const rows = writable([
        {id:uid},
    ]);
    
    const addRow = () => {
        $rows = [...$rows, { id: ++uid}]
    }
    
    const removeRow = () => {
        if($rows.length < 2){ return }
        $rows.pop()
        $rows = $rows
        uid--;
    }



    function getRowsFromDb(data) {
        const loadedRows = []
        for(let i=1; i<11; i++){
            if(data?.user[`cats_breed${i}`]){
                let el = { breed: data.user[`cats_breed${i}`], weight: data.user[`cats_breed_weight${i}`], quantity: data.user[`cats_breed_quantity${i}`], birthrate: data.user[`cats_breed_birthrate${i}`], id: i }
                loadedRows.push(el)
            }
        }

        return loadedRows
    }

    const loadedRows = getRowsFromDb(data);

    console.log(data?.user?.formfilled)
</script>

<div class="data" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }}>
    <h2>Порода</h2>
        {#if !data?.user?.formfilled }
            {#if type === 'kennel' || type === 'breeder'}
                {#each $rows as row (row.id)}
                    <div class="row kennel" in:fade|global={{ duration: 500 }} out:fade|global={{ duration: 500 }} >
                        <Input name="cats_breed{row.id}" placeholder="Порода" label="Порода" /> 
                        <Input name="cats_breed_weight{row.id}" placeholder="Средний вес" label="Средний вес" /> 
                        <Input name="cats_breed_quantity{row.id}" placeholder="Колличество" label="Колличество" /> 
                        <Input name="cats_breed_birthrate{row.id}" placeholder="Колличество пометов в год" label="Колличество пометов в год" /> 
                        <button on:click|preventDefault={removeRow} class="delete">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>              
                        </button>
                    </div>
                {/each}
            {:else}
                {#each $rows as row (row.id)}
                    <div class="row" in:fade|global={{ duration: 500 }} out:fade|global={{ duration: 500 }} >
                        <Input name="cats_breed{row.id}" placeholder="Порода" label="Порода" /> 
                        <Input name="cats_breed_quantity{row.id}" placeholder="Колличество" label="Колличество" /> 
                        <button on:click|preventDefault={removeRow(row.id)} class="delete">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>              
                        </button>
                    </div>
                {/each}
            {/if}
            <button on:click|preventDefault={addRow} class="" id="addRow" disabled={$rows.length > 9}>
                {#if $rows.length > 9}
                    Максимум 10 пород
                {:else}
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                     </svg>
                  
                    Добавить породу
                {/if}
            </button>
        {:else}
            {#if data?.user?.cats_breeder_type === 'kennel' || data?.user?.cats_breeder_type === 'breeder'}
                {#if loadedRows.length > 0}
                    {#each loadedRows as row (row.id)}
                        <div class="row kennel" in:fade|global={{ duration: 500 }} out:fade|global={{ duration: 500 }} >
                            <Input name="cats_breed{row.id}" value={row.breed} placeholder="Порода" label="Порода" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_weight{row.id}" value={row.weight} placeholder="Средний вес" label="Средний вес" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_quantity{row.id}" value={row.quantity} placeholder="Колличество" label="Колличество" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_birthrate{row.id}" value={row.birthrate} placeholder="Колличество пометов в год" label="Колличество пометов в год" disabled={data?.user?.formfilled ? true : false} /> 
                        </div>
                    {/each}
                {:else}
                        <div class="row kennel" in:fade|global={{ duration: 500 }} out:fade|global={{ duration: 500 }} >
                            <Input name="cats_breed1" placeholder="Порода" label="Порода" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_weight1" placeholder="Средний вес" label="Средний вес" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_quantity1" placeholder="Колличество" label="Колличество" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_birthrate1" placeholder="Колличество пометов в год" label="Колличество пометов в год" disabled={data?.user?.formfilled ? true : false} /> 
                        </div>
                {/if}
            {:else}
                {#if loadedRows.length > 0}
                    {#each loadedRows as row (row.id)}
                        <div class="row kennel" in:fade|global={{ duration: 500 }} out:fade|global={{ duration: 500 }} >
                            <Input name="cats_breed{row.id}" value={row.breed} placeholder="Порода" label="Порода" disabled={data?.user?.formfilled ? true : false} /> 
                            <Input name="cats_breed_quantity{row.id}" value={row.quantity} placeholder="Колличество" label="Колличество" disabled={data?.user?.formfilled ? true : false} /> 
                        </div>
                    {/each}
                {:else}
                    <div class="row kennel" in:fade|global={{ duration: 500 }} out:fade|global={{ duration: 500 }} >
                        <Input name="cats_breed1" placeholder="Порода" label="Порода" disabled={data?.user?.formfilled ? true : false} /> 
                        <Input name="cats_breed_quantity1" placeholder="Колличество" label="Колличество" disabled={data?.user?.formfilled ? true : false} /> 
                    </div>
                {/if}
            {/if}
        {/if}
    
</div>

<style lang="scss">
    .data{
        display: flex;
        flex-direction: column;
        gap: 25px;
        
        h2{
            font-size: 25px;
        }
    }
    .row{
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr 1fr 42px;

        @media (max-width: 1024px) {
            display: flex;
            flex-direction: column;
        }
        &.kennel{
            grid-template-columns: 1fr 1fr 1fr 1fr 42px;

            @media (max-width: 1024px) {
                display: flex;
                flex-direction: column;
            }
        }


    }
    .delete{
        display: flex;
        border-radius: 7px;
        background-color: red;
        aspect-ratio: 1;
        align-self: flex-end;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        svg{
            path{
                stroke: #fff;
            }
        }
    }
    #addRow{
        font-size: 17px;
        width: 20%;
        color: #fff;
        display: flex;
        gap: 7px;
        align-items: center;
        text-align: start;
    }
    h2{
        margin-top: 15px;
    }
</style>