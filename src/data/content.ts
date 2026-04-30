/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Video {
  title: string;
  desc: string;
  duration: string;
  ytId: string;
}

export interface Note {
  color: 'orange' | 'blue' | 'green' | 'purple' | 'red';
  icon: string;
  title: string;
  text: string;
  highlight?: string;
  words?: string[];
  type: 'text' | 'words';
}

export interface QuizQuestion {
  emoji: string;
  q: string;
  opts: string[];
  ans: number;
}

export interface SubjectData {
  title: string;
  subtitle: string;
  videos: Video[];
  notes: Note[];
  quiz: QuizQuestion[];
  practiceType: string;
  interactiveItems?: string[];
}

export const SUBJECT_DATA: Record<string, SubjectData> = {
  bangla: {
    title: '📚 বাংলা',
    subtitle: 'shkhianonda.com - বর্ণমালা থেকে কবিতা — বাংলা শিখি মজা করে!',
    videos: [
      { title: 'সোনামণিদের বর্ণমালা', desc: 'অ, আ, ই, ঈ — সচিত্র এনিমেশন', duration: '৩:৩০', ytId: 'DRk-A1-y1nI' },
      { title: 'ব্যঞ্জনবর্ণের গান', desc: 'ক, খ, গ, ঘ — মন মাতানো সুর', duration: '৪:৪৫', ytId: 'SH3d2V6PNt4' },
      { title: 'টুইনকাল টুইনকাল বাংলা', desc: 'জনপ্রিয় ছড়া ও এনিমেশন', duration: '২:১৫', ytId: '3JZ_D3ELwOQ' },
    ],
    interactiveItems: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ', 'ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ'],
    notes: [
      {
        color: 'orange', icon: '🔤', title: 'স্বরবর্ণ',
        text: 'বাংলা ভাষায় ১১টি স্বরবর্ণ আছে। এগুলো দিয়ে শব্দ তৈরি হয়।',
        highlight: 'অ  আ  ই  ঈ  উ  ঊ  ঋ  এ  ঐ  ও  ঔ',
        type: 'text'
      },
      {
        color: 'blue', icon: '📝', title: 'সহজ শব্দ তৈরি',
        text: 'বর্ণ দিয়ে সহজ শব্দ তৈরি করি:',
        words: ['আম', 'বই', 'মাছ', 'পাখি', 'গরু', 'ফুল'],
        type: 'words'
      },
      {
        color: 'green', icon: '🌸', title: 'কবিতা: আমার সোনার বাংলা',
        text: 'জাতীয় সংগীতের প্রথম দুই লাইন:',
        highlight: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসি।\nচিরদিন তোমার আকাশ তোমার বাতাস আমার প্রাণে বাজায় বাঁশি।',
        type: 'text'
      },
    ],
    quiz: [
      { emoji: '🔤', q: 'কোনটি স্বরবর্ণ?', opts: ['ক', 'অ', 'গ', 'ঘ'], ans: 1 },
      { emoji: '🐟', q: 'মাছ শব্দে কয়টি বর্ণ?', opts: ['২টি', '৩টি', '৪টি', '১টি'], ans: 1 },
      { emoji: '🌸', q: '"আম" শব্দটি কোন ধরনের?', opts: ['ক্রিয়া', 'বিশেষণ', 'বিশেষ্য', 'সর্বনাম'], ans: 2 },
      { emoji: '📖', q: 'বাংলায় স্বরবর্ণ কয়টি?', opts: ['৯টি', '১০টি', '১১টি', '১২টি'], ans: 2 },
      { emoji: '✏️', q: '"বই" শব্দে কোন স্বরবর্ণ আছে?', opts: ['অ', 'ই', 'উ', 'এ'], ans: 1 },
    ],
    practiceType: 'bangla'
  },
  english: {
    title: '🔤 English',
    subtitle: 'shkhianonda.com - Learn English — Alphabet, Words & Sentences!',
    videos: [
      { title: 'Phonics Song for Kids', desc: 'A for Apple, B for Ball animation', duration: '৩:৪৫', ytId: 'hq3yfQnllfQ' },
      { title: 'Numbers Song 1-10', desc: 'Counting is fun with characters!', duration: '৪:১০', ytId: 'DR-cfDsHflE' },
      { title: 'Colors Song', desc: 'Learn Red, Blue, Green animation', duration: '৩:২০', ytId: 'tTQ529pX-Uo' },
    ],
    interactiveItems: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    notes: [
      {
        color: 'blue', icon: '🔡', title: 'The Alphabet',
        text: 'English has 26 letters. A, E, I, O, U are vowels.',
        highlight: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        type: 'text'
      },
      {
        color: 'orange', icon: '🐾', title: 'Animal Words',
        text: 'Learn these animal words:',
        words: ['Cat', 'Dog', 'Bird', 'Fish', 'Cow', 'Hen'],
        type: 'words'
      },
      {
        color: 'green', icon: '👋', title: 'Greetings',
        text: 'Learn how to say hello:',
        highlight: 'Good Morning!\nGood Afternoon!\nGood Evening!\nGood Night!',
        type: 'text'
      },
    ],
    quiz: [
      { emoji: '🍎', q: 'A for ___?', opts: ['Ant', 'Apple', 'Air', 'Age'], ans: 1 },
      { emoji: '🐱', q: 'How many letters in "CAT"?', opts: ['2', '4', '3', '5'], ans: 2 },
      { emoji: '🔡', q: 'How many vowels are there?', opts: ['4', '5', '6', '7'], ans: 1 },
      { emoji: '🌅', q: '"Good ___" — we say in the morning', opts: ['Night', 'Evening', 'Morning', 'Bye'], ans: 2 },
      { emoji: '🐕', q: 'Which is an animal word?', opts: ['Red', 'Big', 'Dog', 'Run'], ans: 2 },
    ],
    practiceType: 'english'
  },
  math: {
    title: '🔢 গণিত',
    subtitle: 'shkhianonda.com - সংখ্যা, যোগ, বিয়োগ — গণিত শিখি খেলার মতো!',
    videos: [
      { title: '১ থেকে ১০ গণনা এনিমেশন', desc: 'সংখ্যা চিনি আর গণনা করতে শিখি', duration: '৫:১৫', ytId: 'DR-cfDsHflE' },
      { title: 'যোগের মজার কার্টুন', desc: 'দুটি সংখ্যা যোগ করার সহজ পদ্ধতি', duration: '৬:৩০', ytId: 'bBmBBJB7YgM' },
      { title: 'আকৃতি ও রং চিনি', desc: 'গোল, চতুর্ভুজ, ত্রিভুজ — এনিমেটেড', duration: '৪:১৮', ytId: 'OmkiBJAT_ms' },
    ],
    interactiveItems: ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০', '১১', '১২', '১৩', '১৪', '১৫', '১৬', '১৭', '১৮', '১৯', '২০'],
    notes: [
      {
        color: 'orange', icon: '🔢', title: '১ থেকে ২০ পর্যন্ত সংখ্যা',
        text: 'এই সংখ্যাগুলো মনে রাখো:',
        highlight: '১  ২  ৩  ৪  ৫  ৬  ৭  ৮  ৯  ১০\n১১ ১২ ১৩ ১৪ ১৫ ১৬ ১৭ ১৮ ১৯ ২০',
        type: 'text'
      },
      {
        color: 'blue', icon: '➕', title: 'যোগের উদাহরণ',
        text: 'যোগ মানে দুটি জিনিস একসাথে মেলানো:',
        highlight: '৩ + ৪ = ৭\n৫ + ৫ = ১০\n৮ + ২ = ১০',
        type: 'text'
      },
      {
        color: 'green', icon: '➖', title: 'বিয়োগের উদাহরণ',
        text: 'বিয়োগ মানে একটা থেকে কিছু নেওয়া:',
        highlight: '১০ − ৩ = ৭\n৮ − ৪ = ৪\n৫ − ১ = ৪',
        type: 'text'
      },
    ],
    quiz: [
      { emoji: '🍎', q: '৩ + ৪ = ?', opts: ['৬', '৭', '৮', '৫'], ans: 1 },
      { emoji: '🔵', q: '১০ − ৩ = ?', opts: ['৬', '৭', '৮', '৫'], ans: 1 },
      { emoji: '⭐', q: '৫ + ৫ = ?', opts: ['৯', '১১', '১০', '৮'], ans: 2 },
      { emoji: '🎯', q: '৯ − ৪ = ?', opts: ['৪', '৫', '৬', '৩'], ans: 1 },
      { emoji: '🔺', q: 'ত্রিভুজের কয়টি বাহু?', opts: ['২টি', '৪টি', '৩টি', '৫টি'], ans: 2 },
    ],
    practiceType: 'math'
  },
  science: {
    title: '🔬 প্রাথমিক বিজ্ঞান',
    subtitle: 'shkhianonda.com - প্রকৃতিকে জানো, বিজ্ঞান বুঝতে পারো!',
    videos: [
      { title: 'প্রাণী ও উদ্ভিদ এনিমেশন', desc: 'জীব ও অজীব বস্তুর পার্থক্য জানি', duration: '৫:০০', ytId: 'ZIQFOhwMYeU' },
      { title: 'পানির গুরুত্ব কার্টুন', desc: 'পানি কেন আমাদের বাঁচিয়ে রাখে', duration: '৪:৩০', ytId: 'x9Cxf60YWLU' },
      { title: 'আমাদের শরীর ও অঙ্গ', desc: 'চোখ, কান, নাক — শরীরের অঙ্গ চিনি', duration: '৫:১৫', ytId: 'R_QcQZB1GHs' },
    ],
    interactiveItems: ['গাছ', 'পানি', 'রোদ', 'বৃষ্টি', 'মানুষ', 'পাখি', 'মাছ', 'মাটি', 'পাথর', 'বই'],
    notes: [
      {
        color: 'green', icon: '🌱', title: 'জীব ও অজীব',
        text: 'পৃথিবীতে দুই ধরনের জিনিস আছে — যেগুলো বাঁচে (জীব) আর যেগুলো বাঁচে না (অজীব)।',
        highlight: 'জীব: গাছ 🌿 মানুষ 👦 প্রাণী 🐄\nঅজীব: পাথর 🪨 পানি 💧 বই 📖',
        type: 'text'
      },
      {
        color: 'blue', icon: '💧', title: 'পানির উৎস',
        text: 'আমরা বিভিন্ন জায়গা থেকে পানি পাই:',
        words: ['নদী', 'পুকুর', 'বৃষ্টি', 'কুয়া', 'সমুদ্র', 'কল'],
        type: 'words'
      },
      {
        color: 'orange', icon: '☀️', title: 'আবহাওয়া',
        text: 'আবহাওয়া বলতে বোঝায় কোনো জায়গার তাপমাত্রা, বৃষ্টি, বাতাস।',
        highlight: 'গরমকাল ☀️ | বর্ষাকাল 🌧️ | শীতকাল ❄️ | বসন্তকাল 🌸',
        type: 'text'
      },
    ],
    quiz: [
      { emoji: '🌿', q: 'গাছ কোন ধরনের বস্তু?', opts: ['অজীব', 'জীব', 'পাথর', 'মাটি'], ans: 1 },
      { emoji: '💧', q: 'পানির উৎস কোনটি?', opts: ['পাথর', 'আগুন', 'নদী', 'বালি'], ans: 2 },
      { emoji: '🌞', q: 'গরমকালে কী বেশি থাকে?', opts: ['বৃষ্টি', 'তুষার', 'রোদ', 'ঠান্ডা'], ans: 2 },
      { emoji: '👁️', q: 'আমরা কী দিয়ে দেখি?', opts: ['কান', 'নাক', 'চোখ', 'হাত'], ans: 2 },
      { emoji: '🐠', q: 'মাছ কোথায় বাস করে?', opts: ['গাছে', 'পানিতে', 'মাটিতে', 'বাতাসে'], ans: 1 },
    ],
    practiceType: 'science'
  },
  bangladesh: {
    title: '🇧🇩 বাংলাদেশ পরিচয়',
    subtitle: 'shkhianonda.com - আমাদের দেশকে চিনি, ভালোবাসি!',
    videos: [
      { title: 'আমার দেশ বাংলাদেশ - কার্টুন', desc: 'বাংলাদেশের পরিচয় ও বিভাগসমূহ', duration: '৫:৪৫', ytId: 'cQp1ZyFi2BE' },
      { title: 'জাতীয় প্রতীক এনিমেশন', desc: 'জাতীয় ফুল, পাখি, ফল কী কী', duration: '৪:২০', ytId: 'a9_SuL0mVbU' },
      { title: 'মুক্তিযুদ্ধের বীরগাথা', desc: '১৯৭১ সালের মুক্তিযুদ্ধের সহজ পরিচয়', duration: '৬:১০', ytId: 'KFUE3V3HCAM' },
    ],
    interactiveItems: ['ঢাকা', 'শাপলা', 'দোয়েল', 'ইলিশ', 'বাঘ', 'কাঁঠাল', '২৬ মার্চ', '১৬ ডিসেম্বর', '২১ ফেব্রুয়ারি'],
    notes: [
      {
        color: 'red', icon: '🇧🇩', title: 'বাংলাদেশের পরিচয়',
        text: 'বাংলাদেশ দক্ষিণ এশিয়ার একটি দেশ। এর রাজধানী ঢাকা এবং জাতীয় ভাষা বাংলা।',
        highlight: 'রাজধানী: ঢাকা 🏙️\nজাতীয় ভাষা: বাংলা\nস্বাধীনতা দিবস: ২৬ মার্চ',
        type: 'text'
      },
      {
        color: 'green', icon: '🌸', title: 'জাতীয় প্রতীক',
        text: 'বাংলাদেশের জাতীয় প্রতীকগুলো:',
        words: ['শাপলা (ফুল)', 'দোয়েল (পাখি)', 'কাঁঠাল (ফল)', 'ইলিশ (মাছ)', 'বাঘ (পশু)', 'জাম (বৃক্ষ)'],
        type: 'words'
      },
      {
        color: 'blue', icon: '🗺️', title: 'বিভাগসমূহ',
        text: 'বাংলাদেশ ৮টি বিভাগে ভাগ করা:',
        highlight: 'ঢাকা | চট্টগ্রাম | রাজশাহী | খুলনা\nসিলেট | বরিশাল | রংপুর | ময়মনসিংহ',
        type: 'text'
      },
    ],
    quiz: [
      { emoji: '🏙️', q: 'বাংলাদেশের রাজধানী কোনটি?', opts: ['চট্টগ্রাম', 'ঢাকা', 'খুলনা', 'সিলেট'], ans: 1 },
      { emoji: '🌸', q: 'বাংলাদেশের জাতীয় ফুল কোনটি?', opts: ['গোলাপ', 'জুঁই', 'শাপলা', 'বেলি'], ans: 2 },
      { emoji: '🐦', q: 'বাংলাদেশের জাতীয় পাখি কোনটি?', opts: ['ময়না', 'দোয়েল', 'কোকিল', 'টিয়া'], ans: 1 },
      { emoji: '📅', q: 'স্বাধীনতা দিবস কবে?', opts: ['১৬ ডিসেম্বর', '২১ ফেব্রুয়ারি', '২৬ মার্চ', '১৫ আগস্ট'], ans: 2 },
      { emoji: '🗺️', q: 'বাংলাদেশে কয়টি বিভাগ আছে?', opts: ['৬টি', '৭টি', '৮টি', '৯টি'], ans: 2 },
    ],
    practiceType: 'bangladesh'
  },
  religion: {
    title: '☪️ ধর্ম শিক্ষা',
    subtitle: 'shkhianonda.com - সত্য কথা বলি, ভালো কাজ করি!',
    videos: [
      { title: 'আল্লাহর সুন্দর সৃষ্টি', desc: 'আল্লাহ এক ও অদ্বিতীয় — সহজ পরিচয়', duration: '৫:৩০', ytId: 'o5PG9EXR1Ww' },
      { title: 'সহজ আদব ও কায়দা', desc: 'বড়দের সম্মান করা, সত্য বলা', duration: '৪:৫০', ytId: 'eesSE2tRQxM' },
      { title: 'নামাজ পড়ার নিয়ম', desc: 'নামাজের নাম ও সময় জানি', duration: '৫:১৫', ytId: '2mJDcEuXMIw' },
    ],
    interactiveItems: ['বিসমিল্লাহ', 'নামাজ', 'পাক-পবিত্র', 'সত্য কথা', 'মা-বাবা', 'নামাজ', 'রোজা', 'হজ', 'যাকাত'],
    notes: [
      {
        color: 'purple', icon: '📖', title: 'বিসমিল্লাহ',
        text: 'প্রতিটি ভালো কাজ শুরু করার আগে আমরা বলি বিসমিল্লাহ।',
        highlight: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nবিসমিল্লাহির রাহমানির রাহিম',
        type: 'text'
      },
      {
        color: 'green', icon: '✅', title: 'ভালো কাজ',
        text: 'ভালো কাজ করলে আল্লাহ খুশি হন:',
        words: ['সত্য বলা', 'মা-বাবাকে মানা', 'নামাজ পড়া', 'সাহায্য করা', 'পরিষ্কার থাকা', 'ভালো ব্যবহার'],
        type: 'words'
      },
      {
        color: 'orange', icon: '🕌', title: 'পাঁচ ওয়াক্ত নামাজ',
        text: 'মুসলমানরা প্রতিদিন ৫ বার নামাজ পড়েন:',
        highlight: 'ফজর | যোহর | আসর | মাগরিব | এশা',
        type: 'text'
      },
    ],
    quiz: [
      { emoji: '🕌', q: 'মুসলমানরা প্রতিদিন কয় ওয়াক্ত নামাজ পড়েন?', opts: ['৩ বার', '৪ বার', '৫ বার', '৬ বার'], ans: 2 },
      { emoji: '📖', q: 'মুসলমানদের ধর্মগ্রন্থের নাম কী?', opts: ['বেদ', 'বাইবেল', 'আল কুরআন', 'গীতা'], ans: 2 },
      { emoji: '⭐', q: 'ভালো কাজ করলে কে খুশি হন?', opts: ['শিক্ষক', 'বন্ধু', 'আল্লাহ', 'প্রতিবেশী'], ans: 2 },
      { emoji: '🌙', q: 'সন্ধ্যার নামাজের নাম কী?', opts: ['ফজর', 'যোহর', 'মাগরিব', 'এশা'], ans: 2 },
      { emoji: '💚', q: 'প্রতিটি ভালো কাজের আগে কী বলতে হয়?', opts: ['আলহামদুলিল্লাহ', 'বিসমিল্লাহ', 'সুবহানাল্লাহ', 'মাশাআল্লাহ'], ans: 1 },
    ],
    practiceType: 'religion'
  }
};
