import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function Exemplo2() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') { // Verifica se a permissão foi concedida
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
      <Text style={styles.title}>Minha localização</Text>

      {location ? (
        <>
          <Text>
            Latitude: {location.coords.latitude}
          </Text>

          <Text>
            Longitude: {location.coords.longitude}
          </Text>
        </>
      ) : (
        <Text>Obtendo localização...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
