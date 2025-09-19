import type { Metadata } from "next";
import AuthPage from "../_components/auth-page";

export const metadata: Metadata = {
    title: "Login - minimoto",
    description: "Login to your account",
};

export default async function LoginPage() {
    return <AuthPage />;
}