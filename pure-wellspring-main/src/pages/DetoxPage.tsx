import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Smartphone, Plus, Clock } from "lucide-react";
import { toast } from "sonner";

export default function DetoxPage() {
  const { user } = useAuth();
  const [hours, setHours] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [refresh, setRefresh] = useState(0);
  
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  if (!user) return null;

  useEffect(() => {
    const fetchRecords = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem("pure_token");
        const response = await fetch("https://pure-app-production.up.railway.app/api/detox", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success) {
          const sortedData = data.data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setRecords(sortedData);
        }
      } catch (error) {
        toast.error("Gagal memuat data riwayat detox");
      } finally {
        setIsFetching(false);
      }
    };

    fetchRecords();
  }, [user, refresh]);

  const chartData = [...records].reverse().slice(-14).map((r) => ({
    date: new Date(r.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    jam: r.hours,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(hours);
    if (!h || h < 0 || h > 24) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("pure_token");
      const response = await fetch("https://pure-app-production.up.railway.app/api/detox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ hours: h, date })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setHours("");
        setRefresh((p) => p + 1); 
        toast.success("Screen time tercatat di Database!");
      } else {
        toast.error(data.message || "Gagal mencatat data");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server backend");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Digital Detox Tracker</h1>
          <p className="text-muted-foreground text-sm mt-1">Pantau dan kurangi waktu layar harian Anda</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" /> Catat Screen Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Tanggal</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required disabled={isLoading} className="dark:[color-scheme:dark]" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Jam penggunaan</Label>
                  <Input type="number" step="0.5" min="0" max="24" placeholder="5" value={hours} onChange={(e) => setHours(e.target.value)} required disabled={isLoading} />
                </div>
                <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-amber-500" /> Tren Screen Time
              </CardTitle>
            </CardHeader>
            <CardContent className="h-52">
              {isFetching ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Memuat grafik...
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--card-foreground))"
                      }}
                      itemStyle={{color: "hsl(var(--card-foreground))" }}/>
  
                    <Bar dataKey="jam" fill="hsl(44,90%,55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Belum ada data. Mulai catat screen time Anda.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Riwayat</CardTitle>
          </CardHeader>
          <CardContent>
            {isFetching ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Memuat riwayat...</p>
            ) : records.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                          <span>Screen Time</span>
                    </div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((r) => (
                    <TableRow key={r._id}>
                      <TableCell>{new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</TableCell>
                      <TableCell>{r.hours} jam</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">Belum ada riwayat</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}