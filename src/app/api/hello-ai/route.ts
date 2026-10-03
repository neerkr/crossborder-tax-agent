import { generateText } from "ai";

// A plain "provider/model" string routes through the Vercel AI Gateway.
// The model lives in an environment variable so it can be switched per
// environment (preview vs production) without a code change.
// Auth is Vercel OIDC: the deployment gets a short-lived token automatically,
// so there is no long-lived API key to store or leak.
export async function GET() {
  const model = process.env.AI_GATEWAY_MODEL;
  if (!model) {
    return Response.json(
      { error: "AI_GATEWAY_MODEL is not set" },
      { status: 500 },
    );
  }

  const { text, usage } = await generateText({
    model,
    prompt:
      "In one sentence, explain what a UK Section 104 share pool is to a non-accountant.",
  });

  return Response.json({ model, text, usage });
}
