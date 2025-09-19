"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, signUp } from "@/lib/auth-client"
import Image from "next/image"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleSignUp = async (isLogin: boolean) => {
        if (isLogin) {
            const { data, error } = await signIn.email({
                email: email,
                password: password,
                callbackURL: "/",
            }, {
                onRequest: () => {
                    // TODO: add posthog event
                    console.log("Signing in...")
                },
                onSuccess: () => {
                    toast.success("Signed in successfully")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            })
            console.log(data, error)
        } else {

            const { data, error } = await signUp.email({
                email: email,
                password: password,
                name: name,
                callbackURL: "/",
            }, {
                onRequest: () => {
                    // TODO: add posthog event
                },
                onSuccess: () => {
                    toast.success("Account created successfully")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            })
            console.log(data, error)
        }
    }

    return (
        <div className="min-h-screen">
            <div className="min-h-screen bg-background transition-colors duration-300">
                <div className="flex min-h-screen">
                    {/* Left Side - Image */}
                    <div className="hidden lg:flex lg:w-1/2 relative bg-card">
                        <div >
                            <div className="absolute inset-0 bg-linear-to-br from-accent/40 to-muted z-10"></div>
                            <Image src="/images/login.jpg" className="object-cover" fill alt="waves in a river, someone just flushed i think" />
                        </div>
                        {/* Logo - Top Right */}
                        {/* <div className="absolute top-6 left-6 z-20">
                            <div className="flex items-center space-x-4">
                                <div className="w-6 h-6 bg-foreground flex items-center justify-center rotate-[15deg]">
                                    <div className="w-3 h-3 bg-background" />
                                </div>
                                <span className="text-xl font-bold text-foreground">minimotto</span>
                            </div>
                        </div> */}
                        {/* <div className="relative z-10 flex items-center justify-center w-full">
                            <div className="text-center space-y-6 px-8">
                                <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
                                    <div className="w-16 h-16 bg-accent rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
                                    <p className="text-muted-foreground max-w-md">
                                        Open search and download your favorite movies, music, books, and more.
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        {/* Quote - Bottom Right */}
                        <div className="absolute bottom-6 right-6 z-20 max-w-xs">
                            <blockquote className="text-right">
                                <p className="text-md italic text-muted-foreground mb-2">
                                    "Piracy is almost always a service problem and not a pricing problem."
                                </p>
                                <cite className="text-sm font-medium text-muted-foreground">— Gabe Newell</cite>
                            </blockquote>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                        <div className="w-full max-w-md space-y-8">
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold text-foreground">
                                    {isLogin ? "Sign In" : "Create Account"}
                                </h1>
                                <p className="text-muted-foreground">
                                    {isLogin
                                        ? "Welcome back! Please sign in to your account"
                                        : "Get started by creating your new account"}
                                </p>
                            </div>

                            {/* Social Login */}
                            {/* <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 bg-transparent"
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 bg-transparent"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Continue with Facebook
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full bg-zinc-200 dark:bg-zinc-700" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-zinc-50 dark:bg-zinc-950 px-2 text-zinc-500 dark:text-zinc-400">
                                        Or continue with email
                                    </span>
                                </div>
                            </div> */}

                            {/* Form */}
                            <div className="space-y-4">
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-foreground">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-foreground">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pr-10"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                {isLogin && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-input accent-primary"
                                            />
                                            <Label htmlFor="remember" className="text-sm text-muted-foreground">
                                                Remember me
                                            </Label>
                                        </div>
                                        <Button
                                            variant="link"
                                            className="px-0 text-sm"
                                        >
                                            Forgot password?
                                        </Button>
                                    </div>
                                )}

                                <Button
                                    className="w-full"
                                    onClick={() => handleSignUp(isLogin)}
                                >
                                    {isLogin ? "Sign In" : "Create Account"}
                                </Button>
                            </div>

                            {/* Toggle Form */}
                            <div className="text-center">
                                <span className="text-muted-foreground">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                </span>
                                <Button
                                    variant="link"
                                    className="px-0"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </Button>
                            </div>

                            {/* Terms */}
                            {!isLogin && (
                                <p className="text-xs text-center text-muted-foreground">
                                    By creating an account, you agree to our{" "}
                                    <Button
                                        variant="link"
                                        className="px-0 text-xs"
                                    >
                                        Terms of Service
                                    </Button>{" "}
                                    and{" "}
                                    <Button
                                        variant="link"
                                        className="px-0 text-xs"
                                    >
                                        Privacy Policy
                                    </Button>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
