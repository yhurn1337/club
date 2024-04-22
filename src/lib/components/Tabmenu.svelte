<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    
    export function setActiveTab() {
        if (typeof window !== 'undefined') {
            const tabs = document.querySelectorAll('.tabs a');
            tabs.forEach(tab => {
                if (tab.getAttribute('href') === currentPath) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        }
    };
    $: currentPath = $page.url.pathname;

    $: {
      setActiveTab(currentPath);

    }

    


    let tabs = [
      { href: "/register", label: "Регистрация" },
      { href: "/login", label: "Вход" },
      { href: "/about", label: "Подробнее" }
    ];
    
    onMount(() => {
        setActiveTab();
    })
  </script>  
  
  
  <div class="tabs">
    {#each tabs as { href, label }}
      <a href={href} on:click={() => { setActiveTab(); }}>
        <span></span>{label}
      </a>
    {/each}
  </div>
  
  <style>
    .tabs {
      display: flex;
      align-items: center;
      gap: 20px;
      justify-content: space-between;
      border-bottom: 1px solid #3C3C3C;
      padding-bottom: 10px;
    }
    .tabs a {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .tabs a span {
        background-color: transparent;
      border: 0.3px solid transparent;
      border-radius: 100%;
      aspect-ratio: 1;
      width: 7px;
      height: 7px;
    }
  
    .tabs a.active span {
        border: 0.3px solid transparent;
      background-color: #FF6600;
    }
  </style>
  
