<script setup lang="ts">
import ActionItem from './ActionItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { useBitsongConnectionStore } from '@/stores/bitsongConnectionStore'

const {openConnection, sign, broadcast, signArbitrary} = useBitsongConnectionStore()
</script>

<template>
  <ActionItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Connect test</template>

    Connect first and then try to sign messages
    <a @click="openConnection">Connect</a>
  </ActionItem>
  <ActionItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Sign test</template>

    <a @click="sign">Sign</a>
  </ActionItem>

  <ActionItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Broadcast test</template>

    <a @click="broadcast">Broadcast</a>
  </ActionItem>

  <ActionItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Sign Arbitrary test</template>

    <a @click="signArbitrary">Sign Arbitrary</a>
  </ActionItem>
</template>
