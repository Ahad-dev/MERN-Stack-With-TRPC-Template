import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth"
import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import gsap from "gsap"
import { toast } from "sonner"

const FORGOT_PASSWORD_FORM_SCHEMA = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordView = () => {
    const conRef = useRef<HTMLFormElement>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Animation for the form
    useEffect(()=>{
        if (conRef.current) {
            gsap.fromTo(conRef.current, { opacity: 0, y: 50,scale:0.8 }, { opacity: 1, y: 0,scale:1, duration: 0.7 });
        }
    },[])

    const form = useForm<z.infer<typeof FORGOT_PASSWORD_FORM_SCHEMA>>({
        resolver: zodResolver(FORGOT_PASSWORD_FORM_SCHEMA),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FORGOT_PASSWORD_FORM_SCHEMA>) => {
        setIsPending(true);
        setError(null);
        try {
            await authClient.requestPasswordReset({
                email: data.email,
                redirectTo :"http://localhost:5173/reset-password", // Adjust the redirect URL as needed
            },{
                onSuccess: () => {
                    toast.success("Reset link sent to your email");
                    setIsPending(false);
                },
            })
        } catch (err) {
            setError("Failed to send reset link. Please try again.");
            setIsPending(false);
        } 
    };


  return (
    <div
    className="h-screen w-full flex items-center justify-center bg-primary">
      <Form {...form}>
        <form
            ref={conRef}

          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 p-5 bg-white rounded-lg shadow-lg"
        >
            <div>
                {/* Write Heading for Forget passord */}
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                    Enter your email address below and we'll send you a link to reset your password.
                </p>
            </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full cursor-pointer transition-all hover:scale-105 hover:shadow-md" disabled={isPending}>
            {isPending ? <Loader2
                className="animate-spin mr-2"
                size={16}
              /> 
            : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordView