import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';
import { Screen, Card, Muted } from '../components';
import { LEARN_TOPICS } from '../data';
import { colors, font } from '../theme';

// Expandable list of reviewed facts. Tap a topic to open it.
export default function LearnScreen({ onBack, onQuickExit }) {
  const [open, setOpen] = useState(0);

  return (
    <Screen title="Learn and understand" onBack={onBack} onQuickExit={onQuickExit}>
      {LEARN_TOPICS.map((t, i) => (
        <Pressable key={t.title} onPress={() => setOpen(open === i ? -1 : i)} accessibilityRole="button">
          <Card style={open === i && { borderColor: colors.primary }}>
            <Text style={{ fontSize: font.body + 1, fontWeight: '700', color: colors.text }}>
              {t.icon}  {t.title}  <Text style={{ color: colors.primaryDark }}>{open === i ? '−' : '+'}</Text>
            </Text>
            {open === i && <Muted style={{ marginTop: 8, fontSize: font.body, lineHeight: 24 }}>{t.body}</Muted>}
          </Card>
        </Pressable>
      ))}
      <Muted style={{ textAlign: 'center' }}>Sources: WHO, UNICEF, KDHS 2022, UN General Assembly (2012).</Muted>
    </Screen>
  );
}
