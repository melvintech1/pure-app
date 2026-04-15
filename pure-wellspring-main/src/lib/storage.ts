export interface BMIRecord {
  id: string;
  userId: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  date: string;
}

export interface BMRRecord {
  id: string;
  userId: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  bmr: number;
  date: string;
}

export interface WaterRecord {
  id: string;
  userId: string;
  weight: number;
  waterMl: number;
  date: string;
}

export interface DetoxRecord {
  id: string;
  userId: string;
  hours: number;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

function getItems<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setItems<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getBMIRecords(userId: string): BMIRecord[] {
  return getItems<BMIRecord>("pure_bmi").filter((r) => r.userId === userId);
}
export function addBMIRecord(record: BMIRecord) {
  const all = getItems<BMIRecord>("pure_bmi");
  all.push(record);
  setItems("pure_bmi", all);
}

export function getBMRRecords(userId: string): BMRRecord[] {
  return getItems<BMRRecord>("pure_bmr").filter((r) => r.userId === userId);
}
export function addBMRRecord(record: BMRRecord) {
  const all = getItems<BMRRecord>("pure_bmr");
  all.push(record);
  setItems("pure_bmr", all);
}

export function getWaterRecords(userId: string): WaterRecord[] {
  return getItems<WaterRecord>("pure_water").filter((r) => r.userId === userId);
}
export function addWaterRecord(record: WaterRecord) {
  const all = getItems<WaterRecord>("pure_water");
  all.push(record);
  setItems("pure_water", all);
}

export function getDetoxRecords(userId: string): DetoxRecord[] {
  return getItems<DetoxRecord>("pure_detox").filter((r) => r.userId === userId);
}
export function addDetoxRecord(record: DetoxRecord) {
  const all = getItems<DetoxRecord>("pure_detox");
  all.push(record);
  setItems("pure_detox", all);
}

export function getArticles(): Article[] {
  const items = getItems<Article>("pure_articles");
  if (items.length === 0) {
    const seed: Article[] = [
      {
        id: "art-1",
        title: "5 Kebiasaan Pagi untuk Hidup Lebih Sehat",
        content: "Memulai hari dengan kebiasaan yang baik dapat meningkatkan kualitas hidup secara signifikan. Berikut adalah 5 kebiasaan pagi yang bisa Anda terapkan:\n\n1. **Minum air putih** segera setelah bangun tidur. Tubuh Anda mengalami dehidrasi selama tidur, jadi penting untuk menghidrasi kembali.\n\n2. **Olahraga ringan** seperti stretching atau jalan kaki 15 menit. Ini membantu meningkatkan sirkulasi darah dan mood.\n\n3. **Sarapan bergizi** dengan kombinasi protein, karbohidrat kompleks, dan buah-buahan segar.\n\n4. **Meditasi 5 menit** untuk menenangkan pikiran dan mempersiapkan mental menghadapi hari.\n\n5. **Hindari smartphone** selama 30 menit pertama setelah bangun. Ini membantu mengurangi stres dan meningkatkan fokus.",
        author: "Admin PURE",
        createdAt: "2024-01-15T08:00:00Z",
        updatedAt: "2024-01-15T08:00:00Z",
      },
      {
        id: "art-2",
        title: "Pentingnya Digital Detox di Era Modern",
        content: "Di era digital saat ini, rata-rata orang menghabiskan 7-9 jam per hari menatap layar. Digital detox adalah praktik mengurangi penggunaan perangkat digital secara sadar.\n\n**Manfaat Digital Detox:**\n- Meningkatkan kualitas tidur\n- Mengurangi stres dan kecemasan\n- Memperbaiki postur tubuh\n- Meningkatkan produktivitas\n- Memperkuat hubungan sosial\n\n**Tips memulai:**\n- Tetapkan jam bebas gadget (misalnya setelah jam 9 malam)\n- Gunakan aplikasi pelacak screen time\n- Ganti scrolling dengan aktivitas fisik\n- Buat zona bebas gadget di rumah",
        author: "Admin PURE",
        createdAt: "2024-02-10T10:00:00Z",
        updatedAt: "2024-02-10T10:00:00Z",
      },
      {
        id: "art-3",
        title: "Mengenal BMI dan Cara Menjaga Berat Badan Ideal",
        content: "Body Mass Index (BMI) adalah pengukuran yang digunakan untuk menilai apakah berat badan seseorang proporsional dengan tinggi badannya.\n\n**Kategori BMI:**\n- Kurus: < 18.5\n- Normal: 18.5 - 24.9\n- Overweight: 25 - 29.9\n- Obesitas: ≥ 30\n\n**Tips menjaga berat badan ideal:**\n1. Konsumsi makanan seimbang\n2. Olahraga teratur minimal 150 menit per minggu\n3. Tidur cukup 7-9 jam per malam\n4. Kelola stres dengan baik\n5. Minum air putih yang cukup\n\nPerlu diingat bahwa BMI bukan satu-satunya indikator kesehatan. Konsultasikan dengan profesional kesehatan untuk evaluasi yang lebih komprehensif.",
        author: "Admin PURE",
        createdAt: "2024-03-05T09:00:00Z",
        updatedAt: "2024-03-05T09:00:00Z",
      },
    ];
    setItems("pure_articles", seed);
    return seed;
  }
  return items;
}

export function addArticle(article: Article) {
  const all = getArticles();
  all.push(article);
  setItems("pure_articles", all);
}

export function updateArticle(id: string, updates: Partial<Article>) {
  const all = getArticles();
  const idx = all.findIndex((a) => a.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    setItems("pure_articles", all);
  }
}

export function deleteArticle(id: string) {
  const all = getArticles().filter((a) => a.id !== id);
  setItems("pure_articles", all);
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Kurus", color: "text-blue-500" };
  if (bmi < 25) return { label: "Normal", color: "text-primary" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-500" };
  return { label: "Obesitas", color: "text-destructive" };
}
