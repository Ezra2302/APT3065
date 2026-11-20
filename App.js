// Lantern Circle — beginner-friendly prototype.
// App.js holds all the app's data (state) and decides which screen to show.
// No navigation library: `screen` is just a string we switch on.
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import RequestScreen from './src/screens/RequestScreen';
import StatusScreen from './src/screens/StatusScreen';
import ReportScreen from './src/screens/ReportScreen';
import ChatScreen from './src/screens/ChatScreen';
import LearnScreen from './src/screens/LearnScreen';
import VolunteerScreen from './src/screens/VolunteerScreen';
import ExitScreen from './src/screens/ExitScreen';
import { DEMO_HELPERS, makeCaseId, makePseudonym } from './src/data';

// Demo timings (the real system would use minutes, set by staff).
const ESCALATE_AFTER_MS = 6000; // no reply → widen the audience
const AUTO_ACCEPT_AFTER_MS = 12000; // a demo helper accepts

const firstPeerMessages = [
  { from: 'Neema (peer volunteer)', text: 'Welcome to the circle 🧡 This is a safe space. Share only what you want to.' },
  { from: 'Brave Acacia 31', text: 'I joined last month. Talking here helped me a lot.' },
];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [pseudonym] = useState(makePseudonym);
  const [peerMessages, setPeerMessages] = useState(firstPeerMessages);
  const [caseMessages, setCaseMessages] = useState({}); // { caseId: [messages] }

  const go = (name, caseId) => {
    if (caseId) setActiveCaseId(caseId);
    setScreen(name);
  };
  const home = () => setScreen('home');

  // Quick exit: wipe everything from memory and show a harmless weather screen.
  const quickExit = () => {
    setRequests([]);
    setCaseMessages({});
    setPeerMessages(firstPeerMessages);
    setScreen('exit');
  };

  // Update one request by id, keeping the others unchanged.
  const updateRequest = (id, changes) =>
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, ...changes } : r)));

  // First to accept wins: if it is already accepted, nothing happens.
  const acceptRequest = (id, helper) =>
    setRequests((list) =>
      list.map((r) => {
        if (r.id !== id || r.status === 'accepted') return r;
        const pool = DEMO_HELPERS[r.type];
        return { ...r, status: 'accepted', helper: helper || pool[Math.floor(Math.random() * pool.length)] };
      })
    );

  const createRequest = (data) => {
    const id = makeCaseId();
    const isUrgent = data.type === 'urgent';
    setRequests((list) => [...list, { id, ...data, status: isUrgent ? 'triage' : 'matching', createdAt: Date.now() }]);
    setCaseMessages((m) => ({ ...m, [id]: [] }));

    // Simulated escalation timer (APScheduler does this in the real backend).
    if (!isUrgent) {
      setTimeout(
        () => setRequests((list) => list.map((r) => (r.id === id && r.status === 'matching' ? { ...r, status: 'escalated' } : r))),
        ESCALATE_AFTER_MS
      );
    }
    setTimeout(() => acceptRequest(id), AUTO_ACCEPT_AFTER_MS);

    go('status', id);
  };

  const sendCaseMessage = (text) => {
    const req = requests.find((r) => r.id === activeCaseId);
    const add = (msg) => setCaseMessages((m) => ({ ...m, [activeCaseId]: [...(m[activeCaseId] || []), msg] }));
    add({ from: 'me', text });
    setTimeout(() => add({ from: req.helper, text: 'Thank you for telling me. I am here and listening. Take your time.' }), 1500);
  };

  const sendPeerMessage = (text) => {
    setPeerMessages((m) => [...m, { from: 'me', text }]);
    setTimeout(
      () => setPeerMessages((m) => [...m, { from: 'Neema (peer volunteer)', text: 'Thank you for sharing. You are not alone here. 🧡' }]),
      1500
    );
  };

  const activeRequest = requests.find((r) => r.id === activeCaseId);

  let content;
  switch (screen) {
    case 'welcome':
      content = <WelcomeScreen onContinue={home} />;
      break;
    case 'home':
      content = <HomeScreen go={go} onQuickExit={quickExit} requests={requests.filter((r) => r.type !== 'urgent')} />;
      break;
    case 'request':
      content = <RequestScreen onBack={home} onQuickExit={quickExit} onSubmit={createRequest} />;
      break;
    case 'report':
      content = <ReportScreen onBack={home} onQuickExit={quickExit} onSubmit={(d) => createRequest({ type: 'urgent', ...d })} />;
      break;
    case 'status':
      content = <StatusScreen request={activeRequest} onBack={home} onQuickExit={quickExit} onChat={() => go('caseChat')} />;
      break;
    case 'caseChat':
      content = (
        <ChatScreen
          title={`Chat · ${activeCaseId}`}
          subtitle={`You are talking privately with ${activeRequest?.helper}.`}
          me={`Case ${activeCaseId}`}
          messages={caseMessages[activeCaseId] || []}
          onSend={sendCaseMessage}
          onBack={() => go('status')}
          onQuickExit={quickExit}
        />
      );
      break;
    case 'peer':
      content = (
        <ChatScreen
          title="Survivor peer circle"
          subtitle="A moderated group of survivors. Everyone uses a pseudonym."
          me={pseudonym}
          messages={peerMessages}
          onSend={sendPeerMessage}
          onBack={home}
          onQuickExit={quickExit}
        />
      );
      break;
    case 'learn':
      content = <LearnScreen onBack={home} onQuickExit={quickExit} />;
      break;
    case 'volunteer':
      content = <VolunteerScreen requests={requests} onAccept={(id) => acceptRequest(id)} onBack={home} />;
      break;
    case 'exit':
      content = <ExitScreen onReturn={() => setScreen('welcome')} />;
      break;
    default:
      content = null;
  }

  return (
    <>
      <StatusBar style={screen === 'exit' ? 'light' : 'dark'} />
      {content}
    </>
  );
}
