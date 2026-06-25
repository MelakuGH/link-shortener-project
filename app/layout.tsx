import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener - Create & Track Short URLs",
  description: "Create short, memorable links and track every click with real-time analytics. Perfect for marketing campaigns and social media sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex min-h-full flex-col bg-background text-foreground">
        <ClerkProvider>
          <header className="flex items-center justify-between px-6 py-4 bg-muted/80 dark:bg-muted/70 border-b border-border shadow-sm">
            <div className="text-lg font-semibold text-foreground">
              Link Shortner
            </div>
            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <div className="flex items-center gap-2">
                  <SignInButton>
                    <Button size="sm" variant="outline">
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button size="sm">Sign up</Button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
