<script>
    import Input from "$lib/components/Input.svelte";
    import { fade } from "svelte/transition";
    import { formCount } from '$lib/stores';
    import { enhance } from '$app/forms';
    import { onMount } from "svelte";
  import toast from "svelte-french-toast";

    export let data;
    export let form;

    const handleEnhance = () => {
        return async ({ result, update }) =>{
            switch (result.type) {
                case 'success':
                    toast.success('Анкеты успешно заполнена! Если вы захотите ее дополнить, напишите в чат и администратор вам поможет!', {duration: 6000})
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

<div class="data" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }}>
    <h2>Профессиональные услуги</h2>
    <form action="?/professional" method="POST" use:enhance={handleEnhance}>
        <div class="grid">
            <div class="checkbox-wrap">
                <h3>Хендлер</h3>
                <div class="checkbox">
                    <input type="checkbox" name="handler" id="handler" checked={data?.user?.handler} disabled={data?.user?.formfilled ? true : false} >
                    <label for="handler">Хендлер</label>
                </div>
            </div>
    
            <div class="checkbox-wrap">
                <h3>Передержка</h3>
                <div class="checkbox">
                    <div style="display:flex; flex-direction: column; gap: 10px;">
                        <Input name="perederzhka" value="perederzhka_solo" label="Частная" type="radio" radioLabel="true" checked={data?.user?.perederzhka ? true : false} disabled={data?.user?.formfilled ? true : false} />
                        <Input name="perederzhka" value="perederzhka_hostel" label="Зоогостиница" type="radio" radioLabel="true" checked={data?.user?.perederzhka ? true : false} disabled={data?.user?.formfilled ? true : false} />
                    </div>
                </div>
            </div>
    
            <div class="checkbox-wrap">
                <h3>Груминг</h3>
                <div class="checkbox">
                    <input type="checkbox" name="groomer" id="groomer" checked={data?.user?.groomer ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="groomer">Грумер</label>
                </div>
            </div>
    
            <div class="checkbox-wrap">
                <h3>Инструктор</h3>
                <div class="checkbox">
                    <input type="checkbox" name="fitness_instructor" id="fitness_instructor" checked={data?.user?.fitness_instructor ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="fitness_instructor">Фитнес</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="claiming_instructor" id="claiming_instructor" checked={data?.user?.claiming_instructor ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="claiming_instructor">Клеймение</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="birth_instructor" id="birth_instructor" checked={data?.user?.birth_instructor ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="birth_instructor">Актирование пометов</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="reproduction_instructor" id="reproduction_instructor" checked={data?.user?.reproduction_instructor ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="reproduction_instructor">Репродукция</label>
                </div>
            </div>
    
            <div class="checkbox-wrap">
                <h3>Дрессировка</h3>
                <div class="checkbox">
                    <input type="checkbox" name="sport_training" id="sport_training" checked={data?.user?.sport_training ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="sport_training">Спортивная</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="behavior_training" id="behavior_training" checked={data?.user?.behavior_training ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="behavior_training">Управление и коррекция</label>
                </div>
            </div>
    
            <div class="checkbox-wrap">
                <h3>Зоопсихология</h3>
                <div class="checkbox">
                    <input type="checkbox" name="psy_solo" id="psy_solo" checked={data?.user?.psy_solo ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="psy_solo">Частная практика</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" name="psy_company" id="psy_company" checked={data?.user?.psy_company ? true : false} disabled={data?.user?.formfilled ? true : false}>
                    <label for="psy_company">В компании</label>
                </div>
            </div>
        </div>
        <input type="text" name="formfilled" value="formfilled" hidden>
        {#if !data?.user?.formfilled}
            <button class="btn btn-primary" type="submit">Даллее</button>
        {:else}
            <a href="/account/chat" class="notification good">Запросить изменение анкеты можно в чате</a>
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
                grid-column: 3/4;
            }
        }
        h2{
            font-size: 25px;
        }
        h3{
            font-size: 20px;
        }
    }
    .grid{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 20px;
        row-gap: 25px;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 40px;
        }
    }
    .checkbox{
        display: flex;
        gap: 7px;
        align-items: center;
        accent-color: #FF6600;
        
        &-wrap{
            display: flex;
            flex-direction: column;
            gap: 10px;
            h3{
                padding-bottom: 10px;
            }
        }
        input{
            height: 17px;
        }
        label{
            letter-spacing: 0.2px;
        }
    }
    h2{
        margin-top: 15px;
    }
    .notification.good{
        grid-column: 2/3;

        @media (max-width: 1024px) {
            grid-column: 1/4;
        }
    }
</style>