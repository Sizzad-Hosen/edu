/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Calculator, GraduationCap, Microscope, Languages, Heart, Star, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
import { SUBJECT_DATA, QuizQuestion } from './data/content';
import { sounds } from './lib/sounds';

type Page = 'home' | 'subjects' | 'lesson';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [history, setHistory] = useState<Page[]>(['home']);
  const [selectedClass, setSelectedClass] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('math');
  const [totalStars, setTotalStars] = useState<number>(0);

  const navigateTo = (page: Page) => {
    sounds.click();
    setHistory([...history, page]);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    sounds.pop();
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue/30 selection:text-blue">
      <Navbar onBack={goBack} showBack={currentPage !== 'home'} />
      
      <main className="pb-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <HomePage 
              onSelectClass={(cls) => {
                setSelectedClass(cls);
                navigateTo('subjects');
              }} 
              totalStars={totalStars}
            />
          )}

          {currentPage === 'subjects' && (
            <SubjectsPage 
              selectedClass={selectedClass}
              onSelectSubject={(sub) => {
                setSelectedSubject(sub);
                navigateTo('lesson');
              }}
            />
          )}

          {currentPage === 'lesson' && (
            <LessonPage 
              subjectKey={selectedSubject} 
              onEarnStars={(amount) => setTotalStars(prev => prev + amount)}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-8 text-text-light text-sm border-t border-gray-200/50 mt-10">
        শিখি আনন্দে © ২০২৪ | বাংলাদেশ NCTB সিলেবাস অনুযায়ী
      </footer>
    </div>
  );
}

function Navbar({ onBack, showBack }: { onBack: () => void, showBack: boolean }) {
  return (
    <nav className="sticky top-0 z-50 bg-blue px-4 py-3 flex items-center justify-between shadow-lg shadow-blue/20">
      <div className="font-display text-2xl font-extrabold text-yellow">
        শিখি <span className="text-white">আনন্দে</span> 🌟
      </div>
      {showBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={16} />
          পেছনে যাও
        </button>
      )}
    </nav>
  );
}

function HomePage({ onSelectClass, totalStars }: { onSelectClass: (cls: number) => void, totalStars: number }) {
  const handleSelect = (cls: number) => {
    sounds.click();
    onSelectClass(cls);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <div className="bg-gradient-to-br from-blue to-[#0A6B8A] py-12 px-6 text-center relative overflow-hidden">
        {/* Simple background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="absolute top-4 left-0 right-0 text-white/30 font-display text-sm tracking-widest uppercase">
          shkhianonda.com
        </div>
        <motion.span 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl block mb-4"
        >
          🏫
        </motion.span>
        <h1 className="font-display text-4xl font-extrabold text-yellow mb-2">শিখি আনন্দে!</h1>
        <p className="text-white/90 text-lg font-medium">বাংলাদেশের ক্লাস ১–৩ এর জন্য মজার পড়াশোনা</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-10">
        <h2 className="font-display text-2xl font-bold text-center mb-8 text-text">
          তোমার <span className="text-orange">ক্লাস</span> বেছে নাও
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ClassCard cls={1} emoji="🐣" title="ক্লাস ১" subtitle="একদম নতুন শুরু!" count="৬টি বিষয়" color="#FF6B35" onClick={() => handleSelect(1)} />
          <ClassCard cls={2} emoji="🌱" title="ক্লাস ২" subtitle="আরও শিখছি প্রতিদিন" count="৬টি বিষয়" color="#06D6A0" onClick={() => handleSelect(2)} />
          <ClassCard cls={3} emoji="🌟" title="ক্লাস ৩" subtitle="বড় হচ্ছি, বেশি শিখছি!" count="৬টি বিষয়" color="#7B5EA7" onClick={() => handleSelect(3)} />
        </div>

        <div className="mt-12 text-center">
          <div className="flex justify-center gap-1.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < (totalStars % 6) ? 'fill-yellow text-yellow' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-text-light text-sm">তোমার মোট তারা: <strong className="text-text">{totalStars}</strong></p>
        </div>
      </div>
    </motion.div>
  );
}

function ClassCard({ cls, emoji, title, subtitle, count, color, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ y: -8 }}
      onHoverStart={() => sounds.pop()}
      onClick={onClick}
      className="bg-white rounded-xl p-8 text-center border-b-6 shadow-md hover:shadow-xl transition-all relative overflow-hidden group w-full"
      style={{ borderBottomColor: color }}
    >
      <span className="text-6xl block mb-4 transition-transform group-hover:scale-110">{emoji}</span>
      <h3 className="font-display text-2xl font-extrabold mb-1">{title}</h3>
      <p className="text-text-light text-sm font-medium mb-4">{subtitle}</p>
      <span 
        className="inline-block px-4 py-1.5 rounded-full text-xs font-bold"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {count}
      </span>
    </motion.button>
  );
}

function SubjectsPage({ selectedClass, onSelectSubject }: { selectedClass: number, onSelectSubject: (sub: string) => void }) {
  const headerColors = [
    'from-orange to-orange/80',
    'from-green to-green/80',
    'from-purple to-purple/80'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className={`py-12 px-6 text-center text-white bg-gradient-to-br ${headerColors[selectedClass-1]}`}>
        <h2 className="font-display text-3xl font-extrabold mb-2">ক্লাস {selectedClass === 1 ? '১' : selectedClass === 2 ? '২' : '৩'}</h2>
        <p className="text-white/80">একটা বিষয় বেছে নাও</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SubjectCard icon={<BookOpen size={30} />} title="বাংলা" desc="বর্ণ, শব্দ, কবিতা, গল্প" color="orange" onClick={() => onSelectSubject('bangla')} />
        <SubjectCard icon={<Languages size={30} />} title="English" desc="Alphabet, Words, Sentences" color="blue" onClick={() => onSelectSubject('english')} />
        <SubjectCard icon={<Calculator size={30} />} title="গণিত" desc="সংখ্যা, যোগ, বিয়োগ, আকৃতি" color="yellow" onClick={() => onSelectSubject('math')} />
        <SubjectCard icon={<Microscope size={30} />} title="প্রাথমিক বিজ্ঞান" desc="প্রকৃতি, প্রাণী, পরিবেশ" color="green" onClick={() => onSelectSubject('science')} />
        <SubjectCard icon={<GraduationCap size={30} />} title="বাংলাদেশ পরিচয়" desc="দেশ, সমাজ, ইতিহাস" color="red" onClick={() => onSelectSubject('bangladesh')} />
        <SubjectCard icon={<Heart size={30} />} title="ধর্ম শিক্ষা" desc="নৈতিকতা, মূল্যবোধ" color="purple" onClick={() => onSelectSubject('religion')} />
      </div>
    </motion.div>
  );
}

function SubjectCard({ icon, title, desc, color, onClick }: any) {
  const handleClick = () => {
    sounds.click();
    onClick();
  };
  const colorMap: any = {
    orange: 'bg-orange/10 text-orange border-orange/20 hover:border-orange',
    blue: 'bg-blue/10 text-blue border-blue/20 hover:border-blue',
    yellow: 'bg-yellow/10 text-yellow border-yellow/20 hover:border-yellow',
    green: 'bg-green/10 text-green border-green/20 hover:border-green',
    red: 'bg-red/10 text-red border-red/20 hover:border-red',
    purple: 'bg-purple/10 text-purple border-purple/20 hover:border-purple',
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => sounds.pop()}
      onClick={handleClick}
      className={`bg-white rounded-xl p-6 flex items-center gap-4 text-left border-2 transition-all shadow-sm w-full ${colorMap[color].split(' ').slice(2).join(' ')}`}
    >
      <div className={`p-4 rounded-xl shrink-0 ${colorMap[color].split(' ').slice(0, 2).join(' ')}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-xl text-text">{title}</h3>
        <p className="text-text-light text-xs font-medium">{desc}</p>
      </div>
    </motion.button>
  );
}

function LessonPage({ subjectKey, onEarnStars }: { subjectKey: string, onEarnStars: (amount: number) => void }) {
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'quiz' | 'practice' | 'fun'>('video');
  const data = SUBJECT_DATA[subjectKey];

  if (!data) return <div className="p-10 text-center">Data not found!</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-6 text-center">
        <h2 className="font-display text-3xl font-extrabold text-text flex items-center justify-center gap-3">
          {data.title}
        </h2>
        <p className="text-text-light mt-2">{data.subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
        <div className="flex justify-center min-w-max">
          <TabButton active={activeTab === 'video'} onClick={() => setActiveTab('video')}>📹 ভিডিও</TabButton>
          <TabButton active={activeTab === 'notes'} onClick={() => setActiveTab('notes')}>📖 নোটস</TabButton>
          {data.interactiveItems && (
            <TabButton active={activeTab === 'fun'} onClick={() => setActiveTab('fun')}>✨ মজার পড়া</TabButton>
          )}
          <TabButton active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')}>🎯 কুইজ</TabButton>
          <TabButton active={activeTab === 'practice'} onClick={() => setActiveTab('practice')}>✏️ অনুশীলন</TabButton>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'video' && (
            <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <VideoTab videos={data.videos} />
            </motion.div>
          )}
          {activeTab === 'notes' && (
            <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <NotesTab notes={data.notes} />
            </motion.div>
          )}
          {activeTab === 'fun' && data.interactiveItems && (
            <motion.div key="fun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InteractiveTab items={data.interactiveItems} />
            </motion.div>
          )}
          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuizTab questions={data.quiz} onFinish={onEarnStars} />
            </motion.div>
          )}
          {activeTab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PracticeTab type={data.practiceType} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TabButton({ children, active, onClick }: any) {
  const handleClick = () => {
    sounds.click();
    onClick();
  };
  return (
    <button 
      onClick={handleClick}
      className={`px-6 py-4 font-semibold text-lg border-b-3 transition-colors ${active ? 'border-blue text-blue' : 'border-transparent text-text-light hover:text-blue/80'}`}
    >
      {children}
    </button>
  );
}

function InteractiveTab({ items }: { items: string[] }) {
  const handleItemClick = (item: string) => {
    // Just speak without the pop sound to make it clearer for letters
    sounds.speak(item);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 justify-center">
        <Sparkles className="text-yellow" />
        ক্লিক করে শেখো!
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {items.map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleItemClick(item)}
            className="aspect-square bg-gradient-to-br from-blue/5 to-blue/10 border-2 border-blue/20 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-blue hover:border-blue transition-colors shadow-sm"
          >
            {item}
          </motion.button>
        ))}
      </div>
      <p className="text-center mt-8 text-text-light font-medium italic">বর্ণ বা সংখ্যায় ক্লিক করো!</p>
    </div>
  );
}

function VideoTab({ videos }: { videos: any[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {videos.map((v, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-video bg-black relative">
            <iframe 
              src={`https://www.youtube.com/embed/${v.ytId}?rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer"
              title={v.title}
            ></iframe>
          </div>
          <div className="p-5 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl mb-1">{v.title}</h3>
              <p className="text-text-light text-sm">{v.desc}</p>
            </div>
            <span className="bg-blue/10 text-blue text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              ⏱ {v.duration}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function NotesTab({ notes }: { notes: any[] }) {
  const colorMap: any = {
    orange: 'border-orange bg-orange/5',
    blue: 'border-blue bg-blue/5',
    green: 'border-green bg-green/5',
    purple: 'border-purple bg-purple/5',
    red: 'border-red bg-red/5',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {notes.map((n, i) => (
        <div key={i} className={`bg-white rounded-xl p-8 border-l-6 shadow-sm ${colorMap[n.color]}`}>
          <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
            <span className="text-3xl">{n.icon}</span>
            {n.title}
          </h3>
          <p className="text-lg leading-relaxed mb-6">{n.text}</p>
          
          {n.type === 'words' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {n.words.map((w: string, idx: number) => (
                <div key={idx} className="bg-white border-2 border-blue/20 rounded-xl p-3 text-center text-xl font-bold text-blue shadow-sm">
                  {w}
                </div>
              ))}
            </div>
          )}

          {n.type === 'text' && n.highlight && (
            <div className="bg-yellow/10 border-2 border-dashed border-yellow rounded-xl p-5 text-xl font-bold leading-loose whitespace-pre-line text-center">
              {n.highlight}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

function QuizTab({ questions, onFinish }: { questions: QuizQuestion[], onFinish: (s: number) => void }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[index].ans) {
      setScore(prev => prev + 1);
      sounds.success();
    } else {
      sounds.error();
    }
  };

  const next = () => {
    sounds.click();
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
      const earned = score === questions.length ? 3 : score >= (questions.length * 0.6) ? 2 : 1;
      onFinish(earned);
      sounds.collect();
    }
  };

  const restart = () => {
    sounds.pop();
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  if (isFinished) {
    const pct = (score / questions.length) * 100;
    const emoji = pct === 100 ? '🏆' : pct >= 60 ? '🌟' : '💪';
    const msg = pct === 100 ? 'অসাধারণ! তুমি সব ঠিক বলেছ!' : pct >= 60 ? 'বাহ! খুব ভালো করেছ!' : 'চেষ্টা থামিও না!';
    const earned = pct === 100 ? 3 : pct >= 60 ? 2 : 1;

    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
        <span className="text-8xl block mb-6">{emoji}</span>
        <div className="font-display text-7xl font-extrabold text-blue mb-2 leading-none">{score}/{questions.length}</div>
        <div className="text-2xl font-bold text-text mb-8">{msg}</div>
        <div className="flex justify-center gap-2 mb-10">
          {[...Array(3)].map((_, i) => (
            <Star key={i} className={`w-10 h-10 ${i < earned ? 'fill-yellow text-yellow' : 'text-gray-200'}`} />
          ))}
        </div>
        <button onClick={restart} className="bg-orange text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
          <RefreshCw size={24} />
          আবার চেষ্টা করো
        </button>
      </motion.div>
    );
  }

  const q = questions[index];
  const pct = (index / questions.length) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="quiz-container">
      <div className="flex items-center gap-6 mb-10">
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            className="h-full bg-gradient-to-r from-green to-blue" 
          />
        </div>
        <span className="font-bold text-text-light whitespace-nowrap">{index + 1}/{questions.length}</span>
        <div className="bg-yellow text-text font-bold px-4 py-1 rounded-full flex items-center gap-2">
          <Star size={18} className="fill-text" /> {score}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <motion.span 
          key={index}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl block text-center mb-6"
        >
          {q.emoji}
        </motion.span>
        <h3 className="text-2xl font-bold text-center mb-8">{q.q}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.opts.map((opt, i) => {
            const isCorrect = i === q.ans;
            const isSelected = selected === i;
            let btnClass = "bg-gray-50 border-3 border-gray-100 hover:border-blue/50 hover:bg-blue/5";
            if (selected !== null) {
              if (isCorrect) btnClass = "bg-green/10 border-green text-green font-bold";
              else if (isSelected) btnClass = "bg-red/10 border-red text-red font-bold";
              else btnClass = "opacity-50 grayscale border-gray-100";
            }

            return (
              <button 
                key={i}
                disabled={selected !== null}
                onClick={() => handleAnswer(i)}
                className={`p-5 rounded-xl text-left text-xl transition-all flex items-center gap-3 ${btnClass}`}
              >
                <span className="opacity-50 text-sm">
                  {['🅰️','🅱️','🅲️','🅳️'][i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-xl text-center font-bold text-xl ${selected === q.ans ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}
          >
            {selected === q.ans ? '✅ দারুণ! সঠিক উত্তর!' : '❌ ঠিক হয়নি। আবার পড়ো!'}
          </motion.div>
        )}

        <button 
          onClick={next}
          disabled={selected === null}
          className={`w-full mt-6 py-5 rounded-xl font-bold text-xl shadow-lg transition-all ${selected !== null ? 'bg-blue text-white active:scale-95' : 'bg-gray-200 text-gray-400 grayscale pointer-events-none'}`}
        >
          {index === questions.length - 1 ? '🏁 ফলাফল দেখো' : 'পরের প্রশ্ন →'}
        </button>
      </div>
    </motion.div>
  );
}

function PracticeTab({ type }: { type: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const handleInput = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  const getStatusClass = (id: string, correct: string) => {
    if (!checked) return "border-blue";
    return (answers[id] || '').trim() === correct ? "border-green text-green" : "border-red text-red";
  };

  const check = () => {
    sounds.click();
    setChecked(true);
    // Rough check if all inputs match something correct (just for sound feedback)
    // In a real app we'd be more specific
    const hasWrong = Object.keys(answers).length === 0;
    if (hasWrong) sounds.error(); else sounds.success();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      {type === 'math' && (
        <>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calculator size={24} className="text-blue" />
              যোগ অনুশীলন — শূন্যস্থান পূরণ করো
            </h3>
            <div className="text-3xl font-bold space-y-6 leading-loose text-center">
              <div>৪ + ৫ = <input type="number" onChange={e => handleInput('m1', e.target.value)} className={`w-20 border-b-4 outline-none text-center bg-transparent ${getStatusClass('m1', '9')}`} /></div>
              <div>৭ + ৩ = <input type="number" onChange={e => handleInput('m2', e.target.value)} className={`w-20 border-b-4 outline-none text-center bg-transparent ${getStatusClass('m2', '10')}`} /></div>
              <div>২ + ৮ = <input type="number" onChange={e => handleInput('m3', e.target.value)} className={`w-20 border-b-4 outline-none text-center bg-transparent ${getStatusClass('m3', '10')}`} /></div>
            </div>
            <button onClick={check} className="mt-10 mx-auto block bg-green text-white px-10 py-3 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform">
              ✅ উত্তর দেখো
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Star size={24} className="text-yellow" />
              সংখ্যার ক্রম — সঠিক সংখ্যা লেখো
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-3 text-3xl font-extrabold">
              <SeqNum>১</SeqNum>
              <SeqNum>২</SeqNum>
              <input type="number" onChange={e => handleInput('s1', e.target.value)} className={`w-16 h-16 border-4 rounded-2xl text-center shadow-inner ${getStatusClass('s1', '3')}`} />
              <SeqNum>৪</SeqNum>
              <SeqNum>৫</SeqNum>
              <input type="number" onChange={e => handleInput('s2', e.target.value)} className={`w-16 h-16 border-4 rounded-2xl text-center shadow-inner ${getStatusClass('s2', '6')}`} />
              <SeqNum>৭</SeqNum>
            </div>
            <button onClick={check} className="mt-10 mx-auto block bg-green text-white px-10 py-3 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform">
              ✅ উত্তর দেখো
            </button>
          </div>
        </>
      )}

      {type !== 'math' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 size={24} className="text-green" />
            শূন্যস্থান পূরণ করো
          </h3>
          <div className="text-xl font-bold space-y-6 leading-loose">
            {type === 'science' && (
              <>
                <div>পানির উৎস হলো <input onChange={e => handleInput('g1', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('g1', 'নদী')}`} />। (যেমন: নদী)</div>
                <div>আমাদের শরীরের অংশ কোনটি? <input onChange={e => handleInput('g2', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('g2', 'চোখ')}`} />। (যেমন: চোখ)</div>
              </>
            )}
            {type === 'bangla' && (
              <>
                <div>বাংলাদেশের রাজধানী <input onChange={e => handleInput('b1', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('b1', 'ঢাকা')}`} />।</div>
                <div>আমাদের জাতীয় ফুল <input onChange={e => handleInput('b2', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('b2', 'শাপলা')}`} />।</div>
              </>
            )}
            {type === 'bangladesh' && (
              <>
                <div>স্বাধীনতা দিবস <input onChange={e => handleInput('bd1', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-48 ${getStatusClass('bd1', '২৬ মার্চ')}`} />।</div>
                <div>জাতীয় পাখির নাম <input onChange={e => handleInput('bd2', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('bd2', 'দোয়েল')}`} />।</div>
              </>
            )}
            {type === 'religion' && (
              <>
                <div>প্রতিটি ভালো কাজের আগে <input onChange={e => handleInput('r1', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-48 ${getStatusClass('r1', 'বিস্মিল্লাহ')}`} /> বলতে হয়।</div>
                <div>দিনে <input type="number" onChange={e => handleInput('r2', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-20 ${getStatusClass('r2', '৫')}`} /> বার নামাজ পড়া উচিত।</div>
              </>
            )}
            {type === 'english' && (
              <>
                <div>A for <input onChange={e => handleInput('e1', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('e1', 'Apple')}`} />.</div>
                <div>We say "Good <input onChange={e => handleInput('e2', e.target.value)} className={`border-b-4 outline-none text-center bg-transparent px-2 w-32 ${getStatusClass('e2', 'Morning')}`} />" in the morning.</div>
              </>
            )}
          </div>
          <button onClick={check} className="mt-10 mx-auto block bg-green text-white px-10 py-3 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform">
            ✅ উত্তর দেখো
          </button>
        </div>
      )}
    </motion.div>
  );
}

function SeqNum({ children }: any) {
  const handleClick = () => {
    sounds.pop();
    if (typeof children === 'string' || typeof children === 'number') {
      sounds.speak(children.toString());
    }
  };
  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="w-16 h-16 bg-gradient-to-br from-blue to-sky text-white rounded-2xl flex items-center justify-center shadow-md text-3xl font-extrabold cursor-pointer"
    >
      {children}
    </motion.button>
  );
}
