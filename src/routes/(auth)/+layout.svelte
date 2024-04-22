<script>
  import { fade } from "svelte/transition";
  import Tabmenu from "$lib/components/Tabmenu.svelte";
  export let data

</script>
<div class="auth">
    <div class="auth-form">
        <div class="auth-form__content">
            <img src="images/logo.svg" alt="logo">
            <Tabmenu />
            {#key data.url}
            <div in:fade={{ delay: 300, duration: 300 }}>
                <slot />
            </div>
            {/key}
        </div>
    </div>
    <div class="auth-image">
        <img src="images/login-photo.png" alt="cat">
    </div>
</div>

<style lang="scss">
    .auth{
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 20px;
        height: 100dvh;

        @media (max-width: 1024px) {
            display: flex;
            flex-direction: column-reverse;
            height: 100%;
            
        }

        &-form{
            padding-left: 20px;
            grid-column: 1/span 2;
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 20px;

            &__content{
                grid-column: 2/9;
                padding-bottom: 70px;
                justify-content: end;

                

                display: flex;
                flex-direction: column;
                gap: 40px;

                
                @media (max-width: 1024px) {
                    grid-column: 1/10;
                }

                img{
                    margin-bottom: 20px;
                }
            }
            
        }
        &-image{
            grid-column: 3/span 4;
            height: 100%;
            img{
                object-fit: cover;  
                max-height: 100vh;
            }
        }
    }
</style>