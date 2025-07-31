import AuthPage from "../_components/auth-page";
import { getSession } from "@/lib/auth-client";

export default async function LoginPage() {
    const { data: session, error } = await getSession();
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1>Logo</h1>
                </div>
                {
                    session ? (
                        <div>
                            <h1>Logged in as {session.user.email}</h1>
                        </div>
                    ) : (
                        <div>
                            <h1>Not logged in</h1>
                            {error && <p>{error.message}</p>}
                        </div>
                    )
                }
            </div>
            <AuthPage />
        </div>
    );
}