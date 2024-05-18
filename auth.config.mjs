import { defineConfig } from "auth-astro";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import LinkedIn from "@auth/core/providers/linkedin";

export default defineConfig({
    providers:[
        Google({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        }),
        LinkedIn({
			clientId: import.meta.env.LINKEDIN_CLIENT_ID,
			clientSecret: import.meta.env.LINKEDIN_CLIENT_SECRET,
			issuer: "https://www.linkedin.com/oauth",
			jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
			authorization: { params: { scope: "profile email openid" } },
			async profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					firstname: profile.given_name,
					lastname: profile.family_name,
					email: profile.email,
				};
			},
		}),
    ]
})