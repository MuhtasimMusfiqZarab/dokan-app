import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: `flexWrap: `wrap``'];

Reactotron.configure({name: 'MStore'})

Reactotron.useReactNative({
    asyncStorage: { ignore: ['secret'] }
})

Reactotron.use(reduxPlugin())

console.tron = Reactotron