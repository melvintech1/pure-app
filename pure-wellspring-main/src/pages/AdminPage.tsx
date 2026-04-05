import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShieldCheck, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();
  
  // State untuk menyimpan artikel dari database
  const [articles, setArticles] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Mengambil data artikel dari database
  useEffect(() => {
    const fetchArticles = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        const data = await response.json();
        if (data.success) {
          setArticles(data.data);
        }
      } catch (error) {
        toast.error("Gagal memuat artikel dari server");
      } finally {
        setIsFetching(false);
      }
    };

    fetchArticles();
  }, [refresh]);

  const openNew = () => {
    setEditId(null);
    setTitle("");
    setContent("");
    setDialogOpen(true);
  };

  const openEdit = (a: any) => {
    setEditId(a._id); // Di MongoDB menggunakan _id
    setTitle(a.title);
    setContent(a.content);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Judul dan konten harus diisi");
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("pure_token");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      let response;

      // Jika ada editId, berarti Update (PUT), kalau tidak berarti Tambah Baru (POST)
      if (editId) {
        response = await fetch(`http://localhost:5000/api/articles/${editId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ title, content }),
        });
      } else {
        response = await fetch("http://localhost:5000/api/articles", {
          method: "POST",
          headers,
          body: JSON.stringify({ title, content, author: user?.name || "Admin" }),
        });
      }

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(editId ? "Artikel diperbarui" : "Artikel ditambahkan");
        setDialogOpen(false);
        setRefresh((p) => p + 1); 
      } else {
        toast.error(data.message || "Gagal menyimpan artikel");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;

    try {
      const token = localStorage.getItem("pure_token");
      const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Artikel dihapus");
        setRefresh((p) => p + 1);
      } else {
        toast.error(data.message || "Gagal menghapus artikel");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Admin Panel
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Kelola artikel wellness</p>
          </div>
          <Button size="sm" onClick={openNew} className="gap-1">
            <Plus className="h-4 w-4" /> Tambah Artikel
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            {isFetching ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Memuat artikel...</p>
            ) : articles.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Belum ada artikel</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((a) => (
                    <TableRow key={a._id}>
                      <TableCell className="font-medium">{a.title}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                        {new Date(a.createdAt).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(a)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(a._id)}>
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit Artikel" : "Tambah Artikel"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Judul</Label>
                <Input placeholder="Judul artikel" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isSaving} />
              </div>
              <div className="space-y-1.5">
                <Label>Konten</Label>
                <Textarea rows={8} placeholder="Tulis konten artikel..." value={content} onChange={(e) => setContent(e.target.value)} disabled={isSaving} />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                {isSaving ? "Menyimpan..." : (editId ? "Simpan Perubahan" : "Tambah Artikel")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}