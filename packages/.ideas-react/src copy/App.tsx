import * as React from 'react'
import * as view from './components'
import { hooks } from './hooks'
import { API } from './api'
import { config } from './config'

const FJSON = (v: any) => JSON.stringify(v, null, 2)

const initConfig = () => {
  API(config.api)
}

/**
 * Main
 *
 * @component
 *
 * @returns App
 *
 */
function App() {
  const appState = hooks.useApp(config.network, config.defaultNetOptions)

  const formHk = hooks.useForm(config.IPFS_ID, config.IPFS_KEY)

  return (
    <div>
      <div>Hello World</div>
      <view.Form
        handleChange={formHk.handleChange}
        handleDrop={formHk.handleDrop}
        handleSubmit={formHk.handleSubmit}
        vals={formHk.formVals}
      />
      <div>{JSON.stringify(formHk.formVals)}</div>
      {formHk.nftMeta && <view.NFTMetaView {...formHk.nftMeta} />}
      <div>{FJSON(appState)}</div>
    </div>
  )
}

export default App
