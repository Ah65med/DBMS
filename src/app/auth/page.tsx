import type { Metadata } from "next";
import type { AwaitedReactNode } from "react";
import { AirlineSignInForm } from "~/components/forms/airline-sign-in-form";
import { AirlineSignUpForm } from "~/components/forms/airline-signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
	title: "Auth",
};

export default async function AuthPage(): Promise<AwaitedReactNode> {
	return (
		<section className="min-h-screen flex justify-center py-12">
			<Tabs defaultValue="signup" className="w-2/3 md:w-1/2 max-w-sm">
				<TabsList>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
					<TabsTrigger value="signin">Sign In</TabsTrigger>
				</TabsList>
				<TabsContent value="signup">
					<AirlineSignUpForm />
				</TabsContent>
				<TabsContent value="signin">
					<AirlineSignInForm />
				</TabsContent>
			</Tabs>
		</section>
	);
}
