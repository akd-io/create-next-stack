import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

const NEXT_PUBLIC_CONVERTKIT_API_KEY =
  process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY
if (!NEXT_PUBLIC_CONVERTKIT_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_CONVERTKIT_API_KEY environment variable")
}
const NEXT_PUBLIC_CONVERTKIT_FORM_ID =
  process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID
if (!NEXT_PUBLIC_CONVERTKIT_FORM_ID) {
  throw new Error("Missing NEXT_PUBLIC_CONVERTKIT_FORM_ID environment variable")
}

type NewsletterFormData = {
  email: string
}

export const Newsletter: FC = () => {
  const [state, setState] = useState<
    "showForm" | "loading" | "submitSuccess" | "submitError"
  >("showForm")

  const { register, handleSubmit } = useForm<NewsletterFormData>()

  const onSubmit: SubmitHandler<NewsletterFormData> = async (data) => {
    const { email } = data
    setState("loading")
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscribe`,
      {
        body: JSON.stringify({
          api_key: NEXT_PUBLIC_CONVERTKIT_API_KEY,
          email,
          tags: [
            3868813, // Tag ID of "create-next-stack-com"
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    )
    if (response.status === 200) {
      setState("submitSuccess")
    } else {
      setState("submitError")
    }
  }

  return (
    <Flex
      width="100%"
      direction="column"
      alignItems={["left", "center"]}
      gap="10px"
    >
      <Heading>Join the Newsletter</Heading>
      <Text>Stay up to date with new feature releases!</Text>
      {state === "submitSuccess" && (
        <Text padding="16px">Thank you for subscribing to the newsletter!</Text>
      )}
      {state !== "submitSuccess" ? (
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          gap="10px"
          direction={["column", "row"]}
          padding="12px 0"
        >
          <Input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            background="white"
            disabled={state === "loading"}
          />
          <Button
            type="submit"
            variant="solid"
            colorScheme="purple"
            minWidth=""
            isLoading={state === "loading"}
          >
            Subscribe
          </Button>
        </Flex>
      ) : null}
      {state === "submitError" && (
        <Text>Something went wrong. Please try again later.</Text>
      )}
      <Text fontSize="0.8em">
        {"We won't send you spam. Unsubscribe at any time."}
      </Text>
    </Flex>
  )
}
