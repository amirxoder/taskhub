"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Controller, useForm } from "react-hook-form";
import { LogIn } from "lucide-react";

import { toast } from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpSchema } from "./lib/schema";
import { useRegisterMutation } from "./services/signUpApi";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

// schema type
type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [signUp, { isLoading }] = useRegisterMutation();
  const { replace } = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitHandler = async ({ email, password, name }: SignUpFormData) => {
    // const response = await signUp({ email, password, name }).unwrap();

    toast.promise(
      signUp({ email, password, name })
        .unwrap()
        .then((data) => {
          console.log("Sign-up response data:", data);
          if (data.success) {
            replace("/dashboard");
          }
        }),
      {
        loading: "Signing up...",
        success: <b>Sign up successfully</b>,
        error: <b>Could not sign up!</b>,
      },
    );
  };
  return (
    <div
      className={
        "min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4"
      }
    >
      <Card className="max-w-sm w-full shadow-xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Create a new account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      autoComplete="off"
                      placeholder="Amir Co"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      autoComplete="off"
                      placeholder="amir@info.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      autoComplete="off"
                      type="password"
                      placeholder="********"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      autoComplete="off"
                      type="password"
                      placeholder="********"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              disabled={isLoading}
              type="submit"
              className={"w-full mt-4 p-4 text-sm"}
            >
              {!isLoading ? (
                <>
                  Sign up
                  <LogIn />
                </>
              ) : (
                <Spinner />
              )}
            </Button>
          </form>

          <CardFooter className="flex  p-0 items-center justify-center mt-4">
            <div className="flex gap-1  w-full items-center justify-center">
              <p className="text-muted-foreground">Already have an account?</p>
              <Link href={"/sign-in"} className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
