import { useState, useCallback } from 'react';
import LandingPage from './components/Landing/LandingPage';
import ChatInterface from './components/Chat/ChatInterface';
import AnalyzingScreen from './components/Analysis/AnalyzingScreen';
import ReportPage from './components/Report/ReportPage';
import { useChatEngine } from './hooks/useChatEngine';
import { useIkigaiAnalysis } from './hooks/useIkigaiAnalysis';
import { IkigaiResult } from './types/analysis';

type AppView = 'landing' | 'chat' | 'analyzing' | 'report';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [ikigaiResult, setIkigaiResult] = useState<IkigaiResult | null>(null);
  const chat = useChatEngine();
  const analysis = useIkigaiAnalysis();

  const handleStart = useCallback(() => {
    setView('chat');
    setTimeout(() => chat.startChat(), 300);
  }, [chat]);

  const handleChatComplete = useCallback(async () => {
    setView('analyzing');
    const result = await analysis.analyze(chat.state.responses);
    setIkigaiResult(result);
    setView('report');
  }, [analysis, chat.state.responses]);

  return (
    <div className="app">
      {view === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}

      {view === 'chat' && (
        <ChatInterface
          messages={chat.messages}
          isTyping={chat.isTyping}
          isComplete={chat.isComplete}
          progress={chat.progress}
          onSend={chat.sendMessage}
          onComplete={handleChatComplete}
        />
      )}

      {view === 'analyzing' && (
        <AnalyzingScreen />
      )}

      {view === 'report' && ikigaiResult && (
        <ReportPage result={ikigaiResult} userName={chat.state.userName} />
      )}
    </div>
  );
}

export default App;
