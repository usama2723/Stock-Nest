"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import cell from '../public/cell.jpeg'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner" 

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast("Password mismatch", {
                description: "Passwords do not match. Please try again.",
            });
            return
        }

        try {
            setLoading(true)
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await res.json()
            setLoading(false)

            if (res.ok) {
                toast("Account created!", {
                    description: "✅ You can now log in with your new account.",
                })
                setFormData({ name: "", email: "", password: "", confirmPassword: "" })

                setTimeout(() => {
                    router.push("/pages/login")
                }, 2000)
            } else {
                toast("Signup failed",{
                    description: `❌ ${data.message}`,
                })
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
            toast("Error",{
                description: "Something went wrong. Please try again.",
            })
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Welcome</h1>
                            <p className="text-muted-foreground">Create an Account to Register</p>
                        </div>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <a href="/pages/login" className="underline underline-offset-4">
                                Login
                            </a>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src={cell}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
