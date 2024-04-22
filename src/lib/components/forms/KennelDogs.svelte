<script>
    import { fade } from "svelte/transition";
    import Input from "../Input.svelte";
    import AddBreedDogs from "./AddBreedDogs.svelte";

    let checked = false;
    export let data;
    export let form;
</script>

<div class="data" in:fade={{ duration: 500, delay: 500 }} out:fade={{ duration: 500 }} >
    <h2>Информация о питомнике/Заводской приставке</h2>
    <div class="flex-col">
        <Input name="kennel" value={data?.user?.kennel} placeholder="Название" label="Название" errors={form?.errors?.kennel} />
        <div class="checkbox-wrap">
            <div class="input-label">
                <label for="dogs_kennel_sertificate">
                    Копия свидетельства о регистрации
                </label>
    
                <input  name="dogs_kennel_sertificate" type="file" placeholder="Загрузите изображение или пдф сертификата" disabled={checked} />
                {#if form?.errors?.message}
                    <label class="input-error" for="dogs_kennel_sertificate">{form?.errors?.message}</label>
                {/if}
            </div>

            <div class="checkbox align-top">
                <input value={data?.user?.dogs_kennel_sertificate_assurance} type="checkbox" name="dogs_kennel_sertificate_assurance" id="dogs_kennel_sertificate_assurance" disabled={checked}>
                <label for="dogs_kennel_sertificate_assurance">Подтверждаю, что Регистрационное свидетельство на питомник (Заводскую приставку) зарегистрировано на мое имя</label>
            </div>

            <div class="checkbox">
                <input type="checkbox" value={data?.user?.dogs_kennel_sertificate_later} name="dogs_kennel_sertificate_later" id="dogs_kennel_sertificate_later" bind:checked={checked} disabled={data?.user?.formfilled ? true : false}>
                <label for="dogs_kennel_sertificate_later">Пришлю сертификат позже</label>
            </div>
        </div>
    </div>
    <h2>Общая информация</h2>
    <div class="flex-col">
        <div class="input-label">
            <label for="dogs_kennel_exp">
                Занимаюсь разведением
            </label>
            <select name="dogs_kennel_exp" id="dogs_kennel_exp" value={data?.user?.dogs_kennel_exp} disabled={data?.user?.formfilled ? true : false}>
                <option value="not_stated">Не указано</option>
                <option value="less_than3">Менее 3х лет</option>
                <option value="from3to5">от 3х до 5 лет</option>
                <option value="from5to10">от 5 до 10 лет</option>
                <option value="from10to20">от 10 до 20 лет</option>
                <option value="over20">более 20 лет</option>
            </select>
        </div>
    </div>
    <AddBreedDogs type="kennel" {data} />
    <h2>Титулы</h2>
    <div class="flex-col">
        <div class="input-label">
            <label for="dogs_championships_5years">
                Титулы принадлежащих вам животных, полученные за ближайшие 5 лет
            </label>
            <select name="dogs_championships_5years" id="dogs_championships_5years" value={data?.user?.dogs_championships_5years} disabled={data?.user?.formfilled ? true : false}>
                <option value="none">Нет титулов</option>
                <option value="world_champ">Чемпион мира</option>
                <option value="world_champ_yung">Юный чемпион мира</option>
                <option value="continent_champ">Чемпион Европы, Азии или Америки</option>
                <option value="continent_champ_yung">Юный чемпион Европы, Азии или Америки</option>
                <option value="inter_champ">Интерчемпион</option>
                <option value="national_champ">Национальный чемпион более 4х стран</option>
                <option value="russia_champ">Чемпион России</option>
                <option value="nkp_champ">Чемпион НКП любой страны</option>
            </select>
        </div>
        <div class="input-label">
            <label for="dogs_championships_lastyear">
                Титулы принадлежащих вам животных, полученные в текущем и прошлом году
            </label>
            <select name="dogs_championships_lastyear" id="dogs_championships_lastyear" value={data?.user?.dogs_championships_lastyear} disabled={data?.user?.formfilled ? true : false}>
                <option value="none">Нет титулов</option>
                <option value="world_champ">Чемпион мира</option>
                <option value="world_champ_yung">Юный чемпион мира</option>
                <option value="continent_champ">Чемпион Европы, Азии или Америки</option>
                <option value="continent_champ_yung">Юный чемпион Европы, Азии или Америки</option>
                <option value="inter_champ">Интерчемпион</option>
                <option value="national_champ">Национальный чемпион более 4х стран</option>
                <option value="russia_champ">Чемпион России</option>
                <option value="nkp_champ">Чемпион НКП любой страны</option>
            </select>
        </div>
        <div class="input-label">
            <label for="dogs_championships_department">
                Титулы животных вашего разведения, полученные за ближайшие 5 лет
            </label>
            <select name="dogs_championships_department" id="dogs_championships_department" value={data?.user?.dogs_championships_department} disabled={data?.user?.formfilled ? true : false}>
                <option value="none">Нет титулов</option>
                <option value="world_champ">Чемпион мира</option>
                <option value="world_champ_yung">Юный чемпион мира</option>
                <option value="continent_champ">Чемпион Европы, Азии или Америки</option>
                <option value="continent_champ_yung">Юный чемпион Европы, Азии или Америки</option>
                <option value="inter_champ">Интерчемпион</option>
                <option value="national_champ">Национальный чемпион более 4х стран</option>
                <option value="russia_champ">Чемпион России</option>
                <option value="nkp_champ">Чемпион НКП любой страны</option>
            </select>
        </div>
    </div>
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
    .input-label{
        display: flex;
		flex-direction: column;
		gap: 8px;
		position: relative;
    }
    .checkbox{
        display: flex;
        gap: 7px;
        align-items: center;
        accent-color: #FF6600;
        
        &-wrap{
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        &.align-top{
            align-items: flex-start;
        }
        input{
            height: 17px;
        }
        label{
            letter-spacing: 0.2px;
        }
    }
    .flex-col{
        display: flex;
        flex-direction: column;
        gap: 25px;
        width: calc((100% - 82px) / 2);

        @media (max-width: 1024px) {
            width: 100%;
        }
    }
    h2{
        margin-top: 15px;
    }
</style>