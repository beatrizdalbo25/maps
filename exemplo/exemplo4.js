
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function Exemplo4() {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      const localizacao = await Location.getLastKnownPositionAsync();

      setLocation(localizacao);
    }

    obterLocalizacao();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Minha localização"
            description="Estou aqui!"
          />
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>Obtendo localização...</Text>
        </View>
      )}
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

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});