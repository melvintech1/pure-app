import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getBMICategory } from "@/lib/storage";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Flame, Droplets, Check } from "lucide-react";
import { toast } from "sonner";

export default function CalculatorPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kalkulator Kesehatan</h1>
          <p className="text-muted-foreground text-sm mt-1">Hitung BMI, BMR, dan kebutuhan air harian</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BMICalculator userId={user.id} />
          <BMRCalculator userId={user.id} />
          <WaterCalculator userId={user.id} />
        </div>
      </div>
    </AppLayout>
  );
}

function BMICalculator({ userId }: { userId: string }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; label: string; color: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calc = async (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;
    
    const bmi = w / (h * h);
    const cat = getBMICategory(bmi);
    setResult({ bmi, ...cat });
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("pure_token");
      const response = await fetch("http://localhost:5000/api/bmi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ weight: w, height: parseFloat(height), bmi, category: cat.label })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Data BMI tersimpan di Database!");
      } else {
        toast.error(data.message || "Gagal menyimpan BMI");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server backend");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" /> BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calc} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Berat Badan (kg)</Label>
            <Input type="number" step="0.1" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Tinggi Badan (cm)</Label>
            <Input type="number" step="0.1" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} required disabled={isLoading} />
          </div>
          <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Hitung BMI"}
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-center">
            <p className="text-2xl font-bold">{result.bmi.toFixed(1)}</p>
            <p className={`text-sm font-medium ${result.color}`}>{result.label}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BMRCalculator({ userId }: { userId: string }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Menambahkan async
  const calc = async (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h) return;
    
    const bmr = gender === "male"
      ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
      : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
    
    setResult(bmr);
    setIsLoading(true);

    // Mengirim ke API BMR
    try {
      const token = localStorage.getItem("pure_token");
      const response = await fetch("http://localhost:5000/api/bmr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ age: a, gender, weight: w, height: h, bmr })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Data BMR tersimpan di Database!");
      } else {
        toast.error(data.message || "Gagal menyimpan BMR");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server backend");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-500" /> BMR Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calc} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Umur</Label>
            <Input type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Jenis Kelamin</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as "male" | "female")} disabled={isLoading}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Laki-laki</SelectItem>
                <SelectItem value="female">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Berat (kg)</Label>
            <Input type="number" step="0.1" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} required disabled={isLoading} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Tinggi (cm)</Label>
            <Input type="number" step="0.1" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} required disabled={isLoading} />
          </div>
          <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Hitung BMR"}
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-center">
            <p className="text-2xl font-bold">{Math.round(result)}</p>
            <p className="text-sm text-muted-foreground">kkal/hari</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WaterCalculator({ userId }: { userId: string }) {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Menambahkan async
  const calc = async (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!w) return;
    
    const ml = Math.round(w * 35);
    setResult(ml);
    setIsLoading(true);

    // Mengirim ke API Water
    try {
      const token = localStorage.getItem("pure_token");
      const response = await fetch("http://localhost:5000/api/water", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ weight: w, waterMl: ml })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Data Kebutuhan Air tersimpan di Database!");
      } else {
        toast.error(data.message || "Gagal menyimpan data Air");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server backend");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Droplets className="h-4 w-4 text-blue-500" /> Kebutuhan Air
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={calc} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Berat Badan (kg)</Label>
            <Input type="number" step="0.1" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} required disabled={isLoading} />
          </div>
          <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Hitung"}
          </Button>
        </form>
        {result && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-center">
            <p className="text-2xl font-bold">{result}</p>
            <p className="text-sm text-muted-foreground">ml/hari</p>
            <div className="flex items-center justify-center gap-1 mt-1 text-xs text-primary">
              <Check className="h-3 w-3" /> Sekitar {(result / 250).toFixed(1)} gelas
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}