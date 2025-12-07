import LoginForm from "@/components/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md border-brand-lightBlue">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="AlphaEb" width={60} height={60} />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-brand-blue">Login to AlphaEb</CardTitle>
          <CardDescription className="text-center">
            Enter your username and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-brand-blue hover:text-brand-mediumBlue underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
