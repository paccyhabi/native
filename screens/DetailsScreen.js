
import * as React from 'react';
import { View, Text, Button } from 'react-native';
    function DetailsScreen({ navigation }) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
              title="Go to Details... again"
              onPress={() => navigation.navigate('Details')}
            />
          </View>
        );
}

export default DetailsScreen;