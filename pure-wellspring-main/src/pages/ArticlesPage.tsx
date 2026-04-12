import { useState, useEffect } from "react";
// Hapus impor storage lokal
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ArticlesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil artikel dari database saat halaman dibuka
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://pure-app-production.up.railway.app/api/articles");
        const data = await response.json();
        if (data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        toast.error("Gagal memuat artikel dari server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Mencari artikel yang sedang diklik (Ingat, pakai _id untuk MongoDB)
  const selected = articles.find((a) => a._id === selectedId);

  // Jika ada artikel yang dipilih, tampilkan halaman baca (detail)
  if (selected) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)} className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Button>
          <article>
            <h1 className="text-2xl font-bold tracking-tight">{selected.title}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {selected.author} · {new Date(selected.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <div className="mt-6 prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
              {selected.content}
            </div>
          </article>
        </div>
      </AppLayout>
    );
  }

  // Tampilan daftar artikel utama
  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Artikel Wellness</h1>
          <p className="text-muted-foreground text-sm mt-1">Tips dan informasi untuk hidup lebih sehat</p>
        </div>
        
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Memuat artikel...</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada artikel.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((a) => (
              <Card
                key={a._id}
                className="shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
                onClick={() => setSelectedId(a._id)}
              >
                <CardHeader className="pb-2">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold leading-snug">{a.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-3">{a.content.slice(0, 150)}...</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}