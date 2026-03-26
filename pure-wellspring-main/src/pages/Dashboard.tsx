import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getBMICategory } from "@/lib/storage"; // getDetoxRecords sudah dihapus
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Flame, Droplets, Smartphone } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { AppLayout } from "@/components/AppLayout";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  
  // State untuk menyimpan ke-4 data dari Database
  const [bmiRecords, setBmiRecords] = useState<any[]>([]);
  const [bmrRecords, setBmrRecords] = useState<any[]>([]);
  const [waterRecords, setWaterRecords] = useState<any[]>([]);
  const [detoxRecords, setDetoxRecords] = useState<any[]>([]); // Tambahan state detox
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("pure_token");
        const headers = { Authorization: `Bearer ${token}` };

        // Mengambil 4 data sekaligus dari server
        const [bmiRes, bmrRes, waterRes, detoxRes] = await Promise.all([
          fetch("http://localhost:5000/api/bmi", { headers }),
          fetch("http://localhost:5000/api/bmr", { headers }),
          fetch("http://localhost:5000/api/water", { headers }),
          fetch("http://localhost:5000/api/detox", { headers }) // Jalur Detox
        ]);

        const [bmiData, bmrData, waterData, detoxData] = await Promise.all([
          bmiRes.json(),
          bmrRes.json(),
          waterRes.json(),
          detoxRes.json()
        ]);

        // Menyimpan data ke state masing-masing
        if (bmiData.success) setBmiRecords(bmiData.data);
        if (bmrData.success) setBmrRecords(bmrData.data);
        if (waterData.success) setWaterRecords(waterData.data);
        if (detoxData.success) setDetoxRecords(detoxData.data); // Menyimpan detox

      } catch (error) {
        toast.error("Gagal mengambil data dari server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return null;

  // Mencari data Detox khusus hari ini
  const todayString = new Date().toISOString().split("T")[0];
  const todayDetox = detoxRecords.filter((r) => r.date.startsWith(todayString));
  const todayScreenTime = todayDetox.reduce((sum, r) => sum + r.hours, 0);

  // Mengambil data terbaru (Index 0)
  const lastBMI = bmiRecords[0];
  const lastBMR = bmrRecords[0];
  const lastWater = waterRecords[0];

  // Membalikkan urutan untuk Chart (tanggal lama ke baru)
  const bmiChartData = [...bmiRecords].slice(0, 10).reverse().map((r) => ({
    date: new Date(r.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    bmi: Number(r.bmi.toFixed(1)),
  }));

  const detoxChartData = [...detoxRecords].slice(0, 7).reverse().map((r) => ({
    date: new Date(r.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    jam: r.hours,
  }));

  const cards = [
    {
      title: "BMI Terakhir",
      value: lastBMI ? lastBMI.bmi.toFixed(1) : (isLoading ? "..." : "—"),
      sub: lastBMI ? getBMICategory(lastBMI.bmi).label : "Belum ada data",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "BMR",
      value: lastBMR ? `${Math.round(lastBMR.bmr)}` : (isLoading ? "..." : "—"),
      sub: lastBMR ? "kkal/hari" : "Belum ada data",
      icon: Flame,
      color: "text-orange-500",
    },
    {
      title: "Air Harian",
      value: lastWater ? `${lastWater.waterMl}` : (isLoading ? "..." : "—"),
      sub: lastWater ? "ml/hari" : "Belum ada data",
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      title: "Screen Time",
      value: todayScreenTime > 0 ? `${todayScreenTime}` : (isLoading ? "..." : "—"),
      sub: todayScreenTime > 0 ? "jam hari ini" : "Belum ada data",
      icon: Smartphone,
      color: "text-amber-500",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight leading-tight">
            Selamat datang, {user.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Ringkasan kesehatan & wellness Anda</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((c) => (
            <Card key={c.title} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">{c.title}</span>
                  <c.icon className={`h-4 w-4 ${c.color}`} />
                </div>
                <p className="text-2xl font-bold tracking-tight">{c.value}</p>
                <p className="text-xs text-muted-foreground">{c.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Riwayat BMI</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Memuat data...
                </div>
              ) : bmiChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bmiChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bmi" stroke="hsl(168,60%,36%)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Belum ada data BMI. Mulai hitung di Kalkulator.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Screen Time Mingguan</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Memuat data...
                </div>
              ) : detoxChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={detoxChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="jam" fill="hsl(44,90%,55%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Belum ada data screen time. Mulai tracking di Digital Detox.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}