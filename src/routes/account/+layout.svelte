<script>
  import Sidebar from '../../lib/components/Sidebar.svelte';

</script>

<main>
    <div class="container">
        <div class="account">
            <div class="account-sidebar">
                <Sidebar />
            </div>
            <div class="account-content">
                <slot />
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    .account{
        padding: 35px 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 20px;
        
        &-sidebar{
            grid-column: 1/2;

            @media (max-width: 1024px) {
                position: fixed;
                z-index: 10;
                top: 20px;
                left: 20px;
                width: 30px;
                height: 30px;
            }
        }
        &-content{
            grid-column: 2/span 3;

            @media (max-width: 1024px) {
                grid-column: 1/2;
            }
        }

        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
            position: relative;
        }
    }
    
</style>