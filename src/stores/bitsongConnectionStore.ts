import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Connector } from "@bitsongjs/wallet-connect"

function getSwapMessage(address: string) {
  return {
    account_number: "699332",
    chain_id: "osmosis-1",
    fee: {
      amount: [
        {
          amount: "0",
          denom: "uosmo",
        },
      ],
      gas: "250000",
    },
    memo: "",
    msgs: [
      {
        type: "osmosis/gamm/swap-exact-amount-in",
        value: {
          routes: [
            {
              pool_id: "1",
              token_out_denom: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
            },
          ],
          sender: address,
          token_in: {
            amount: "1000",
            denom: "uosmo",
          },
          token_out_min_amount: "82",
        },
      },
    ],
    sequence: "8",
  }
}
function getSendMessage(address: string) {
  return {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress: "osmo1dly8k29955s6vn9k9h2mlwdredln2qsg9wt4f0",
      toAddress: "osmo1dly8k29955s6vn9k9h2mlwdredln2qsg9wt4f0",
      amount: [
        {
          denom: "uosmo",
          amount: "1000",
        }
      ],
    }
  }
}

const arbitraryPayload = {
  domain: "test.com",
  expire_at: 1657293505
}

export const useBitsongConnectionStore = defineStore('bitsongJS', () => {
  let c = ref<Connector>()
  let address = ref<string>()

  function openConnection()
  {
    c.value = new Connector({
      name: "Test BitsongJS DApp",
      url: "Megaurl.top",
    })
    c.value.on("connect", async () => {
      if(c.value === undefined || c.value.accounts.length < 1) return
      address.value = await c.value.getAddress("osmo")
    })
  }

  async function sign()
  {
    if(c.value == undefined || address.value === undefined) return
    console.log("Sign", await c.value.sign("bwasmnet-1", getSwapMessage(address.value)))
  }
  async function broadcast()
  {
    if(c.value == undefined || address.value === undefined) return
    console.log("Broadcast", await c.value.signAndBroadcast("osmosis-1", [getSendMessage(address.value)]))
  }
  async function signArbitrary()
  {
    if(c.value == undefined || address.value === undefined) return
    console.log("Arbitrary", await c.value.signArbitrary("osmosis-1", arbitraryPayload))
  }

  return { connection: c, openConnection, sign, broadcast, signArbitrary }
})
