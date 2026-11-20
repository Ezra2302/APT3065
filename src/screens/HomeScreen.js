import React from 'react';
import { Text } from 'react-native';
import { Screen, OptionCard, Label, Card, Muted } from '../components';
import { colors, font } from '../theme';

// Main menu with the features from the pitch (slide 10).
export default function HomeScreen({ go, onQuickExit, requests }) {
  const latest = requests[requests.length - 1];

  return (
    <Screen onQuickExit={onQuickExit}>
      <Text style={{ fontSize: font.title + 4, fontWeight: '800', color: colors.text }}>
        How can we help today?
      </Text>
      <Muted>Everything here is anonymous. Take your time.</Muted>

      {latest && (
        <Card style={{ borderColor: colors.primary, backgroundColor: colors.primaryLight }}>
          <Text style={{ fontWeight: '700', color: colors.text }}>Your case {latest.id}</Text>
          <Muted>{statusText(latest)}</Muted>
          <Text onPress={() => go('status', latest.id)} style={{ color: colors.primaryDark, fontWeight: '700', marginTop: 6 }}>
            View case ›
          </Text>
        </Card>
      )}

      <Label>Get support</Label>
      <OptionCard icon="🙋🏾‍♀️" title="Request support" description="Get matched with a peer or professional" onPress={() => go('request')} />
      <OptionCard icon="👥" title="Survivor peer circle" description="Talk with others under a pseudonym" onPress={() => go('peer')} />

      <Label>Protect a girl</Label>
      <OptionCard tone="urgent" icon="🚨" title="Report a girl at risk" description="Goes to verified triage staff only" onPress={() => go('report')} />

      <Label>Learn</Label>
      <OptionCard icon="📚" title="Learn and understand" description="Reviewed facts about FGM, health and rights" onPress={() => go('learn')} />

      <Label>For helpers</Label>
      <OptionCard icon="🧡" title="Volunteer dashboard (demo)" description="See open requests and accept one" onPress={() => go('volunteer')} />
    </Screen>
  );
}

export function statusText(r) {
  if (r.status === 'accepted') return `✅ ${r.helper} is with you`;
  if (r.status === 'escalated') return '⏳ No reply yet — widened the search to more helpers';
  if (r.status === 'triage') return '⏳ Waiting for verified triage staff';
  return '⏳ Finding the right helper…';
}
