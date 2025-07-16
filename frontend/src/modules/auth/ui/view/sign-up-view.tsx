import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { authClient } from "@/lib/auth";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2, OctagonAlertIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
});

const SignUpView = () => {
  const [pending, isPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    isPending(true);
    setError(null);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "http://localhost:5173/",
        name: data.name,
      },
      {
        onError: ({ error }) => {
          console.error("Sign in error:", error);
          setError(error.message);
          isPending(false);
        },
        onSuccess: () => {
          console.log("Sign in successful");
          isPending(false);
        },
      }
    );
  };
  const onSocial = async (provider: "google") => {
    isPending(true);
    setError(null);
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "http://localhost:5173/",
      },
      {
        onError: ({ error }) => {
          console.error("Sign in error:", error);
          setError(error.message);
          isPending(false);
        },
        onSuccess: () => {
          console.log("Sign in successful");
          isPending(false);
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6 w-full sm:w-2/3   ">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 space-y-3"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-balance">
                  Register to access your account and manage your profile.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                        disabled={pending}
                          {...field}
                          type="text"
                          placeholder="Enter your name"
                          className="input input-bordered w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                        disabled={pending}
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="input input-bordered w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                        disabled={pending}

                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="input input-bordered w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {!!error && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
                <Button type="submit" className="btn btn-primary w-full" disabled={pending}>
              {!pending ? (
                  "Sign up"
                ) : (
                    <Loader2 className="h-4 w-4 animate-spin" size={10} />
                )}
                </Button>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:item-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                onClick={() => onSocial("google")}
                variant={"outline"}
                type="button"
                className="w-full"
                disabled={pending}
              >
                <FaGoogle />
              </Button>
              <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="underline underline-offset-4 font-semibold"
                    to={"/sign-in"}
                  >
                    Sign in
                  </Link>
                </div>
            </form>
          </Form>
          <div className="bg-radial relative hidden from-blue-300 to-blue-900 md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.png" alt="logo" />
            <p className="text-2xl font-semibold text-white text-center">
              HR.360
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to out <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
export default SignUpView;
