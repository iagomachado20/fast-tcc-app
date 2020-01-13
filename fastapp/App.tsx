import React from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Root } from 'native-base';

import NavigationRoutes from './app/config/routes/routes';

const App = NavigationRoutes;

class MainNavigation extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }


  render() {

    if (!this.state.isReady) {
      return <AppLoading/>;
    }

    return (
      <Root>
        <App></App>
      </Root>
    );
  }


}

export default MainNavigation;
