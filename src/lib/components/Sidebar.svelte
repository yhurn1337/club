<script>

    import toast from "svelte-french-toast";

    export let data;
    let active = false;

    function toggleClass(){
        active = !active
    }

    const fullName = (data?.user?.name && data?.user?.surname) ? `${data?.user?.name} ${data?.user?.surname}` : 'Имя Фамилия';
</script>

<div class="sidebar " class:active>
    <div class="user-short">
        <img src="https://secure.gravatar.com/avatar/cb5fb1e5cdb634c42f817ef61386e99a?s=96&d=mm&r=g" alt="user">
        <div>
            <p class="user-short__name">
                {fullName}
            </p>
            <p class="user-short__email">
                1loso@mail.ru
            </p>
        </div>
    </div>
    <div class="sidebar-links">
        <a href="/account">Главная</a>
        <a href="/account/info">Анкета заводчика</a>
        <a href="/account/groups" on:click|preventDefault={(e) => toast('Данный раздел в активной разработке!')}>Членство в группах</a>
        <a href="/account/prices" on:click|preventDefault={(e) => toast('Данный раздел в активной разработке!')}>Прайсы и заказы</a>
        <a href="/account/program" on:click|preventDefault={(e) => toast('Данный раздел в активной разработке!')}>Мои программы</a>
        <a href="/account/chat" on:click|preventDefault={(e) => toast('Данный раздел в активной разработке!')}>Запросы и сообщения</a>
        <form action="/logout?/login" method="POST">
            <button type="submit" >Выйти</button>
        </form>
    </div>
</div>

<button class="sidebar-activate" class:active on:click={toggleClass}>
    <span></span>
    <span></span>
    <span></span>
</button>

<style lang="scss">
    .sidebar{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 35px;

        @media (max-width: 1024px) {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #000;
            transform: translateX(-100%);

            &.active{
                transform: translateX(0);
            }
        }

        &-activate{
            display: none;

            @media (max-width: 1024px) {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 5px;
                background-color: #FF6600;
                border-radius: 100%;
                padding: 10px;

                span{
                    background-color: #fff;
                    height: 1px;
                    width: 100%;
                }

                &.active{
                    span{
                        &:nth-child(1){
                            transform: rotate(45deg) translateX(5px) translatey(3px);
                        }
                        &:nth-child(2){
                            opacity: 0;
                        }
                        &:nth-child(3){
                            transform: rotate(-45deg) translatex(5px) translatey(-3px);
                        }
                    }
                }
            }
        }

        &-links{
            display: flex;
            flex-direction: column;
            gap: 15px;
            a, button{
                color: #fff;
                font-size: 16px;
                &:hover{
                    color: #FF6600;
                }
            }
        }
    }
    .user-short{
        display: flex;
        align-items: center;
        gap: 15px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }
        div{
            display: flex;
            flex-direction: column;
            gap: 10px;
            .user-short__name{
                font-size: 20px;
            }
            .user-short__email{
                font-size: 16px;
                color: #949494;
            }
        }
    }
</style>