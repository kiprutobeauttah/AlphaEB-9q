import RegisterForm from "@/components/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md border-brand-lightBlue">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="AlphaEb" width={60} height={60} />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-brand-blue">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-blue hover:text-brand-mediumBlue underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

