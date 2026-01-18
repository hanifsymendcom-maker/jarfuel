import { useState, useEffect } from "react";
import { getAllEntries } from "@/lib/waitlist";
import type { WaitlistEntry } from "@/lib/database.types";
import { useWaitlist } from "@/contexts/WaitlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  TrendingUp,
  Share2,
  Download,
  Search,
  RefreshCw,
  ArrowLeft,
  Mail,
  Calendar,
  Link2,
} from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const { count, refreshCount } = useWaitlist();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadEntries = async () => {
    setIsLoading(true);
    const data = await getAllEntries();
    setEntries(data);
    setFilteredEntries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredEntries(
        entries.filter(
          (e) =>
            e.email.toLowerCase().includes(query) ||
            e.referral_code.toLowerCase().includes(query) ||
            (e.referred_by && e.referred_by.toLowerCase().includes(query))
        )
      );
    } else {
      setFilteredEntries(entries);
    }
  }, [searchQuery, entries]);

  const handleRefresh = async () => {
    await loadEntries();
    await refreshCount();
  };

  const exportToCsv = () => {
    const headers = [
      "Email",
      "Referral Code",
      "Referred By",
      "Referral Count",
      "Position",
      "Source",
      "Created At",
    ];
    const rows = entries.map((e) => [
      e.email,
      e.referral_code,
      e.referred_by || "",
      e.referral_count.toString(),
      e.position.toString(),
      e.source || "",
      new Date(e.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.map((c) => `"${c}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jarfuel-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalReferrals = entries.reduce((sum, e) => sum + e.referral_count, 0);
  const referredUsers = entries.filter((e) => e.referred_by).length;
  const conversionRate = count > 0 ? ((referredUsers / count) * 100).toFixed(1) : "0";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Waitlist Admin
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage and monitor your waitlist signups
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={exportToCsv}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Signups</p>
                <p className="text-3xl font-bold text-foreground">{count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-3xl font-bold text-foreground">
                  {totalReferrals}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Referred Users</p>
                <p className="text-3xl font-bold text-foreground">
                  {referredUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Referral Rate</p>
                <p className="text-3xl font-bold text-foreground">
                  {conversionRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-border shadow-sm mb-6">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email or referral code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {filteredEntries.length} of {entries.length} entries
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-12 text-center">
                <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading waitlist...</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No entries match your search"
                    : "No waitlist signups yet"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Referral Code</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead className="text-center">Referrals</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {entry.position || index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{entry.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-muted rounded text-xs">
                          {entry.referral_code}
                        </code>
                      </TableCell>
                      <TableCell>
                        {entry.referred_by ? (
                          <code className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                            {entry.referred_by}
                          </code>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Direct
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            entry.referral_count > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {entry.referral_count}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground capitalize">
                          {entry.source || "website"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(entry.created_at)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Data is stored{" "}
            {entries.length > 0 && entries[0].id.length > 20
              ? "in Supabase"
              : "locally in your browser"}
            .{" "}
            {entries.length > 0 && entries[0].id.length <= 20 && (
              <span>
                Configure Supabase environment variables for cloud storage.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
