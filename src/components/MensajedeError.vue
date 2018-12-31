<template>
       <div v-if="Showerror" class="mensaje-error">
            <h1 class="fix">{{ mensajedeerror }}</h1>
            <p>Podes hacer <a href="/" title="Pagina principal"> clic por aca</a> para Volver al menu de peliculas populares</p>
        </div>
</template>

<script>
export default {
    props: ['Showerror', 'mensajedeerror']
};
</script>

<style>

</style>
