<template>
  <Header />
  <main :class="$style.container"><PanelContainer /></main>
  <Footer />
</template>

<script>
import Header from '@/components/organisms/Header';
import PanelContainer from '@/components/organisms/CardsContainer';
import Footer from '@/components/organisms/Footer';

export default {
  name: 'BaseTemplate',
  components: {
    Header,
    PanelContainer,
    Footer,
  },
};
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: $primary-color;
}
</style>
