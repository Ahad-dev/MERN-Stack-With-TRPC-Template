
import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth"
import { useEffect, useRef, useState } from "react"
import z from "zod"
import { toast } from "sonner"
import gsap from "gsap"
export const RESET_PASSWORD_FORM_SCHEMA = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attach the error to confirmPassword field
});

const ResetPasswordView = () => {
    const conRef = useRef<HTMLFormElement>(null);
    // # get URL parameters for token
    const urlParams = new URLSearchParams(window.location.search).get('token');

    if (!urlParams) {
        return <div className="text-red-500">Invalid or missing token</div>;
    }

        // Animation for the form
        useEffect(()=>{
            if (conRef.current) {
                gsap.fromTo(conRef.current, { opacity: 0, y: 50,scale:0.8 }, { opacity: 1, y: 0,scale:1, duration: 0.7 });
            }
        },[])


    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>>({
        resolver: zodResolver(RESET_PASSWORD_FORM_SCHEMA),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof RESET_PASSWORD_FORM_SCHEMA>) => {
        setIsPending(true);
        setError(null);
        try {
            // Assuming you have a method to reset the password
            await authClient.resetPassword({
                token: urlParams,
                newPassword: data.password,
            },
            {
                onError: ({ error }) => {
                    toast.error(`Reset password error:${error.message}`);
                    setError(error.message);
                    setIsPending(false);
                },
                onSuccess: () => {
                    toast.success("Password reset successful");
                    setIsPending(false);
                },
            }
        );
        } catch (err) {
            setError("Failed to reset password. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary">
      <Form {...form}>

        <form
        
            ref={conRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 p-4 bg-white rounded-lg shadow-md"
        >
            <div
            >
                <h2
                    className="text-2xl font-bold text-center mb-4"
                >
                    Reset Password

                </h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                    Please enter your new password.
                </p>

            </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <Input type="password" placeholder="Enter new password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm new password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit"
          
            className="w-full cursor-pointer transition-all hover:scale-105 hover:shadow-md"
          disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ResetPasswordView