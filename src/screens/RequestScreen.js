import React, { useState } from 'react';
import { Screen, OptionCard, Label, Chips, Button, Muted } from '../components';
import { HELP_TYPES, LANGUAGES, PROFESSIONAL_KINDS } from '../data';

// Step-by-step form: what help → (which professional) → language → send.
export default function RequestScreen({ onBack, onQuickExit, onSubmit }) {
  const [type, setType] = useState(null);
  const [kind, setKind] = useState(PROFESSIONAL_KINDS[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  return (
    <Screen title="Request support" onBack={onBack} onQuickExit={onQuickExit}>
      <Label>1. What kind of help?</Label>
      {HELP_TYPES.map((t) => (
        <OptionCard
          key={t.id}
          icon={t.icon}
          title={t.title}
          description={t.description}
          selected={type === t.id}
          onPress={() => setType(t.id)}
        />
      ))}

      {type === 'professional' && (
        <>
          <Label>Which professional?</Label>
          <Chips options={PROFESSIONAL_KINDS} value={kind} onChange={setKind} />
        </>
      )}

      <Label>2. Preferred language</Label>
      <Chips options={LANGUAGES} value={language} onChange={setLanguage} />

      <Muted>We will not ask your name. You will get a case ID to follow your request.</Muted>

      <Button
        label="Send request"
        disabled={!type}
        onPress={() => onSubmit({ type, kind: type === 'professional' ? kind : null, language })}
      />
    </Screen>
  );
}
