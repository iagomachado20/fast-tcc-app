import React, { useState } from 'react';
import { Avatar } from "../styles/style";
import {
    Text,
    Icon,
    Button
} from "native-base";

import * as ImagePicker from "expo-image-picker";

const AvatarComponent = (props) => {

    const [ picture, setPicture ] = useState(null);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
          quality: 1
        });
    
        if (!result.cancelled) {
          setPicture(result.uri);
          props.onChange(result);
        }

    };

    return (
      
        { picture && 
          <Avatar source={{ uri: picture }} />
        }

        <Button
          iconLeft
          bordered
          success
          style={{ marginTop: 10 }}
          onPress={pickImage}>
          <Icon name="camera" />
          <Text>Selecionar Foto</Text>
        </Button>
    )
}

export default AvatarComponent;