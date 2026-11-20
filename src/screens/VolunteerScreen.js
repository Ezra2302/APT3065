import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Card, Muted, Button, Label } from '../components';
import { colors, font, spacing } from '../theme';

// Demo of the helper side: open requests, first to accept takes the case (slide 11).
export default function VolunteerScreen({ requests, onAccept, onBack }) {
  const open = requests.filter((r) => r.status !== 'accepted');
  const done = requests.filter((r) => r.status === 'accepted');

  return (
    <Screen title="Volunteer dashboard" onBack={onBack}>
      <Muted>
        Demo view. In the real system helpers use a web dashboard. A case can only be taken by one helper.
      </Muted>

      <Label>Open requests ({open.length})</Label>
      {open.length === 0 && <Card><Muted>No open requests. Send one from the home screen to try it.</Muted></Card>}
      {open.map((r) => (
        <Card key={r.id} style={{ gap: spacing.sm, borderColor: r.type === 'urgent' ? colors.urgent : colors.border }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '800', fontSize: font.body, color: colors.text }}>{r.id}</Text>
            <Text style={{ color: r.type === 'urgent' ? colors.urgent : colors.primaryDark, fontWeight: '700' }}>
              {r.type === 'urgent' ? 'URGENT · staff only' : r.type === 'peer' ? 'Peer support' : r.kind}
            </Text>
          </View>
          <Muted>{r.type === 'urgent' ? `Area: ${r.area} · ${r.when}` : `Language: ${r.language}`}</Muted>
          <Button
            variant={r.type === 'urgent' ? 'urgent' : 'primary'}
            label={r.type === 'urgent' ? 'Verify as triage staff' : 'Accept this case'}
            onPress={() => onAccept(r.id)}
          />
        </Card>
      ))}

      {done.length > 0 && <Label>Taken</Label>}
      {done.map((r) => (
        <Card key={r.id}>
          <Text style={{ fontWeight: '700', color: colors.text }}>{r.id}</Text>
          <Muted>Taken by {r.helper}</Muted>
        </Card>
      ))}
    </Screen>
  );
}
