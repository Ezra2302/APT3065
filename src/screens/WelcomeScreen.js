import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Button, Card, Muted } from '../components';
import { colors, font, spacing } from '../theme';

// First screen: explains privacy in plain words before anything else.
export default function WelcomeScreen({ onContinue }) {
  return (
    <Screen>
      <View style={{ alignItems: 'center', marginTop: spacing.lg, gap: spacing.sm }}>
        <Text style={{ fontSize: 64 }}>🏮</Text>
        <Text style={{ fontSize: font.hero, fontWeight: '800', color: colors.text }}>Lantern Circle</Text>
        <Text style={{ fontSize: font.body + 2, color: colors.primaryDark, fontWeight: '600' }}>
          Help that finds you
        </Text>
      </View>

      <Card style={{ gap: spacing.md }}>
        <Point icon="🙈" title="No names needed" text="You get a random case ID. We never ask who you are." />
        <Point icon="🤝" title="The right helper" text="Peers, verified professionals or trained staff — matched to what you need." />
        <Point icon="✕" title="Quick exit" text="Tap “Quick exit” at the top any time to leave instantly." />
      </Card>

      <Muted style={{ textAlign: 'center' }}>
        This is a student prototype (USIU-Africa), not a live service. In an emergency, call 999 or the
        free child helpline 116.
      </Muted>

      <Button label="Get started" onPress={onContinue} />
    </Screen>
  );
}

function Point({ icon, title, text }) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing.md }}>
      <Text style={{ fontSize: 24, width: 32, textAlign: 'center' }}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: font.body, color: colors.text }}>{title}</Text>
        <Muted>{text}</Muted>
      </View>
    </View>
  );
}
