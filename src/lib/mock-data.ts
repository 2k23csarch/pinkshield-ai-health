import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctor3 from "@/assets/doctor3.jpg";
import survivor1 from "@/assets/survivor1.jpg";
import survivor2 from "@/assets/survivor2.jpg";
import survivor3 from "@/assets/survivor3.jpg";
import survivor4 from "@/assets/survivor4.jpg";
import survivor5 from "@/assets/survivor5.jpg";
import survivor6 from "@/assets/survivor6.jpg";
import survivor7 from "@/assets/survivor7.jpg";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  experience: number;
  rating: number;
  fee: number;
  available: boolean;
  image: string;
  bio: string;
};

export const DOCTORS: Doctor[] = [
  { id: "d1", name: "Dr. Aanya Mehta", specialty: "Oncologist", hospital: "Apollo Cancer Institute, Mumbai", experience: 18, rating: 4.9, fee: 1200, available: true, image: doctor1, bio: "Leading breast oncologist with two decades of experience in early-stage detection, hormone receptor therapy and post-recovery counseling. Trained at Tata Memorial and Memorial Sloan Kettering." },
  { id: "d2", name: "Dr. Rohan Kapoor", specialty: "Radiologist", hospital: "Fortis Imaging Center, Delhi", experience: 14, rating: 4.8, fee: 900, available: true, image: doctor2, bio: "Expert in mammography, breast MRI and AI-assisted radiology. Published over 40 papers on early-stage tumour visibility and digital breast tomosynthesis." },
  { id: "d3", name: "Dr. Priya Sharma", specialty: "Surgical Oncologist", hospital: "Max Hospital, Bengaluru", experience: 22, rating: 4.95, fee: 1500, available: true, image: doctor3, bio: "Specializes in breast-conserving surgery, sentinel node biopsy and oncoplastic reconstruction. Pioneer of minimally invasive lumpectomy in South India." },
  { id: "d4", name: "Dr. Kavita Reddy", specialty: "Nutritionist", hospital: "Wellness Clinic, Hyderabad", experience: 11, rating: 4.7, fee: 600, available: true, image: doctor1, bio: "Designs anti-inflammatory diet plans for cancer patients and survivors. Focuses on plant-forward nutrition, fiber load and the Mediterranean approach." },
  { id: "d5", name: "Dr. Arjun Verma", specialty: "Therapist", hospital: "MindCare Center, Pune", experience: 9, rating: 4.85, fee: 800, available: false, image: doctor2, bio: "Clinical psychologist supporting patients through diagnosis anxiety, treatment fatigue and post-recovery identity transitions. CBT and mindfulness focused." },
  { id: "d6", name: "Dr. Naina Iyer", specialty: "Oncologist", hospital: "AIIMS, New Delhi", experience: 20, rating: 4.9, fee: 1300, available: true, image: doctor3, bio: "Medical oncologist specialising in HER2-positive and triple-negative breast cancers. Active researcher in immunotherapy clinical trials." },
  { id: "d7", name: "Dr. Vivek Joshi", specialty: "Radiologist", hospital: "Manipal Hospitals, Bengaluru", experience: 13, rating: 4.75, fee: 850, available: true, image: doctor2, bio: "Sub-specialised in breast ultrasound and contrast-enhanced spectral mammography for dense breast tissue evaluation." },
  { id: "d8", name: "Dr. Sneha Bansal", specialty: "Surgical Oncologist", hospital: "Medanta, Gurugram", experience: 16, rating: 4.88, fee: 1400, available: false, image: doctor1, bio: "Expert in nipple-sparing mastectomy and immediate reconstructive techniques. Strong advocate for shared decision-making with patients." },
  { id: "d9", name: "Dr. Rahul Nair", specialty: "Therapist", hospital: "Serenity Counselling, Chennai", experience: 7, rating: 4.7, fee: 700, available: true, image: doctor2, bio: "Family and group therapy specialist. Runs weekly survivor circles and partner-support workshops." },
  { id: "d10", name: "Dr. Meera Singh", specialty: "Nutritionist", hospital: "GreenLeaf Wellness, Mumbai", experience: 10, rating: 4.8, fee: 650, available: true, image: doctor3, bio: "Creates chemotherapy-friendly meal plans focused on nausea management, micronutrient density and lean protein intake." },
  { id: "d11", name: "Dr. Karan Malhotra", specialty: "Oncologist", hospital: "PGI, Chandigarh", experience: 24, rating: 4.95, fee: 1600, available: true, image: doctor2, bio: "Senior consultant in breast medical oncology with deep experience in metastatic disease management and palliative care." },
  { id: "d12", name: "Dr. Ishita Banerjee", specialty: "Radiologist", hospital: "Tata Memorial, Mumbai", experience: 12, rating: 4.82, fee: 950, available: true, image: doctor1, bio: "Focuses on AI-assisted lesion detection and risk stratification. Co-developer of an open-source mammography triage model." },
];

export type ForumThread = { id: string; author: string; title: string; excerpt: string; likes: number; comments: number; tag: string };
export const THREADS: ForumThread[] = [
  { id: "t1", author: "Anita R.", title: "My 3-year survivor journey — here's what helped", excerpt: "From the day of diagnosis to ringing the bell, sharing the small things that made the difference for me and my family.", likes: 312, comments: 48, tag: "Survivor Story" },
  { id: "t2", author: "Rohini D.", title: "How accurate are home self-exams really?", excerpt: "I want to discuss what self-exams can and cannot detect, and why they should not replace mammograms.", likes: 187, comments: 26, tag: "Awareness" },
  { id: "t3", author: "Sameer K.", title: "Supporting my wife through chemo: a partner's notes", excerpt: "Practical things partners can do that nobody tells you. Meal prep, side-effect tracking, and emotional check-ins.", likes: 245, comments: 33, tag: "Caregiver" },
  { id: "t4", author: "Dr. Iyer (verified)", title: "Understanding triple-negative breast cancer", excerpt: "A short explainer on what TNBC is, why it behaves differently, and the latest on immunotherapy options.", likes: 421, comments: 71, tag: "Medical" },
  { id: "t5", author: "Meera P.", title: "Coping with hair loss — what worked for me", excerpt: "Cold caps, scalp care, choosing a wig vs scarves, and reframing how I saw myself in the mirror.", likes: 198, comments: 42, tag: "Wellness" },
  { id: "t6", author: "Vikram S.", title: "Insurance navigation in India — a thread", excerpt: "Documenting my experience with claims, pre-authorization and second-opinion coverage. Tips welcome!", likes: 156, comments: 29, tag: "Resources" },
];

export type Survivor = { name: string; age: number; years: number; quote: string; story: string; image: string; location?: string; stage?: string };
export const SURVIVORS: Survivor[] = [
  { name: "Anita Rao", age: 47, years: 6, location: "Bengaluru, Karnataka", stage: "Stage 1 — IDC", image: survivor1, quote: "Early detection gave me my life back. Don't skip your screenings.", story: "Anita was diagnosed with Stage 1 invasive ductal carcinoma during a routine mammogram at age 41. After a lumpectomy and four months of radiation, she has been cancer-free for six years and now leads weekend awareness drives across Karnataka, helping over 4,000 women access free screening." },
  { name: "Sunita Desai", age: 53, years: 4, location: "Pune, Maharashtra", stage: "Stage 2 — HR+", image: survivor2, quote: "Cancer changed my priorities — and surprisingly, made my life fuller.", story: "Sunita underwent a full mastectomy followed by six cycles of chemotherapy. Her recovery was supported by her daughters and a survivor circle she still attends every Sunday. She now mentors newly diagnosed women in her community and runs a hand-stitched pink-ribbon project that funds rural mammograms." },
  { name: "Lata Krishnan", age: 61, years: 9, location: "Chennai, Tamil Nadu", stage: "Stage 2 — IDC", image: survivor3, quote: "I tell every woman in my family: feel, look, talk. Don't be afraid.", story: "After feeling a lump during a self-exam, Lata insisted on a biopsy despite being told it was nothing. The early Stage 2 diagnosis allowed for a treatment plan that has kept her cancer-free for nearly a decade. She now visits temples and women's collectives teaching the BSE technique in Tamil." },
  { name: "Reena Joseph", age: 38, years: 2, location: "Kochi, Kerala", stage: "HER2+ early", image: survivor4, quote: "Being young doesn't mean you're safe. Listen to your body.", story: "Reena was 36 when she was diagnosed with HER2-positive breast cancer. Targeted therapy with trastuzumab and an incredible care team helped her return to full-time work and start the YoungPink Foundation, a peer-support network for women under 40." },
  { name: "Fatima Khan", age: 44, years: 3, location: "Hyderabad, Telangana", stage: "Stage 2B — TNBC", image: survivor5, quote: "Chemo took my hair, not my hope. I wear my pink scarf with pride.", story: "Diagnosed with triple-negative breast cancer at 41, Fatima endured eight cycles of dose-dense chemotherapy and a partial mastectomy. Today she leads a women-only WhatsApp helpline answering more than 200 questions a week from newly diagnosed patients across South Asia." },
  { name: "Geetha Nair", age: 56, years: 7, location: "Thiruvananthapuram, Kerala", stage: "Stage 1 — DCIS", image: survivor6, quote: "My granddaughter calls me her superhero. That's my favourite title.", story: "Geetha caught her ductal carcinoma in situ at the earliest stage thanks to a state-sponsored screening camp. After a successful lumpectomy and adjuvant hormone therapy, she now coordinates the very same camps that saved her life — they have screened 22,000 women to date." },
  { name: "Aisha Banerjee", age: 29, years: 1, location: "Kolkata, West Bengal", stage: "Stage 2 — BRCA1+", image: survivor7, quote: "I'm 29 and a survivor. Genetics matter — get tested.", story: "Aisha discovered she carried a BRCA1 mutation after her mother's diagnosis. A preventive screening at 28 caught an early aggressive tumour. She underwent a bilateral mastectomy with reconstruction and now advocates for genetic counselling access among young Indian women." },
];

export type Campaign = { id: string; title: string; date: string; location: string; description: string; image: string };
export const CAMPAIGNS: Campaign[] = [
  { id: "c1", title: "Pink October — Nationwide Awareness Walk", date: "October 15, 2026", location: "12 cities, India", description: "Join thousands of survivors, supporters and medical professionals for a 5km walk across major Indian cities to raise awareness and funds for free screening camps in rural districts.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800" },
  { id: "c2", title: "Rural Screening Caravan — Maharashtra", date: "Ongoing 2026", location: "Maharashtra", description: "A mobile mammography unit visiting 60 villages across Maharashtra, offering free screenings, self-exam workshops and one-on-one consultations with oncologists.", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800" },
  { id: "c3", title: "Women's Health Workshop Series", date: "Every Saturday", location: "Online + Mumbai, Delhi, Bengaluru", description: "Weekly workshops covering nutrition, mental health, breast self-examination technique, and Q&A sessions with practicing oncologists. Free for all participants.", image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=800" },
  { id: "c4", title: "AI for Healthcare Research Summit", date: "March 8, 2026", location: "Bengaluru International Centre", description: "Annual summit gathering radiologists, oncologists, AI researchers and healthcare startups to discuss the future of AI-assisted breast cancer detection.", image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800" },
];

export type FAQ = { q: string; a: string };
export const FAQS: FAQ[] = [
  { q: "Is PinkShield a replacement for medical diagnosis?", a: "No. PinkShield is an awareness, education and AI-assisted triage platform. The AI scan is a supportive screening signal — not a clinical diagnosis. Always consult a qualified oncologist or radiologist for confirmation and treatment." },
  { q: "How accurate is the AI scan?", a: "Our reference model in this demo achieves 92–96% sensitivity on benchmark datasets. Real-world accuracy varies based on image quality and patient demographics. The result is intended to flag cases that warrant follow-up imaging." },
  { q: "When should I start regular screening?", a: "General guidelines suggest annual clinical exams from age 25 and mammograms from age 40 for average-risk women. If you have a family history of breast or ovarian cancer, consult an oncologist about earlier screening." },
  { q: "Is my data private?", a: "Yes. All scan data, reports and personal information stored in PinkShield are encrypted and never shared without explicit patient consent. You can export or delete your data at any time from Settings." },
  { q: "Can men get breast cancer?", a: "Yes. Although rare (about 1% of all cases), men can develop breast cancer. The same warning signs apply — lumps, skin changes, nipple discharge — and warrant immediate medical attention." },
  { q: "Does PinkShield offer in-person consultations?", a: "PinkShield connects patients with verified oncologists, radiologists and counsellors via the Doctors and Appointments sections. Both video and in-person consultations can be booked directly through the platform." },
  { q: "What lifestyle changes lower breast cancer risk?", a: "Maintaining a healthy weight, exercising at least 150 minutes per week, limiting alcohol, breastfeeding when possible, avoiding long-term hormone therapy and not smoking are all linked to reduced risk." },
  { q: "How do I know if I'm high-risk?", a: "Family history (especially first-degree relatives), BRCA1/BRCA2 mutations, dense breast tissue, early menstruation or late menopause, and prior chest radiation all increase risk. A genetic counsellor can help assess your personal risk profile." },
];

export type Notification = { id: string; title: string; body: string; time: string; type: "appointment" | "report" | "campaign" | "tip" | "alert"; unread: boolean };
export const NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Upcoming appointment", body: "Dr. Aanya Mehta — Video consultation in 3 days at 10:30 AM", time: "2h ago", type: "appointment", unread: true },
  { id: "n2", title: "AI scan report ready", body: "Your latest scan SC-1086 has been analyzed. View results.", time: "5h ago", type: "report", unread: true },
  { id: "n3", title: "Pink October starts soon", body: "Join the nationwide awareness walk on October 15. Register today.", time: "1d ago", type: "campaign", unread: true },
  { id: "n4", title: "Daily wellness tip", body: "30 minutes of brisk walking can reduce cancer recurrence risk by up to 24%.", time: "1d ago", type: "tip", unread: false },
  { id: "n5", title: "New doctor recommendation", body: "Based on your profile, Dr. Naina Iyer matches your needs.", time: "3d ago", type: "alert", unread: false },
];

export type Tip = string;
export const HEALTH_TIPS: Tip[] = [
  "Perform a breast self-exam on the same day each month to track changes accurately.",
  "Aim for 150 minutes of moderate exercise weekly — it lowers recurrence risk by up to 24%.",
  "A diet rich in cruciferous vegetables (broccoli, cauliflower, cabbage) supports estrogen metabolism.",
  "Limit alcohol to less than one drink per day — even small amounts increase risk.",
  "Maintain a healthy BMI between 18.5 and 24.9 to reduce post-menopausal cancer risk.",
  "Sleep 7–9 hours nightly — disrupted circadian rhythms affect hormone balance.",
  "Stay hydrated: 2.5L water daily aids cellular repair and lymphatic drainage.",
];

export const QUOTES = [
  "Awareness is the first medicine. — Dr. Susan Love",
  "Cancer changes your life, often for the better. — Joel Siegel",
  "You never know how strong you are until being strong is the only choice you have.",
  "Hope is the only thing stronger than fear. — Suzanne Collins",
];
