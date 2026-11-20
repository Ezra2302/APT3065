import React, { useState } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import { Screen, Muted, styles as s } from '../components';
import { colors, font, radius, spacing } from '../theme';

// A simple chat. Used for the peer circle and for talking with a matched helper.
// messages: [{ from: 'me' | name, text }]
export default function ChatScreen({ title, subtitle, me, messages, onSend, onBack, onQuickExit }) {
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <Screen title={title} onBack={onBack} onQuickExit={onQuickExit}>
      <Muted>{subtitle}</Muted>
      <Text style={{ color: colors.primaryDark, fontWeight: '700' }}>You appear as: {me}</Text>

      <View style={{ gap: spacing.sm }}>
        {messages.map((m, i) => {
          const mine = m.from === 'me';
          return (
            <View
              key={i}
              style={{
                alignSelf: mine ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                backgroundColor: mine ? colors.primary : colors.white,
                borderWidth: mine ? 0 : 1.5,
                borderColor: colors.border,
                borderRadius: radius.lg,
                padding: 12,
              }}
            >
              {!mine && <Text style={{ fontSize: font.small, fontWeight: '700', color: colors.primaryDark }}>{m.from}</Text>}
              <Text style={{ fontSize: font.body, color: mine ? colors.white : colors.text }}>{m.text}</Text>
            </View>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={send}
          placeholder="Type a message…"
          placeholderTextColor={colors.textMuted}
          style={[s.card, { flex: 1, fontSize: font.body, paddingVertical: 12 }]}
        />
        <Pressable onPress={send} accessibilityLabel="Send message" style={{ backgroundColor: colors.primary, borderRadius: 26, width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.white, fontSize: 20, fontWeight: '800' }}>➤</Text>
        </Pressable>
      </View>
      <Muted style={{ textAlign: 'center' }}>Please don't share real names, phone numbers or places.</Muted>
    </Screen>
  );
}
