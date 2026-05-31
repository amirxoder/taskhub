"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInSchema } from "./lib/schema";
import { Controller, useForm } from "react-hook-form";
import { LogIn } from "lucide-react";

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

// schema type
type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = ({ email, password }: SignInFormData) => {
    console.log(email, password);
    form.reset();
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
            Welcome back!
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FieldGroup>
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

                    <div className="w-full  flex justify-end">
                      <Link
                        className="underline text-[10px] text-right w-full text-blue-500 "
                        href={"/forgot-password"}
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" className={"w-full mt-4 p-4 text-sm"}>
              Login
              <LogIn />
            </Button>
          </form>

          <CardFooter className="flex   items-center justify-center mt-4">
            <div className="flex gap-1 items-center justify-center w-full ">
              <p className="text-muted-foreground">
                Don&apos;t have an account?
              </p>
              <Link href={"/sign-up"} className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
