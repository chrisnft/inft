import { createClientAPI } from '../src/api/api'
import depJSON from '../src/deployment.json'

// describe('Calculator tests', () => {
//   test('adding 1 + 2 should return 3', () => {
//     expect(3).toBe(3)
//   })
// })

const devKey =
  '0x31c356d3f6c570c2a28a79a02cdb3218ff078c64c3224c4a943776c645f762dd'
const contractAddr = depJSON.address
const contractAbi = depJSON.abi

const api = createClientAPI(contractAddr, contractAbi, { devKey: devKey })

api.fetchNetwork().then((v) => console.log(v))

// dotenv.config()

// console.log(process.env)

// const devKey =
//   '0x31c356d3f6c570c2a28a79a02cdb3218ff078c64c3224c4a943776c645f762dd'
// const contractAddr = depJSON.address
// const contractAbi = depJSON.abi

// // const api = createClientAPI(contractAddr, contractAbi, { devKey: devKey })

// const clients = createClients(contractAddr, contractAbi)
// console.log(clients)

// const clientB = createClients(contractAddr, contractAbi, { devKey: devKey })
// console.log(clientB)

// console.log(clientB.opts)

// // const networkResult = api.fetchNetwork()
