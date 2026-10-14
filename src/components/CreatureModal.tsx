import React, { useState } from 'react';
import { Organism } from '../types/ecosystem';
import { sound } from '../utils/audio';
import { Volume2, CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreatureModalProps {
  organism: Organism | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  isDiscovered: boolean;
}

export const CreatureModal: React.FC<CreatureModalProps> = ({
  organism,
  onClose,
  onNext,
  onPrev,
  isDiscovered,
}) => {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!organism) return null;

  const playOrganismSound = () => {
    switch (organism.id) {
      case 'kingfisher':
        sound.playBirdChirp();
        break;
      case 'frog':
        sound.playFrogCroak();
        break;
      case 'carp':
      case 'lotus':
        sound.playWaterBubble();
        break;
      case 'ladybug':
      case 'dragonfly':
        sound.playInsectBuzz();
        break;
      case 'mushrooms':
        sound.playSporeChime();
        break;
      default:
        sound.playDiscoveryChime();
    }
  };

  const handleSelectQuiz = (idx: number) => {
    if (hasAnswered) return;
    setSelectedQuizAnswer(idx);
    setHasAnswered(true);

    if (idx === organism.quickQuiz.correctIndex) {
      sound.playDiscoveryChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      sound.playClick();
    }
  };

  const resetQuiz = () => {
    setSelectedQuizAnswer(null);
    setHasAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-500/20 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                  {organism.category}
                </span>
                <span className="px-3 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-bold">
                  {organism.trophicLevelName}
                </span>
                {isDiscovered && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-400 text-green-950 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã khám phá
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {organism.vietnameseName}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 italic font-mono mt-0.5">
                {organism.scientificName} ({organism.name})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={playOrganismSound}
                className="p-3 bg-white/20 hover:bg-white/30 active:scale-95 rounded-2xl text-white transition-all shadow-md"
                title="Nghe âm thanh mô phỏng"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-white/20 hover:bg-rose-500 hover:text-white active:scale-95 rounded-2xl text-white transition-all shadow-md"
                title="Đóng bảng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
          {/* Quick Zone Location */}
          <div className="flex items-center gap-2 text-sm text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-2xl font-semibold border border-emerald-100">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Khu vực sinh sống: <strong>{organism.zoneName}</strong></span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-1">
              Đặc Điểm Nhận Biết
            </h3>
            <p className="text-base text-slate-800 leading-relaxed font-medium">
              {organism.description}
            </p>
          </div>

          {/* Adaptation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
              <div className="text-xs font-bold uppercase text-sky-700 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Tập Tính Thích Nghi
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {organism.adaptation}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="text-xs font-bold uppercase text-amber-700 mb-1 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-amber-600" />
                Chuỗi Thức Ăn & Vai Trò
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {organism.foodSource}
              </p>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
            <span className="text-xs font-extrabold uppercase text-violet-700 flex items-center gap-1.5 mb-1">
              💡 Bạn Có Biết?
            </span>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
              {organism.funFact}
            </p>
          </div>

          {/* Interactive Mini-Quiz for Students */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Câu hỏi khám phá sinh học
                </h4>
              </div>
              {hasAnswered && (
                <button
                  onClick={resetQuiz}
                  className="text-xs text-emerald-700 hover:underline font-semibold"
                >
                  Làm lại câu hỏi
                </button>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-800 mb-3">
              {organism.quickQuiz.question}
            </p>

            <div className="space-y-2">
              {organism.quickQuiz.options.map((opt, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === organism.quickQuiz.correctIndex;
                let btnStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700';

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-green-500 bg-green-50 text-green-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  } else {
                    btnStyle = 'border-slate-200 bg-white opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectQuiz(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 ml-2" />}
                    {hasAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs sm:text-sm border border-emerald-200 font-medium animate-fade-in">
                <strong>Giải thích:</strong> {organism.quickQuiz.explanation}
              </div>
            )}
          </div>
        </div>

        {/* Modal Navigation Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="flex gap-2">
            {onPrev && (
              <button
                onClick={() => {
                  resetQuiz();
                  onPrev();
                }}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ← Loài trước
              </button>
            )}
            {onNext && (
              <button
                onClick={() => {
                  resetQuiz();
                  onNext();
                }}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Loài tiếp theo →
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
};
