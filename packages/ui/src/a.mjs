import { NFTStorage, File, Blob } from 'nft.storage'

const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRBNzYwOGRjQzZmMmE5NTc2RDVkMDJGMTEyNEJGMTBEMTRGQTg4ZDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzODU1Nzk1NjkyOSwibmFtZSI6IkJPT00ifQ.deeyWGjKK8wRHl47Wgu_XZw3gp_7nx287eC1rFnG1mg'
const client = new NFTStorage({ token: apiKey })

//   .store({
//     name: 'Pinpie',
//     description: 'Pin is not delicious beef!',
//     image: new File(
//       [
//         /* data */
//       ],
//       'pinpie.jpg',
//       { type: 'image/jpg' }
//     ),
//   })
//   .then(() => {
//     console.log(metadata.url)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

const metadata = client
  .store({
    name: 'Pinpie',
    description: 'Pin is not delicious beef!',
    image: new Blob(''),
  })
  .then((v) => {
    console.log(v)
  })
  .then(() => console.log(metadata))
  .catch((e) => {
    console.log(e)
  })
