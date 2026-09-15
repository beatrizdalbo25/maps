import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Exemplo1() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.1053948,
          longitude: -47.711191,
          latitudeDelta: 0.01, // Isso serve para definir o zoom do mapa, quanto menor o valor, mais próximo será o zoom.
          longitudeDelta: 0.01 // Isso serve para definir o zoom do mapa, quanto menor o valor, mais próximo será o zoom.
        }}
        showsUserLocation={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
