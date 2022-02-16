import Reactotron from 'reactotron-react-js'
import { mst } from "reactotron-mst"

export default Reactotron
  .configure()
  .use(mst())
  .connect()