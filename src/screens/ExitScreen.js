import React from 'react';
import { Text, View, Pressable } from 'react-native';

// "Quick exit" lands here: a plain weather screen that hides what the app is.
// Long-press the temperature to return to Lantern Circle.
export default function ExitScreen({ onReturn }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Text style={{ color: 'white', fontSize: 20 }}>Nairobi</Text>
      <Pressable onLongPress={onReturn} delayLongPress={1500}>
        <Text style={{ color: 'white', fontSize: 80, fontWeight: '200' }}>24°</Text>
      </Pressable>
      <Text style={{ color: 'white', fontSize: 18 }}>☁️ Partly cloudy</Text>
      <Text style={{ color: '#DCEBFA', fontSize: 15 }}>H: 27°  L: 15°</Text>
    </View>
  );
}
