import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      console.log({ value, ctx });
      if (value.trim() === "") {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username is required",
        });
      }
      if (value.trim().length < 3) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username must be at least 3 characters long",
        });
      }

      return value;
    }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" }) // Makes sure the email field isn't empty
    .min(5, { message: "Password must be between 5 to 20 characters" })
    .max(20, { message: "Password must be between 5 to 20 characters" }),
});

function Login() {
  console.log("Login Page render");

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted = ", data);
      await loginUser(data);
      toast.success("SignIn Successfully");
      navigate("/");
    } catch (error) {
      console.log("onSubmit catch = ", error);

      toast.error(error.response?.data?.message || "Server Error!");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[8.5rem] w-auto"
            src="https://media.licdn.com/dms/image/C4D0BAQGUz7fS_kNreg/company-logo_200_200/0/1642419833930?e=2147483647&v=beta&t=YxElsOM-v5ezX7-PodBfUfgz6I_I_rJ73bULYbFynZM"
            alt="TechPleck Technogloies"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email or Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  // required
                  className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your email or username"
                  {...register("username")}
                />
                <p className="error text-left text-red-600">
                  {errors.username?.message}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  // required
                  className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <p className="error text-left text-red-600">
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-25"
                // disabled={!isValid || isSubmitting}
                disabled={isSubmitting}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New to TechPlek?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create your TechPlek Account
            </Link>
          </p>
        </div>
      </div>

      <DevTool control={control} />
    </>
  );
}

export default Login;
