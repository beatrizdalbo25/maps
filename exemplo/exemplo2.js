import * as Location from 'expo-location';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Exemplo2() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState('Aguardando...');

  async function pegarLocalizacao() {
    try {
      setMensagem('Solicitando permissão...');

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      console.log('Status da permissão:', status);

      if (status !== 'granted') {
        setMensagem('Permissão de localização negada.');
        return;
      }

      setMensagem('Buscando localização...');

      console.log('Chamando getLastKnownPositionAsync...');

   
      const location = await Location.getLastKnownPositionAsync();

      console.log('Localização obtida:', location);

      setLatitude(location?.coords.latitude ?? null);
      setLongitude(location?.coords.longitude ?? null);

      setMensagem('Localização encontrada!');
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setMensagem('Erro ao obter localização.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha localização</Text>

      <Button
        title="Pegar localização"
        onPress={pegarLocalizacao}
      />

      <Text>{mensagem}</Text>

      {latitude !== null && longitude !== null && (
        <View>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
