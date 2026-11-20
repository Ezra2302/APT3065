import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Card, Muted, Button, Label } from '../components';
import { colors, font, spacing } from '../theme';
import { statusText } from './HomeScreen';

// Shows where a request is in the flow: sent → matching → accepted.
export default function StatusScreen({ request, onBack, onQuickExit, onChat }) {
  if (!request) return null;
  const urgent = request.type === 'urgent';
  const steps = urgent
    ? ['Report received', 'Verifying with triage staff', 'Handed to the right channel']
    : ['Request sent', 'Matching helpers', 'Helper accepted'];
  const current = request.status === 'accepted' ? 2 : 1;

  return (
    <Screen title={urgent ? 'Report status' : 'Your request'} onBack={onBack} onQuickExit={onQuickExit}>
      <Card style={{ alignItems: 'center', gap: 4 }}>
        <Label>Your anonymous case ID</Label>
        <Text style={{ fontSize: font.hero, fontWeight: '800', color: colors.primaryDark, letterSpacing: 2 }}>
          {request.id}
        </Text>
        <Muted style={{ textAlign: 'center' }}>Write it down or remember it. It is the only way to find your case.</Muted>
      </Card>

      <Card style={{ gap: spacing.md }}>
        {steps.map((s, i) => {
          const done = i < current || request.status === 'accepted';
          const active = i === current && request.status !== 'accepted';
          return (
            <View key={s} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
              <View
                style={{
                  width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: done ? colors.success : active ? colors.primary : colors.border,
                }}
              >
                <Text style={{ color: colors.white, fontWeight: '800' }}>{done ? '✓' : i + 1}</Text>
              </View>
              <Text style={{ fontSize: font.body, color: done || active ? colors.text : colors.textMuted, fontWeight: active ? '700' : '500' }}>
                {s}
              </Text>
            </View>
          );
        })}
      </Card>

      <Card style={{ backgroundColor: request.status === 'accepted' ? colors.successLight : colors.primaryLight, borderColor: 'transparent' }}>
        <Text style={{ fontWeight: '700', color: colors.text }}>{statusText(request)}</Text>
        {request.status === 'escalated' && (
          <Muted>If nobody answers in time, we automatically ask more helpers, then staff. You are not forgotten.</Muted>
        )}
        {urgent && request.status === 'accepted' && (
          <Muted>A trained person has verified your report. Police are never sent automatically by the app.</Muted>
        )}
      </Card>

      {!urgent && request.status === 'accepted' && <Button label={`Message ${request.helper.split(' ')[0]}`} onPress={onChat} />}
      <Button variant="secondary" label="Back to home" onPress={onBack} />
    </Screen>
  );
}
