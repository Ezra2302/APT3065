import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Screen, Card, Label, Chips, Button, Muted } from '../components';
import { styles } from '../components';
import { colors, font } from '../theme';

const WHEN = ['Within days', 'Within weeks', 'Not sure'];

// Report a girl at risk. Only goes to human triage staff (slide 12).
export default function ReportScreen({ onBack, onQuickExit, onSubmit }) {
  const [area, setArea] = useState('');
  const [when, setWhen] = useState(WHEN[2]);
  const [details, setDetails] = useState('');

  return (
    <Screen title="Report a girl at risk" onBack={onBack} onQuickExit={onQuickExit}>
      <Card style={{ backgroundColor: colors.urgentLight, borderColor: colors.urgent }}>
        <Muted style={{ color: colors.text }}>
          🚨 If she is in danger right now, call 999 or the free child helpline 116. Your report here is
          read by verified staff, who decide the next safe step. You stay anonymous.
        </Muted>
      </Card>

      <Label>General area (county or town)</Label>
      <TextInput value={area} onChangeText={setArea} placeholder="e.g. Kajiado" style={input} placeholderTextColor={colors.textMuted} />

      <Label>When might it happen?</Label>
      <Chips options={WHEN} value={when} onChange={setWhen} />

      <Label>What do you know? (optional)</Label>
      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Only share what you are comfortable with. No names needed."
        placeholderTextColor={colors.textMuted}
        multiline
        style={[input, { minHeight: 110, textAlignVertical: 'top' }]}
      />

      <Button variant="urgent" label="Send to triage staff" disabled={!area.trim()} onPress={() => onSubmit({ area, when, details })} />
    </Screen>
  );
}

const input = [
  styles.card,
  { fontSize: font.body, color: colors.text, paddingVertical: 14 },
];
