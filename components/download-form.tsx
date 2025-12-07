"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Download } from "lucide-react"

interface DownloadFormProps {
  bookId: string
  bookTitle: string
}

export default function DownloadForm({ bookId, bookTitle }: DownloadFormProps) {
  const [email, setEmail] = useState("")
  const [downloadCode, setDownloadCode] = useState("")
  const [step, setStep] = useState<"request" | "verify">("request")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const handleRequestDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bookId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate download code")
      }

      // In a real app, the code would be sent via email
      // For demo purposes, we'll display it on the page
      setGeneratedCode(data.downloadCode)
      setSuccess("Download code has been generated and sent to your email")
      setStep("verify")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ downloadCode, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify download code")
      }

      setSuccess("Download code verified successfully")
      setDownloadUrl(data.downloadUrl)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Download {bookTitle}</CardTitle>
        <CardDescription>
          {step === "request"
            ? "Enter your email to receive a download code"
            : "Enter the download code sent to your email"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {generatedCode && (
          <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
            <AlertTitle>Your Download Code</AlertTitle>
            <AlertDescription className="font-mono text-lg">{generatedCode}</AlertDescription>
            <AlertDescription className="text-sm mt-2">
              In a real application, this would be sent to your email.
            </AlertDescription>
          </Alert>
        )}

        {step === "request" ? (
          <form onSubmit={handleRequestDownload}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Get Download Code"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyDownload}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="download-code">Download Code</Label>
                <Input
                  id="download-code"
                  placeholder="Enter your download code"
                  value={downloadCode}
                  onChange={(e) => setDownloadCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !!downloadUrl}>
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>

              {downloadUrl && (
                <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <a href={downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Now
                  </a>
                </Button>
              )}
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === "verify" && !downloadUrl && (
          <Button variant="ghost" onClick={() => setStep("request")}>
            Request New Code
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

