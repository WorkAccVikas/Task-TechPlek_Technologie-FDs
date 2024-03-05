import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";

// import axios from "../utils/axiosInstance";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/axiosInstance";

const schema = z
  .object({
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
    email: z.string().trim().min(1, { message: "Email is required" }).email(),
    confirm_password: z.string(),
    contact: z
      .string()
      .trim()
      .min(1, { message: "Contact is required" })
      .refine((value) => /^\d{10}$/.test(value), {
        message: "Contact must be exactly 10 digits",
      }),
    role: z.string().nonempty("Role is required"), // Custom error message for required role
    state: z.string().nonempty("State is required"), // Custom error message for required state
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password must match!!!",
    path: ["confirm_password"],
  });

function Register() {
  console.log("Register Page render");

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // console.log("Vikas = ", isSubmitting);

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted");
      console.table({ data });

      const { confirm_password, ...payload } = data;
      console.table({ payload });

      const response = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        payload,
      );
      console.log(`🚀 ~ onSubmit ~ response:`, response);

      if (response.data.success) {
        console.log("Register Success");
        toast.success("Registration successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("onSubmit catch = ", error);
      toast.error("Server Error!");
    }
  };

  return (
    <div className="bg-grey-lighter flex min-h-screen flex-col py-12">
      <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2 pb-10 shadow-[0px_20px_20px_10px_#4a5568]">
        <div className="w-full rounded bg-white px-6 py-8 text-black">
          <h1 className="mb-8 text-center text-3xl">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                className="border-grey-light block w-full rounded border p-3"
                name="username"
                placeholder="Username"
                {...register("username")}
              />
              <p className="text-left text-red-600">
                {errors.username?.message}
              </p>
            </div>

            <div className="mb-4">
              <input
                type="email"
                className="border-grey-light block w-full rounded border p-3"
                name="email"
                placeholder="Email"
                {...register("email")}
              />
              <p className="text-left text-red-600">{errors.email?.message}</p>
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="border-grey-light block w-full rounded border p-3"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="text-left text-red-600">
                {errors.password?.message}
              </p>
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="border-grey-light block w-full rounded border p-3"
                name="confirm_password"
                placeholder="Confirm Password"
                {...register("confirm_password")}
              />
              <p className="text-left text-red-600">
                {errors.confirm_password?.message}
              </p>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="border-grey-light block w-full rounded border p-3"
                name="contact"
                placeholder="Contact"
                {...register("contact")}
              />
              <p className="text-left text-red-600">
                {errors.contact?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="inline-block w-full text-black" htmlFor="role">
                Role Type
              </label>
              <select
                id="role"
                className="border-grey-light mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring "
                {...register("role")}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <p className="text-left text-red-600">{errors.role?.message}</p>
            </div>

            <div className="mb-4">
              <label className="inline-block w-full text-black" htmlFor="state">
                City
              </label>
              <select
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                id="state"
                {...register("state")}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi">Delhi</option>
              </select>
              <p className="text-left text-red-600">{errors.state?.message}</p>
            </div>

            <button
              type="submit"
              className="my-1 w-full rounded bg-indigo-600 py-3 text-center text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-25"
              disabled={isSubmitting}
            >
              Create Account
            </button>
          </form>
          <DevTool control={control} />

          <div className="text-grey-dark mt-4 text-center text-sm">
            By signing up, you agree to the
            <a
              className="border-grey-dark text-grey-dark border-b no-underline"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="border-grey-dark text-grey-dark border-b no-underline"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?{" "}
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            to="/login"
          >
            Sign in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default Register;

// username = txt
// email = email
// password = password
// confirm password = password
// role = dropdown
// contact = txt
// state = dropdown
