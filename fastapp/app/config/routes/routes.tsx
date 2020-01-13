import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// Pages
import HomeScreen from '../../screens/Login';
import RegisterTypeProfileScreen from '../../screens/CadastroSelecionePerfil';
import RegisterProfileScreen from '../../screens/CadastroProfile';

const MainNavigator = createStackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: null
    }) 
  },
  RegisterTypeProfile: { 
    screen: RegisterTypeProfileScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: null
    }) 
  },
  RegisterProfile: { 
    screen: RegisterProfileScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: null
    }) 
  }
});

export default createAppContainer(MainNavigator);
