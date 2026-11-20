// Small reusable building blocks used by every screen.
import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, spacing, radius, font } from './theme';

// A screen wrapper: header with back button + "Quick exit", then scrollable content.
export function Screen({ title, onBack, onQuickExit, children }) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
            <Text style={styles.headerLink}>‹ Back</Text>
          </Pressable>
        ) : (
          <Text style={styles.brand}>🏮 Lantern Circle</Text>
        )}
        {onQuickExit && (
          <Pressable
            onPress={onQuickExit}
            style={styles.exitButton}
            accessibilityRole="button"
            accessibilityLabel="Quick exit. Leaves the app immediately"
          >
            <Text style={styles.exitText}>✕ Quick exit</Text>
          </Pressable>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </ScrollView>
    </View>
  );
}

// Big, easy-to-tap button. variant: 'primary' | 'secondary' | 'urgent'
export function Button({ label, onPress, variant = 'primary', disabled }) {
  const v = buttonVariants[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: v.bg, borderColor: v.border },
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.4 },
      ]}
    >
      <Text style={[styles.buttonText, { color: v.text }]}>{label}</Text>
    </Pressable>
  );
}

// A tappable card with an emoji icon, title and short description.
export function OptionCard({ icon, title, description, onPress, selected, tone = 'normal' }) {
  const urgent = tone === 'urgent';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={({ pressed }) => [
        styles.card,
        styles.optionCard,
        urgent && { backgroundColor: colors.urgentLight, borderColor: colors.urgent },
        selected && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.optionIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.optionTitle, urgent && { color: colors.urgent }]}>{title}</Text>
        {description ? <Text style={styles.muted}>{description}</Text> : null}
      </View>
      <Text style={styles.chevron}>{selected ? '✓' : '›'}</Text>
    </Pressable>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// Row of pill-shaped choices (e.g. language).
export function Chips({ options, value, onChange }) {
  return (
    <View style={styles.chips}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && { color: colors.white }]}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Label({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

export function Muted({ children, style }) {
  return <Text style={[styles.muted, style]}>{children}</Text>;
}

const buttonVariants = {
  primary: { bg: colors.primary, border: colors.primary, text: colors.white },
  secondary: { bg: colors.white, border: colors.border, text: colors.text },
  urgent: { bg: colors.urgent, border: colors.urgent, text: colors.white },
};

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 52,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { fontSize: font.body, fontWeight: '700', color: colors.primaryDark },
  headerLink: { fontSize: font.body, color: colors.primaryDark, fontWeight: '600' },
  exitButton: {
    backgroundColor: colors.text,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  exitText: { color: colors.white, fontWeight: '700', fontSize: font.small },
  content: { padding: spacing.md, paddingBottom: 60, gap: spacing.md },
  title: { fontSize: font.title, fontWeight: '800', color: colors.text },
  button: {
    paddingVertical: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  buttonText: { fontSize: font.body, fontWeight: '700' },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  optionIcon: { fontSize: 28 },
  optionTitle: { fontSize: font.body, fontWeight: '700', color: colors.text, marginBottom: 2 },
  chevron: { fontSize: 22, color: colors.primaryDark, fontWeight: '700' },
  muted: { fontSize: font.small + 1, color: colors.textMuted, lineHeight: 20 },
  label: { fontSize: font.small, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontWeight: '600', color: colors.text },
});
