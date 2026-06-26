import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { LinkShortenerForm } from "@/components/links/link-shortener-form";
import { LinkList } from "@/components/links/link-list";
import { getUserLinks } from "@/lib/links";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getUserLinks(userId);

  return (
    <main className="flex-1 bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Shorten a link
            </p>
            <h1 className="text-2xl font-semibold text-foreground">Create a new short link</h1>
            <p className="text-sm text-muted-foreground">
              Paste a destination URL and we’ll generate a short, shareable link for you.
            </p>
          </div>

          <div className="mt-6">
            <LinkShortenerForm />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Your links</h2>
              <p className="text-sm text-muted-foreground">
                Recent short links created for your account.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <LinkList links={links} />
          </div>
        </section>
      </div>
    </main>
  );
}
